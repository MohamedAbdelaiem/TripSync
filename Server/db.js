const express = require('express');
const dotenv = require('dotenv');
const { Client } = require('pg');

// Load environment variables
dotenv.config({ path: './config.env' });

// Set up the connection string from environment variables
const connectionString = process.env.CONNECTION_STRING;  // Use uppercase to follow environment variable conventions
const client = new Client({
  connectionString: connectionString,
  ssl: { rejectedUnauthorized: false }, 
});

// Connect to the database
client.connect()
.then(() => {
    console.log('Connected to the PostgreSQL database');
    // Start the server after a successful DB connection
})
.catch(e => {
    console.error('Database connection failed:', e);
    if (e.code === '57P01') {
      console.log('Connection was terminated due to administrative command.');
    }
    process.exit(1);  // Exit the app if database connection fails
});


  module.exports=client;
