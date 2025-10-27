const connect = require('./connect');
const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

app.listen(port, ()=>{
    connect.connectToDatabase();
    console.log(`Server is running on port: ${port}`);
})