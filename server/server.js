const connect = require('./connect');
const express = require('express');
const cors = require('cors');
const accounts = require('./routes/accountRoutes.js');
const posts = require('./routes/postRoutes.js');
const auth = require('./routes/authRoutes.js')

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(accounts);
app.use(posts);
app.use(auth);

app.listen(port, ()=>{
    connect.connectToDatabase();
    console.log(`Server is running on port: ${port}`);
})