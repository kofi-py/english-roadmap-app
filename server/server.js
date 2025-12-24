require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
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
      ORDER BY p.created_at DESC
    `);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
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
        console.error(err);
        res.status(500).json({ error: 'Server error' });
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
        console.error(err);
        res.status(500).json({ error: 'Server error' });
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
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
