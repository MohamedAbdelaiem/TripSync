const client = require("../db");

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await client.query(
      "SELECT Content,Date,Time,PHOTO,BLOG_ID,ProfileName,username,profilephoto FROM blogs as bg,users as u where bg.USER_ID = u.USER_ID ORDER BY date desc, time desc"
    );
    if (blogs.rows.length === 0) {
      return res.status(404).json({
        status: "failed",
        message: "No blogs found",
      });
    }
    res.status(200).json({
      status: "success",
      data: blogs.rows,
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: "Internal Server Error",
    });
    console.log(err);
  }
};

exports.createBlog = async (req, res) => {
  try {
    const { description, photo } = req.body;
    if (!description) {
      return res.status(400).json({
        status: "failed",
        message: "Please provide description",
      });
    }

    const blog = await client.query(
      "INSERT INTO blogs(content,photo,Date,time,user_id) VALUES($1,$2,CURRENT_DATE,CURRENT_TIME,$3) RETURNING *",
      [description, photo, req.user.user_id]
    );
    res.status(201).json({
      status: "success",
      data: blog.rows,
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: "Internal Server Error",
    });
    console.log(err);
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const blog_id = req.params.blog_id;
    if (!blog_id) {
      return res.status(400).json({
        status: "failed",
        message: "Please provide blog ID",
      });
    }
    if (isNaN(blog_id)) {
      return res.status(400).json({
        status: "failed",
        message: "Blog ID should be a number",
      });
    }
 
    const selectedBlog = await client.query(
      "SELECT * FROM blogs WHERE BLOG_ID=$1",
      [blog_id]
    );
    if (selectedBlog.rows.length === 0) {
      return res.status(404).json({
        status: "failed",
        message: "No blog found",
      });
    }

    if (req.user.user_id !== selectedBlog.rows[0].user_id) {
      if (req.user.role !== "admin") {
        return res.status(401).json({
          status: "failed",
          message: "You are not authorized to delete this blog",
        });
      }
    }
    const blog = await client.query(
      "DELETE FROM blogs WHERE BLOG_ID=$1 RETURNING *",
      [blog_id]
    );
    if (blog.rows.length === 0) {
      return res.status(404).json({
        status: "failed",
        message: "No blog found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Blog deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: "Internal Server Error",
    });
    console.log(err);
  }
};
