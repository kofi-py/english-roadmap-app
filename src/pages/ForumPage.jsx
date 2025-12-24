import React, { useState } from 'react';
import { forumPosts } from '../data/forumData';
import '../styles/ForumPage.css';

const ForumPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [posts, setPosts] = useState(forumPosts);
  const [isCreating, setIsCreating] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    category: 'discussion',
    content: ''
  });

  const filteredPosts = selectedCategory === 'all'
    ? posts
    : posts.filter(post => post.category === selectedCategory);

  const categories = [
    { id: 'all', icon: '📚', label: 'all discussions' },
    { id: 'help', icon: '❓', label: 'homework help' },
    { id: 'discussion', icon: '💬', label: 'discussions' },
    { id: 'resources', icon: '🔗', label: 'resources' },
    { id: 'success', icon: '🎉', label: 'success stories' }
  ];

  const handleCreatePost = (e) => {
    e.preventDefault();
    const post = {
      title: newPost.title.toLowerCase(),
      author: 'you', // In a real app, this would be the logged-in user
      time: 'just now',
      replies: 0,
      helpful: 0,
      category: newPost.category,
      excerpt: newPost.content.toLowerCase(), // Using content as excerpt for now
      id: posts.length + 1
    };

    setPosts([post, ...posts]);
    setIsCreating(false);
    setNewPost({ title: '', category: 'discussion', content: '' });
  };

  return (
    <div className="forum-page">
      <div className="forum-header">
        <div className="container">
          <h1 className="forum-title">community forum</h1>
          <p className="forum-subtitle">
            connect with fellow learners, discuss literature, share your writing,
            and grow together
          </p>
        </div>
      </div>

      <div className="container">
        <div className="forum-container">
          <aside className="sidebar">
            <h3 className="sidebar-title">categories</h3>
            {categories.map(cat => (
              <div
                key={cat.id}
                className={`category ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                <span className="category-icon">{cat.icon}</span>
                {cat.label}
              </div>
            ))}
          </aside>

          <main className="forum-main">
            <div className="forum-actions">
              <button
                className="btn-primary"
                onClick={() => setIsCreating(!isCreating)}
              >
                {isCreating ? 'cancel' : 'create discussion'}
              </button>
            </div>

            {isCreating && (
              <form className="create-post-form fade-in" onSubmit={handleCreatePost}>
                <h3 className="form-title">start a new discussion</h3>

                <div className="form-group">
                  <label className="form-label">title</label>
                  <input
                    type="text"
                    className="form-input"
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    placeholder="what would you like to discuss?"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">category</label>
                  <select
                    className="form-input"
                    value={newPost.category}
                    onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                  >
                    <option value="discussion">discussions</option>
                    <option value="help">homework help</option>
                    <option value="resources">resources</option>
                    <option value="success">success stories</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">content</label>
                  <textarea
                    className="form-textarea"
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    placeholder="share your thoughts..."
                    required
                  />
                </div>

                <button type="submit" className="btn-primary">post discussion</button>
              </form>
            )}

            {filteredPosts.map((post, idx) => (
              <div key={idx} className="post-card">
                <div className="post-header">
                  <div>
                    <div className="post-title">{post.title}</div>
                    <div className="post-meta">
                      <span className="post-author">{post.author}</span>
                      <span> • </span>
                      <span>{post.time}</span>
                    </div>
                  </div>
                </div>
                <div className="post-excerpt">{post.excerpt}</div>
                <div className="post-stats">
                  <div className="stat">
                    <span>💬</span>
                    <span>{post.replies} replies</span>
                  </div>
                  <div className="stat">
                    <span>❤️</span>
                    <span>{post.helpful} helpful</span>
                  </div>
                </div>
              </div>
            ))}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ForumPage;
