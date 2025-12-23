import React from 'react';
import '../styles/StatCard.css';

const StatCard = ({ number, label, delay = 0 }) => {
  return (
    <div 
      className="stat-card fade-in-up" 
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="stat-number">{number}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
};

export default StatCard;
