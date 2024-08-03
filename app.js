const express = require("express");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const app = express();
app.use(bodyParser.json());

const users = [];       //This is a placeholder. In a real project we'd use database.
const SECRET_KEY = 'your_secret_key';

app.post('/register', async(req, res) => {
   const {username, password} = req.body;

   //Hash thr password
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(password, salt);

   //Store the user with the hashed Password
   users.push({username, password: hashedPassword});

   res.status(201).send('User registered');
});


app.post('/login', async (req, res) => {
    const {username, password} = req.body;
    const user = users.find(u => u.username === username);
    if(!user){
        return res.status(400).send('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        return res.status(400).send('Invalid credentials');
    }

    const token = jwt.sign({username: user.username}, SECRET_KEY, {expiresIn: '1h'});
    res.json({token});
});

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
}

app.listen(3000, () => {
    console.log('Server is running on the port 3000');
});