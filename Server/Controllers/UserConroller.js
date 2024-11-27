const express=require('express');
const {Client}=require('pg');


exports.getAllUsers=async(req,res)=>{
    try{
        Client.query('SELECT * FROM User',(err,result)=>
        {
            if(err){
                console.log(err);
                res.status(400).send('Error in fetching data');
            }
             else{
                res.status(200).json(result.rows);
                console.log(result.rows);
            }
        });
    }
    catch(e){
        console.log(e);
    }
};

exports.getAllTravelAgencies=async(req,res)=>{
    try{
        Client.query('SELECT * FROM TravelAgency',(err,result)=>
        {
            if(err)
            {
                console.log(err);
                res.status(400).send('Error in fetching data');
            }
            else{
                res.status(200).json(result.rows);
                console.log(result.rows);
            }
        });
    }
    catch(e){
        console.log(e);
    }
};

exports.getAllTravelers=async(req,res)=>{
    try{
        Client.query('SELECT * FROM Traveller',(err,result)=>
        {
            if(err)
            {
                console.log(err);
                res.status(400).send('Error in fetching data');
            }
            else{
                res.status(200).json(result.rows);
            }
        });
    }
    catch(e){
        console.log(e);
    }
};

exports.getAllAdmins=async(req,res)=>{
    try{
        Client.query("SELECT * FROM Admin",(err,result)=>{
            if(err)
            {
                console.log(err);
                res.status(400).send('Error in fetching data');
            }
            else{
                res.status(200).json(result.rows);
            }
        });
    }
    catch(e)
    {
        console.log(e);
    }
};

exports.getUserById=async(req,res)=>{
    try{
        user_id=req.params.user_id;
        Client.query('SELECT * FROM User WHERE user_id=$1',[user_id],(err,result)=>
        {
            if(err)
            {
                console.log(err);
                res.status(400).send('Error in fetching data');
            }
            else{
                res.status(200).json(result.rows);
                console.log(result.rows);
            }
        });
    }
    catch(e){
        console.log(e);
    }
};