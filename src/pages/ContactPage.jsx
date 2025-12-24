import React, { useState } from 'react';
import '../styles/ContactPage.css';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate form submission
        console.log('Form submitted:', formData);
        alert('Thank you for your message. We will get back to you soon.');
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div className="contact-page">
            <div className="container">
                <div className="contact-hero fade-in-up">
                    <h1 className="contact-title">get in touch</h1>
                    <p className="contact-subtitle">
                        have questions about the curriculum or want to share your progress?
                        we'd love to hear from you.
                    </p>

                    <div className="contact-content fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="form-label" htmlFor="name">name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="form-input"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="your name"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="email">email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="form-input"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="your email address"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="message">message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    className="form-textarea"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    placeholder="how can we help you?"
                                ></textarea>
                            </div>

                            <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }}>
                                send message
                            </button>
                        </form>

                        <div className="contact-info">
                            <div className="info-card">
                                <span className="info-icon">📧</span>
                                <h3 className="info-title">email us</h3>
                                <p className="info-text">
                                    support@englishroadmap.com<br />
                                    feedback@englishroadmap.com
                                </p>
                            </div>

                            <div className="info-card">
                                <span className="info-icon">🌐</span>
                                <h3 className="info-title">community</h3>
                                <p className="info-text">
                                    join our forum to connect with other learners and get help with your studies.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
