const {Client}=require('pg');
const express = require('express');
const dotenv = require('dotenv');

//Connection String
dotenv.config({path:'./config.env'});
const connectionString = process.env.connectionString;
const client=new Client({
    connectionString:connectionString,
    ssl:{rejectedUnauthorized:false}
});
// Connect to existing database
client.connect()
    .then(() => console.log('Connected to database'))
    .catch(e => console.log(e))
    .finally(() => client.end());

