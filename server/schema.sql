-- Create tables
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS posts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(100) NOT NULL,
  category VARCHAR(50) NOT NULL,
  content TEXT NOT NULL,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS replies (
  id SERIAL PRIMARY KEY,
  post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  author VARCHAR(100) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed data (optional)
INSERT INTO posts (title, author, category, content, likes) VALUES
  ('struggling with shakespeare''s language - any tips?', 'literature_newbie', 'help', 'i''m finding shakespeare really difficult to understand. the language feels so foreign. does anyone have strategies for making sense of the elizabethan english?', 23),
  ('just finished my first novel analysis essay! 🎉', 'bookworm_2025', 'success', 'after weeks of work, i finally completed my analysis of ''to kill a mockingbird''. the process of close reading and identifying themes was challenging but incredibly rewarding.', 45);

INSERT INTO replies (post_id, author, content) VALUES
  (1, 'shakespeare_fan', 'try reading it out loud! it was meant to be heard, not just read.'),
  (1, 'english_tutor', 'look for annotated editions that explain the archaic words.');
