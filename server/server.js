require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;
const authRoutes = require('./routes/auth');

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || '*', // Allow specific frontend URL or all for now
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Database Connection
const pool = require('./db');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Database Connection

// Routes
app.use('/api/auth', authRoutes);

// Get current user
app.get('/api/auth/me', authenticateToken, async (req, res) => {
    try {
        const result = await pool.query('SELECT id, username, email FROM users WHERE id = $1', [req.user.userId]);
        res.json(user = result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Get all posts
app.get('/api/posts', async (req, res) => {
    try {
        const result = await pool.query(`
      SELECT p.*, u.username as author,
        (SELECT COUNT(*) FROM replies r WHERE r.post_id = p.id) as reply_count 
      FROM posts p 
      LEFT JOIN users u ON p.user_id = u.id
      ORDER BY p.created_at DESC, p.id DESC
    `);
        res.json(result.rows);
    } catch (err) {
        console.error('Database error (likely not connected):', err.message);
        res.json([]); // Return empty array so frontend uses fallback
    }
});

// Create a post
app.post('/api/posts', authenticateToken, async (req, res) => {
    const { title, category, content } = req.body;
    try {
        // Fetch username to store with post for faster rendering
        const userRes = await pool.query('SELECT username FROM users WHERE id = $1', [req.user.userId]);
        const username = userRes.rows[0]?.username || 'authenticated user';

        const result = await pool.query(
            'INSERT INTO posts (user_id, title, author, category, content) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [req.user.userId, title.toLowerCase(), username, category, content.toLowerCase()]
        );
        res.status(201).json({ ...result.rows[0], author: username });
    } catch (err) {
        console.error('Database error (POST post):', err.message);
        // Return mock data for local testing
        res.status(201).json({
            id: Math.floor(Math.random() * 1000),
            title: title.toLowerCase(),
            author: 'authenticated user',
            category,
            content: content.toLowerCase(),
            created_at: new Date()
        });
    }
});

// Get replies for a post
app.get('/api/posts/:id/replies', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(`
            SELECT r.*, u.username as author 
            FROM replies r 
            LEFT JOIN users u ON r.user_id = u.id 
            WHERE r.post_id = $1 
            ORDER BY r.created_at ASC
        `, [id]);
        res.json(result.rows);
    } catch (err) {
        console.error('Database error (replies):', err.message);
        res.json([]);
    }
});

// Create a reply
app.post('/api/posts/:id/replies', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    try {
        const userRes = await pool.query('SELECT username FROM users WHERE id = $1', [req.user.userId]);
        const username = userRes.rows[0]?.username || 'authenticated user';

        const result = await pool.query(
            'INSERT INTO replies (post_id, user_id, author, content) VALUES ($1, $2, $3, $4) RETURNING *',
            [id, req.user.userId, username, content.toLowerCase()]
        );
        res.status(201).json({ ...result.rows[0], author: username });
    } catch (err) {
        console.error('Database error (POST reply):', err.message);
        // Return mock data for local testing
        res.status(201).json({
            id: Math.floor(Math.random() * 1000),
            post_id: id,
            author: author.toLowerCase(),
            content: content.toLowerCase(),
            created_at: new Date()
        });
    }
});

// Like a post
app.post('/api/posts/:id/like', authenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            'UPDATE posts SET likes = likes + 1 WHERE id = $1 RETURNING *',
            [id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Database error (POST like):', err.message);
        // Mock success for UI feedback
        res.json({ id, likes: 1 });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
