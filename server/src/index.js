const express = require('express');
const route = require('./route/route.js');
const multer= require("multer");
const mysql = require('mysql2');

require('dotenv').config();

const app = express();
app.use( multer().any())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// create a connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'my_database',
  waitForConnections: true,
  connectionLimit: 10,
});

// test the connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err.stack);
    return;
  }
  console.log('Connected to MySQL database as id', connection.threadId);
});

// export the connection pool
module.exports = pool;


app.use('/', route);

app.listen(process.env.PORT || 3001, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3001))
});

