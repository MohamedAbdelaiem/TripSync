const express=require('express');
const {Client}=require('pg');


exports.getAllTrips=async(req,res)=>{
    try{
        Client.query('SELECT * FROM Trip',(err,result)=>
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

exports.getTripById=async(req,res)=>{
    try{
        trip_id=req.params.trip_id;
        Client.query('SELECT * FROM User WHERE user_id=$1',[trip_id],(err,result)=>
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