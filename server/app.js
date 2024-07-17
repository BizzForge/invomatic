const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const db = require('./db');
const uriBase = '/api/v1/'

const corsOptions = {
    origin: 'https://localhost:3000',
    optionsSuccessStatus: 200,
};

const app = express();
const PORT = process.env.APP_PORT || 5502;
const saltRound = 10;

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ error: 'Token not provided' });
    }

    jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Failed to authenticate token' });
        }
        req.user = decoded;
        next();
    });
};

function hashPasswordMiddleware(req, res, next){
    const plainPassword = req.body.password;

    if(!plainPassword){
        return res.status(4000).send('password is required');
    }

    bcrypt.hash(plainPassword, saltRound, (err, hash) => {
        if(err) {
            return next(err);
        }

        req.body.password = hash;
        next();
    })
}

app.use(express.json());
app.use(cors(corsOptions));

app.get(`${uriBase}`, (req, res) => {
    // Sending a JSON response
    res.json({ message: 'Hello World!' });
})

app.post(`${uriBase}add-user`, verifyToken, hashPasswordMiddleware, async (req, res) => {
    const { first_name, last_name, phone_number, email, business_name, password } = req.body;

    // Check if user with the same email already exists
    const checkUserQuery = 'SELECT * FROM users WHERE email = $1';
    const checkUserValues = [email];

    try {
        const checkResult = await db.query(checkUserQuery, checkUserValues);

        // If user with the same email already exists, send an error response
        if (checkResult.rows.length > 0) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }

        // If user doesn't exist, proceed with insertion
        const insertUserQuery = 'INSERT INTO users(first_name, last_name, phone_number, email, business_name, password) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
        const insertUserValues = [first_name, last_name, phone_number, email, business_name, password];

        const insertResult = await db.query(insertUserQuery, insertUserValues);
        res.json({ message: 'User added', user: insertResult.rows[0] });
        
    } catch (err) {
        res.status(500).json({ error: 'Error inserting data', details: err.stack });
    }
});

app.post(`${uriBase}login`, async (req, res) => {
    const { email, password } = req.body;

    // Check if the email and password are provided
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    // Query to find user by email
    const findUserQuery = 'SELECT * FROM users WHERE email = $1';
    const findUserValues = [email];

    try {
        const result = await db.query(findUserQuery, findUserValues);

        // If user not found
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const user = result.rows[0];

        // Check if the password matches
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        // Create JWT token
        const token = jwt.sign(
            { user_id: user.user_id, email: user.email },
            'your_secret_key',
            { expiresIn: '1h' } // token expiration time
        );

        res.json({ message: 'Login successful', token });

    } catch (err) {
        res.status(500).json({ error: 'Error authenticating user', details: err.stack });
    }
});

app.listen(PORT, () => {
    console.log(`The app is running on http://localhost:${PORT}`);
})