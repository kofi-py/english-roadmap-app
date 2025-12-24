import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/ForumPage.css'; // Reusing some forum styles for consistency

const LoginPage = ({ setCurrentPage }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const result = await login(email, password);
        if (result.success) {
            setCurrentPage('forum');
        } else {
            setError(result.error);
        }
    };

    return (
        <div className="forum-page" style={{ maxWidth: '400px', margin: '100px auto' }}>
            <div className="forum-header" style={{ textAlign: 'center' }}>
                <h1 className="forum-title">welcome back</h1>
                <p className="forum-subtitle">log in to join the conversation</p>
            </div>

            <div className="card" style={{ padding: '2rem' }}>
                <form onSubmit={handleSubmit}>
                    {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
                    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontFamily: "'Lora', serif" }}>email</label>
                        <input
                            type="email"
                            className="search-input"
                            style={{ paddingLeft: '1rem' }}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group" style={{ marginBottom: '2rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontFamily: "'Lora', serif" }}>password</label>
                        <input
                            type="password"
                            className="search-input"
                            style={{ paddingLeft: '1rem' }}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                        log in
                    </button>
                </form>
                <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem' }}>
                    don't have an account?
                    <span
                        style={{ color: 'var(--saddle-brown)', cursor: 'pointer', marginLeft: '0.5rem', fontWeight: 'bold' }}
                        onClick={() => setCurrentPage('signup')}
                    >
                        sign up
                    </span>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
