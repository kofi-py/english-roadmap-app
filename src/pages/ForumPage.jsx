import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { forumPosts } from '../data/forumData';
import '../styles/ForumPage.css';

const API_URL = import.meta.env.VITE_API_URL || 'https://english-roadmap-app.onrender.com';

const ForumPage = ({ setCurrentPage }) => {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [posts, setPosts] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    category: 'discussion',
    content: ''
  });
  const [expandedPostId, setExpandedPostId] = useState(null);
  const [replies, setReplies] = useState({}); // Map of postId -> replies array
  const [newReply, setNewReply] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch posts on mount
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${API_URL}/api/posts`);
      if (response.ok) {
        const data = await response.json();
        setPosts(data.length > 0 ? data : forumPosts.map((p, i) => ({ ...p, id: i + 1, created_at: new Date() })));
      } else {
        setPosts(forumPosts.map((p, i) => ({ ...p, id: i + 1, created_at: new Date() })));
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      setPosts(forumPosts.map((p, i) => ({ ...p, id: i + 1, created_at: new Date() })));
    }
  };

  const fetchReplies = async (postId) => {
    try {
      const response = await fetch(`${API_URL}/api/posts/${postId}/replies`);
      if (response.ok) {
        const data = await response.json();
        setReplies(prev => ({
          ...prev,
          [postId]: data
        }));
      }
    } catch (error) {
      console.error('Error fetching replies:', error);
    }
  };

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = [
    { id: 'all', icon: '📚', label: 'all discussions' },
    { id: 'help', icon: '❓', label: 'homework help' },
    { id: 'discussion', icon: '💬', label: 'discussions' },
    { id: 'resources', icon: '🔗', label: 'resources' },
    { id: 'success', icon: '🎉', label: 'success stories' }
  ];

  const handleCreatePost = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${API_URL}/api/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: newPost.title,
          category: newPost.category,
          content: newPost.content
        }),
      });

      if (response.ok) {
        const savedPost = await response.json();
        setNewPost({ title: '', category: 'discussion', content: '' });
        setIsCreating(false);
        setPosts(prev => [savedPost, ...prev]);
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const toggleReplies = (postId) => {
    if (expandedPostId === postId) {
      setExpandedPostId(null);
    } else {
      setExpandedPostId(postId);
      if (!replies[postId]) {
        fetchReplies(postId);
      }
    }
  };

  const handleCreateReply = async (e, postId) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${API_URL}/api/posts/${postId}/replies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          content: newReply
        }),
      });

      if (response.ok) {
        const savedReply = await response.json();
        setNewReply('');
        setReplies(prev => ({
          ...prev,
          [postId]: [...(prev[postId] || []), savedReply]
        }));
      }
    } catch (error) {
      console.error('Error creating reply:', error);
    }
  };

  const handleLike = async (e, postId) => {
    e.stopPropagation();
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${API_URL}/api/posts/${postId}/like`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        setPosts(prev => prev.map(post =>
          post.id === postId ? { ...post, likes: (post.likes || 0) + 1 } : post
        ));
      }
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  return (
    <div className="forum-page">
      <div className="forum-header">
        <div className="container">
          <h1 className="forum-title">community forum</h1>
          <p className="forum-subtitle">connect with fellow learners and grow together</p>
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
              <div className="search-container">
                <span className="search-icon">🔍</span>
                <input
                  type="text"
                  className="search-input"
                  placeholder="search discussions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              {user ? (
                <button className="btn-primary" onClick={() => setIsCreating(!isCreating)}>
                  {isCreating ? 'cancel' : 'create discussion'}
                </button>
              ) : (
                <button className="btn-primary" onClick={() => setCurrentPage('login')}>
                  log in to post
                </button>
              )}
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

            <div className="posts-list">
              {filteredPosts.map((post) => (
                <div key={post.id} className="post-card">
                  <div className="post-header" onClick={() => toggleReplies(post.id)}>
                    <div>
                      <div className="post-title">{post.title}</div>
                      <div className="post-meta">
                        <span className="post-author">by {post.author || 'guest'}</span>
                        <span className="post-date"> • {new Date(post.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="post-excerpt">{post.content}</div>
                  <div className="post-stats">
                    <div className="stat" onClick={() => toggleReplies(post.id)}>
                      <span>💬</span>
                      <span>{post.reply_count || 0} replies</span>
                    </div>
                    <div className="stat" onClick={(e) => handleLike(e, post.id)}>
                      <span>❤️</span>
                      <span>{post.likes || 0} helpful</span>
                    </div>
                    <button className="btn-reply-toggle" onClick={() => toggleReplies(post.id)}>
                      {expandedPostId === post.id ? 'close' : 'view replies'}
                    </button>
                  </div>

                  {expandedPostId === post.id && (
                    <div className="replies-section">
                      <div className="replies-list">
                        {(replies[post.id] || []).map(reply => (
                          <div key={reply.id} className="reply-card">
                            <div className="reply-header">
                              <span className="reply-author">{reply.author || 'guest'}</span>
                              <span className="reply-date">{new Date(reply.created_at).toLocaleDateString()}</span>
                            </div>
                            <p className="reply-content">{reply.content}</p>
                          </div>
                        ))}
                      </div>
                      {user ? (
                        <form className="reply-form" onSubmit={(e) => handleCreateReply(e, post.id)}>
                          <textarea
                            className="reply-input"
                            placeholder="write a reply..."
                            value={newReply}
                            onChange={(e) => setNewReply(e.target.value)}
                            required
                          />
                          <button type="submit" className="btn-primary">reply</button>
                        </form>
                      ) : (
                        <div className="login-prompt">
                          <p>please <span className="login-link" onClick={() => setCurrentPage('login')}>log in</span> to reply</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ForumPage;
