const express=require('express');
const client=require('../db');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const crypto=require('crypto');


exports.signup=async(req,res)=>{
    const newUser=await client.query('INSERT INTO users (user_name,user_email,user_password,profilePhoto,profileName) VALUES ($1,$2,$3) RETURNING *',[req.body.user_name,req.body.user_email,req.body.user_password,req.body.profilePhoto,req.body.profileName]);
    res.status(201).json({
        status:'success',
        data:{
            user:newUser.rows[0]
        }
    });
    newUser.password=undefined;
    //create token
    const token=jwt.sign({id:newUser.rows[0].user_id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_IN //5d
    });

    res.status(200).json({
        status:'success',
        token,
        data:{
            user:newUser.rows[0]
        }
    });
}


