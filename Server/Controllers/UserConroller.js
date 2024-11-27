const express=require('express');
const client=require('../db');
const { console } = require('inspector/promises');

exports.getAllUsers=async(req,res)=>{
    try{
        client.query('SELECT * FROM users',(err,result)=>
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
            }
        );
    }
    catch(e){
        console.log(e);
    }
};

exports.getAllTravelAgencies=async(req,res)=>{
    try{
         client.query('SELECT * FROM travelagency,users WHERE travelagency_id=user_id',(err,result)=>
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
         client.query('SELECT * FROM traveller,users WHERE traveller_id=user_id',(err,result)=>
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
         client.query("SELECT * FROM admins,users WHERE admin_id=user_id",(err,result)=>{
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

exports.getUser=async(req,res)=>{
    try{
        // console.log(req.query.user_id);
        user_id=req.params.user_id;
        if(!user_id)
        {
            return res.status(400).json({
                success:false,
                error:'Please provide user_id'
            })
        }
         client.query('SELECT * FROM users WHERE user_id=$1',[user_id],(err,result)=>
        {
            if(err||result.rows.length===0)
            {
                console.log(err);
                res.status(400).send('Error in fetching data');
            }
            else{
                res.status(200).json(result.rows[0]);
                console.log(result.rows);
            }
        });
    }
    catch(e){
        console.log(e);
    }
};

exports.createUser = async (req, res) => {
    const { user_name, user_email, user_password, user_type } = req.body;

    // Validate input
    if (!user_name || !user_email || !user_password || !user_type) {
        return res.status(400).json({
            success: false,
            error: 'Please provide all details',
        });
    }

    try {
        await client.query('BEGIN');

        // Insert into the users table
        const userResult = await client.query(
            'INSERT INTO users(username, email, password) VALUES($1, $2, $3) RETURNING *',
            [user_name, user_email, user_password]
        );

        const userId = userResult.rows[0].user_id;

        if (user_type === 'traveler') {
            await client.query(
                'INSERT INTO traveller(traveller_id) VALUES($1) RETURNING *',
                [userId]
            );
        } else if (user_type === 'travelagency') {
            const { phoneNumber, location, address, email, description, country } = req.body;
            // Validate travel agency specific fields
            if (!phoneNumber || !location || !address || !email || !description || !country) {
                return res.status(400).json({
                    success: false,
                    error: 'Please provide all travel agency details',
                });
            }

            await client.query(
                'INSERT INTO travelagency(travelagency_id, phonenumber, location, address, email, description, country) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *',
                [userId, phoneNumber, location, address, email, description, country]
            );
        } else if (user_type === 'admin') {
            await client.query(
                'INSERT INTO admins(admin_id) VALUES($1) RETURNING *',
                [userId]
            );
        } else {
            return res.status(400).json({
                success: false,
                error: 'Please provide correct user_type',
            });
        }

        // Commit the transaction if everything is fine
        await client.query('COMMIT');
        res.status(200).json({ success: true, message: 'User created successfully' });
    } catch (err) {
        // Rollback the transaction if there's an error
        await client.query('ROLLBACK');
        console.error('Error creating user:', err);
        res.status(500).send('Error in creating user');
    } finally {
        // client.release(); // Always release the client back to the pool
    }
};

// i think we will not need to this function and better seperate it to every user type

exports.UpdateUser=async(req,res)=>{
    try {
        const { user_id, user_name, user_email, user_password } = req.body;
        if (!user_id || !user_name || !user_email || !user_password) {
            return res.status(400).json({
                success: false,
                error: 'Please provide all details',
            });
        }
        await client.query('BEGIN'); // Start transaction
        await client.query(
            'UPDATE users SET username=$1, email=$2, password=$3 WHERE user_id=$4',
            [user_name, user_email, user_password, user_id]
        );
        await client.query('COMMIT');
        res.status(200).json({ success: true, message: 'User updated successfully' });
    }
    catch (err) {
        await client.query('ROLLBACK');
        console.error('Error updating user:', err);
        res.status(500).send('Error in updating user');
    }
}

exports.DeleteUser=async(req,res)=>{
    try {
        const { user_id } = req.body;
        if (!user_id) {
            return res.status(400).json({
                success: false,
                error: 'Please provide user_id',
            });
        }
        await client.query('BEGIN'); // Start transaction
        await client.query('DELETE FROM users WHERE user_id=$1', [user_id]);
        await client.query('COMMIT');
        res.status(200).json({ success: true, message: 'User deleted successfully' });
    }
    catch (err) {
        await client.query('ROLLBACK');
        console.error('Error deleting user:', err);
        res.status(500).send('Error in deleting user');
    }
}


