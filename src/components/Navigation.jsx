import React from 'react';
import '../styles/Navigation.css';

const Navigation = ({ currentPage, setCurrentPage }) => {
  return (
    <nav className="nav">
      <div className="nav-container">
        <div className="logo" onClick={() => setCurrentPage('home')}>
          <span className="logo-icon">✒️</span>
          <span className="logo-text">english mastery roadmap</span>
        </div>
        <ul className="nav-links">
          <li 
            className={`nav-item ${currentPage === 'curriculum' ? 'active' : ''}`}
            onClick={() => setCurrentPage('curriculum')}
          >
            curriculum
          </li>
          <li 
            className={`nav-item ${currentPage === 'diagnostic' ? 'active' : ''}`}
            onClick={() => setCurrentPage('diagnostic')}
          >
            diagnostic
          </li>
          <li 
            className={`nav-item ${currentPage === 'forum' ? 'active' : ''}`}
            onClick={() => setCurrentPage('forum')}
          >
            forum
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
