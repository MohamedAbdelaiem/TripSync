const express = require("express");
const client = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { console } = require("inspector");
const UserConroller = require("./UserConroller");

function generateResetToken(email) {
  const payload = {
    email,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "5m" });
}

async function sendResetEmail(email, resetToken) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Password Reset Token",
    text: `You requested a password reset token. Please click on the following link to reset your password:${
      req.protocol
    }://${req.get("host")}/api/v1/users/resetPassword/${resetToken}`,
  };

  try {
    await transporter.sendMail(mailOptions);

  } catch (err) {
    console.log(err);
  }
}

function verifyResetToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        reject(err);
      }
      resolve(decoded);
    });
  });
}

exports.signup = async (req, res) => {
  const {
    username,
    email,
    password,
    profileName,
    role,
    phoneNumber,
    location,
    address,
    description,
    country,
    profilePhoto,
  } = req.body;

  // Validate required fields
  if (!username || !email || !password || !role) {
    return res.status(400).json({
      status: "fail",
      message: "Please provide all the required fields",
    });
  }

  try {
    await client.query("BEGIN"); // Start transaction

    const hashedPassword = await bcrypt.hash(password, 12);

    // Insert user into the database
    const newUser = await client.query(
      "INSERT INTO users (username, email, password, profilePhoto, profileName, role) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [username, email, hashedPassword, profilePhoto, profileName, role]
    );

    // Insert role-specific details
    if (role === "traveller") {
      await client.query("INSERT INTO traveller(traveller_id) VALUES($1)", [
        newUser.rows[0].user_id,
      ]);
    } else if (role === "travel_agency") {
      if (!phoneNumber || !location || !address || !description || !country) {
        await client.query("ROLLBACK"); // Rollback transaction
        return res.status(400).json({
          status: "fail",
          message: "Please provide all travel agency details",
        });
      }
      await client.query(
        "INSERT INTO travelagency(travelagency_id, phonenumber, location, address, email, description, country) VALUES ($1, $2, $3, $4, $5, $6, $7)",
        [
          newUser.rows[0].user_id,
          phoneNumber,
          location,
          address,
          email,  // Email is stored in the travel agency table as well
          description,
          country,
        ]
      );
    } else {
      return res.status(400).json({
        status: "fail",
        message: "Invalid role",
      });
    }

    await client.query("COMMIT"); // Commit transaction

    // Create token
    const token = jwt.sign(
      { id: newUser.rows[0].user_id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    // Remove sensitive data
    const user = { ...newUser.rows[0] };
    delete user.password;

    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: false, // Set to true in production
      sameSite: "none",
    };

    res.cookie("jwt", token, cookieOptions);

    // Send response
    res.status(201).json({
      status: "success",
      token,
      data: { user },
    });
  } catch (err) {
    await client.query("ROLLBACK"); // Rollback transaction on error
    console.error(err); // Log error for debugging
    res.status(400).json({
      status: "fail",
      message: "Error signing up the user",
      error: err,
    });
  }
};

exports.LogIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide email",
      });
    }
    if (!password) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide password",
      });
    }

    //check if user exists
    const user = await client.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);
    if (
      !user.rows[0] ||
      !(await bcrypt.compare(password, user.rows[0].password))
    ) {
      return res.status(401).json({
        status: "fail",
        message: "Incorrect email or password",
      });
    }
    // Generate JWT token
    const token = jwt.sign(
      { id: user.rows[0].user_id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    // Remove sensitive data before sending response
    const userData = { ...user.rows[0] };
    delete userData.password; // Do not send the password in the response

    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: false, // Set to true in production
      sameSite: "none",
    };

    res.cookie("jwt", token, cookieOptions);
    // Send the response
    res.status(200).json({
      status: "success",
      message: "User logged in successfully",
      token,
      data: userData,
    });
  } catch (e) {

    res.status(400).json({
      status: "fail",
      message: "Error logging in the user",
    });
  }
};

exports.protect = async (req, res, next) => {
  try {
    // 1) Get token and check if it's there
    let token;

    if (
      req.headers &&
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }


    if (!token) {
      return res.status(401).json({
        status: "fail",
        message: "You are not logged in! Please log in to get access.",
      });
    }

    // 2) Verify token
    const decoded = await new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          reject(err);
        }
        resolve(decoded);
      });
    });

    // 3) Check if user still exists
    const currentUser = await client.query(
      "SELECT * FROM users WHERE user_id = $1",
      [decoded.id]
    );

    if (!currentUser.rows[0]) {
      return res.status(401).json({
        status: "fail",
        message: "The user belonging to this does no longer exist.",
      });
    }

    //check if user changed password after the token was issued
    const decodedIatInMs = decoded.iat * 1000; // Convert `iat` from seconds to milliseconds

    // const changedPassword = await client.query(
    //   "SELECT * FROM users WHERE user_id = $1 AND passwordchangedat > TO_TIMESTAMP($2 / 1000)",
    //   [decoded.id, decodedIatInMs]
    // );

    // if (changedPassword.rows[0]) {
    //   return res.status(401).json({
    //     status: "fail",
    //     message: "User recently changed password! Please log in again.",
    //   });
    // }

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser.rows[0];
    // req.locals.user=currentUser.rows[0];
    next();
  } catch (err) {
    // console.error(err);
    res.status(400).json({
      status: "fail",
      message: err,
    });
    next(err);
  }
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: "fail",
        message: "You do not have permission to perform this action",
      });
    }
    next();
  };
};

exports.LogOut = async (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({ status: "success" });
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide email",
      });
    }

    // 1) Get user based on POSTed email
    const user = await client.query(
      "SELECT email FROM users WHERE email = $1",
      [email]
    );
    if (!user.rows[0]) {
      return res.status(404).json({
        status: "fail",
        message: "There is no user with email address.",
      });
    }

    // 2) Generate the random reset token
    const resetToken = generateResetToken(user.rows[0].email);

    // 3) Send it to user's email
    await sendResetEmail(user.rows[0].email, resetToken);

    // 4) If everything's OK, send token to user's email
    res.status(200).json({
      status: "success",
      message: "reset email have been sent to you sent to email!",
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      status: "fail",
      message: "Error in sending email",
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { resetToken } = req.body;
    const { newPassword } = req.body;
    if (!resetToken || !newPassword) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide resetToken and newPassword",
      });
    }
    // 1) Verify token
    const decoded = await verifyResetToken(resetToken);
    if (!decoded) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid token",
      });
    }
    const email = decoded.email;
    //2)hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    //3)update the password
    const result = await client.query(
      "UPDATE users SET password=$1 WHERE email=$2",
      [hashedPassword, email]
    );
    if (result.rowCount > 0) {
      res.status(200).json({
        status: "success",
        message: "Password reset successfully",
      });
    } else if (result.rowCount === 0) {
      res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    } else {
      res.status(400).json({
        status: "fail",
        message: "Invalid token",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({
      status: "fail",
      message: "Error in resetting password",
    });
  }
};
