import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/AuthPage.css';

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
        <div className="auth-page">
            {/* Decorative background elements matching HomePage */}
            <div className="decorative-quote decorative-quote-1" style={{ position: 'absolute' }}>"</div>
            <div className="decorative-quote decorative-quote-2" style={{ position: 'absolute' }}>"</div>

            <div className="auth-container fade-in-up">
                <div className="auth-header">
                    <h1 className="auth-title">welcome back</h1>
                    <p className="auth-subtitle">log in to continue your journey</p>
                </div>

                {error && <div className="error-message">{error}</div>}

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>email</label>
                        <input
                            type="email"
                            className="auth-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="your@email.com"
                        />
                    </div>
                    <div className="form-group">
                        <label>password</label>
                        <input
                            type="password"
                            className="auth-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="••••••••"
                        />
                    </div>
                    <button type="submit" className="btn-primary btn-auth">
                        log in
                    </button>
                </form>

                <div className="auth-footer">
                    don't have an account?
                    <span className="auth-link" onClick={() => setCurrentPage('signup')}>
                        sign up
                    </span>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
