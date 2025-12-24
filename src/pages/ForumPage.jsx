import React, { useState, useEffect } from 'react';
import { forumPosts } from '../data/forumData';
import '../styles/ForumPage.css';

const ForumPage = () => {
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

  // Fetch posts on mount
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/posts');
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
      const response = await fetch(`http://localhost:3000/api/posts/${postId}/replies`);
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

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newPost.title,
          author: 'you',
          category: newPost.category,
          content: newPost.content
        }),
      });

      if (response.ok) {
        setNewPost({ title: '', category: 'discussion', content: '' });
        setIsCreating(false);
        fetchPosts(); // Refresh list
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
    try {
      const response = await fetch(`http://localhost:3000/api/posts/${postId}/replies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          author: 'you',
          content: newReply
        }),
      });

      if (response.ok) {
        setNewReply('');
        fetchReplies(postId); // Refresh replies
      }
    } catch (error) {
      console.error('Error creating reply:', error);
    }
  };

  const handleLike = async (e, postId) => {
    e.stopPropagation();
    try {
      const response = await fetch(`http://localhost:3000/api/posts/${postId}/like`, {
        method: 'POST',
      });
      if (response.ok) {
        fetchPosts();
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

            {filteredPosts.map((post) => (
              <div key={post.id} className="post-card">
                <div className="post-header" onClick={() => toggleReplies(post.id)}>
                  <div>
                    <div className="post-title">{post.title}</div>
                    <div className="post-meta">
                      <span className="post-author">{post.author}</span>
                      <span> • </span>
                      <span>{new Date(post.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="post-excerpt">{post.content}</div> {/* Using content as excerpt */}
                <div className="post-stats">
                  <div className="stat" onClick={() => toggleReplies(post.id)} style={{ cursor: 'pointer' }}>
                    <span>💬</span>
                    <span>{post.reply_count || 0} replies</span>
                  </div>
                  <div className="stat" onClick={(e) => handleLike(e, post.id)} style={{ cursor: 'pointer' }}>
                    <span>❤️</span>
                    <span>{post.likes || 0} helpful</span>
                  </div>
                  <button
                    className="btn-reply-toggle"
                    onClick={() => toggleReplies(post.id)}
                  >
                    {expandedPostId === post.id ? 'close replies' : 'reply'}
                  </button>
                </div>

                {expandedPostId === post.id && (
                  <div className="replies-section fade-in">
                    {replies[post.id] && replies[post.id].map(reply => (
                      <div key={reply.id} className="reply-card">
                        <div className="reply-author">{reply.author}</div>
                        <div className="reply-content">{reply.content}</div>
                        <div className="reply-time">{new Date(reply.created_at).toLocaleDateString()}</div>
                      </div>
                    ))}

                    <form className="reply-form" onSubmit={(e) => handleCreateReply(e, post.id)}>
                      <textarea
                        className="form-textarea reply-input"
                        value={newReply}
                        onChange={(e) => setNewReply(e.target.value)}
                        placeholder="write a reply..."
                        required
                      ></textarea>
                      <button type="submit" className="btn-secondary btn-sm">send reply</button>
                    </form>
                  </div>
                )}
              </div>
            ))}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ForumPage;
