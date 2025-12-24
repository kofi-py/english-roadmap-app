const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db');

if (!process.env.JWT_SECRET) {
    console.error('FATAL ERROR: JWT_SECRET is not defined.');
}

// Signup
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, username, email',
            [username.toLowerCase(), email.toLowerCase(), hashedPassword]
        );
        const user = result.rows[0];
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.status(201).json({ user, token });
    } catch (err) {
        console.error('Signup Error:', err);
        if (err.code === '23505') {
            return res.status(400).json({ error: 'Username or email already exists' });
        }
        res.status(500).json({ error: 'Server error during signup' });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const emailLower = email.toLowerCase();
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [emailLower]);
        const user = result.rows[0];

        if (!user) {
            console.log(`Login attempt failed: User ${emailLower} not found`);
            return res.status(400).json({ error: 'User not found' });
        }

        const validPassword = await bcrypt.compare(password, user.password_hash);
        if (!validPassword) {
            console.log(`Login attempt failed: Invalid password for ${emailLower}`);
            return res.status(400).json({ error: 'Invalid password' });
        }

        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET missing in environment');
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.json({ user: { id: user.id, username: user.username, email: user.email }, token });
    } catch (err) {
        console.error('Login Error:', err);
        res.status(500).json({ error: 'Server error during login. Please check server logs.' });
    }
});

module.exports = router;
