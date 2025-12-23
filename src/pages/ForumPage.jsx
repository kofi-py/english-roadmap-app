import React, { useState } from 'react';
import { forumPosts } from '../data/forumData';
import '../styles/ForumPage.css';

const ForumPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredPosts = selectedCategory === 'all' 
    ? forumPosts 
    : forumPosts.filter(post => post.category === selectedCategory);

  const categories = [
    { id: 'all', icon: '📚', label: 'all discussions' },
    { id: 'help', icon: '❓', label: 'homework help' },
    { id: 'discussion', icon: '💬', label: 'discussions' },
    { id: 'resources', icon: '🔗', label: 'resources' },
    { id: 'success', icon: '🎉', label: 'success stories' }
  ];

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
