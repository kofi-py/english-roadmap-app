require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || '*', // Allow specific frontend URL or all for now
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Database Connection
console.log('Connecting to database:', process.env.DATABASE_URL ? 'URL detected' : 'URL MISSING');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

// Test DB Connection
pool.connect((err, client, release) => {
    if (err) {
        console.error('Error acquiring client', err.stack);
    } else {
        console.log('Database connected successfully');
        release();
    }
});

// Routes

// Get all posts
app.get('/api/posts', async (req, res) => {
    try {
        const result = await pool.query(`
      SELECT p.*, 
        (SELECT COUNT(*) FROM replies r WHERE r.post_id = p.id) as reply_count 
      FROM posts p 
      ORDER BY p.created_at DESC, p.id DESC
    `);
        res.json(result.rows);
    } catch (err) {
        console.error('Database error (likely not connected):', err.message);
        res.json([]); // Return empty array so frontend uses fallback
    }
});

// Create a post
app.post('/api/posts', async (req, res) => {
    const { title, author, category, content } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO posts (title, author, category, content) VALUES ($1, $2, $3, $4) RETURNING *',
            [title.toLowerCase(), author.toLowerCase(), category, content.toLowerCase()]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Database error (POST post):', err.message);
        // Return mock data for local testing
        res.status(201).json({
            id: Math.floor(Math.random() * 1000),
            title: title.toLowerCase(),
            author: author.toLowerCase(),
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
        const result = await pool.query(
            'SELECT * FROM replies WHERE post_id = $1 ORDER BY created_at ASC',
            [id]
        );
        res.json(result.rows);
    } catch (err) {
        console.error('Database error (replies):', err.message);
        res.json([]);
    }
});

// Create a reply
app.post('/api/posts/:id/replies', async (req, res) => {
    const { id } = req.params;
    const { author, content } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO replies (post_id, author, content) VALUES ($1, $2, $3) RETURNING *',
            [id, author.toLowerCase(), content.toLowerCase()]
        );
        res.status(201).json(result.rows[0]);
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
app.post('/api/posts/:id/like', async (req, res) => {
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
