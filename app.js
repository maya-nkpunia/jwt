const express = require("express");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const app = express();
app.use(bodyParser.json());

const users = [];       //This is a placeholder. In a real project we'd use database.
const secretKey = 

app.post('/register', async(req, res) => {
   const {username, password} = req.body;

   //Hash thr password
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(password, salt);

   //Store the user with the hashed Password
   users.push({username, password: hashedPassword});

   res.status(201).send('User registered');
});

app.listen(3000, () => {
    console.log('Server is running on the port 3000');
});