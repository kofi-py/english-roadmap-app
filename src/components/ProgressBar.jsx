import React from 'react';
import '../styles/ProgressBar.css';

const ProgressBar = ({ completed, total }) => {
  const progressPercent = Math.round((completed / total) * 100);

  return (
    <div className="progress-bar">
      <div className="progress-text">
        your progress: {completed}/{total} courses ({progressPercent}%)
      </div>
      <div className="progress-fill-container">
        <div 
          className="progress-fill" 
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
