import React from 'react';
import '../styles/CourseItem.css';

const CourseItem = ({ course, isCompleted, toggleComplete }) => {
  return (
    <div className="course-item">
      <div className="course-header">
        <div>
          <div className="course-title">{course.id}. {course.title}</div>
          <div className="course-source">source: {course.source}</div>
        </div>
      </div>
      <div className="course-description">{course.description}</div>
      <div className="course-actions">
        <a
          href={course.link}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-start"
        >
          start course
        </a>
        <button
          onClick={() => toggleComplete(course.id)}
          className={`btn-complete ${isCompleted ? 'completed' : ''}`}
        >
          {isCompleted ? '✓ completed' : 'mark complete'}
        </button>
      </div>
    </div>
  );
};

export default CourseItem;
