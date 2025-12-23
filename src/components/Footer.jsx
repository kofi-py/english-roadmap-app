import React from 'react';
import '../styles/Footer.css';

const Footer = ({ completedCourses }) => {
  const totalCourses = 80;
  const progressPercent = Math.round((completedCourses.length / totalCourses) * 100);

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h4 className="footer-title">navigation</h4>
            <a href="#" className="footer-link">home</a>
            <a href="#" className="footer-link">curriculum</a>
            <a href="#" className="footer-link">diagnostic</a>
            <a href="#" className="footer-link">forum</a>
          </div>
          <div className="footer-section">
            <h4 className="footer-title">resources</h4>
            <a href="#" className="footer-link">how it works</a>
            <a href="#" className="footer-link">testimonials</a>
          </div>
          <div className="footer-section">
            <h4 className="footer-title">connect</h4>
            <a href="#" className="footer-link">join the forum</a>
            <a href="mailto:hello@englishmastery.com" className="footer-link">email us</a>
          </div>
        </div>
        <div className="copyright">
          <p>© 2025 english mastery roadmap. cultivating eloquence and understanding.</p>
          <p style={{marginTop: '0.5rem'}}>
            your progress: {completedCourses.length}/{totalCourses} courses ({progressPercent}%)
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
