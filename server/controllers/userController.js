require('dotenv').config();
const users = require('../data/users');
const jwt = require('jsonwebtoken');
const joi = require('joi');
const bcrypt = require('bcrypt');

const registerSchema = joi.object({
    username: joi.string().min(3).max(30).required(), //username must be between 3 and 30 characters
    email: joi.string().email().required(),
    password: joi.string().min(8).required() //password must be at least 8 characters
});

const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required() 
});

const registerUser = async (req, res) => {
    try {
        const { error } = registerSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { username, email, password } = req.body; //destructure the request body

        const existingUser = users.find(user => user.email === email); //ensure no duplicate users
        if (existingUser) {
            return res.status(409).json({ error: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10); //encrypt the password to be stored in the database
        const newUser = {
            id: users.length + 1,
            username,
            email,
            password: hashedPassword
        };
        users.push(newUser); //add to users "database", which is an array lol
        res.status(201).json({ user: newUser, message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { error } = loginSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { email, password } = req.body; //destructure again

        const user = users.find(user => user.email === email);
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' }); //be vague for security reasons
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password' }); //be vague for security reasons
        }

        //generate token for middleware authentication
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.send({ token: token, message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getUserProfile = (req, res) => {
    console.log("USER IN USERPROFILE: ", req.user);
    try {
        const user = users.find(user => user.email === req.user.email);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const getAllUsers = (req, res) => { //For debugging purposes only
    try {
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    getAllUsers
};