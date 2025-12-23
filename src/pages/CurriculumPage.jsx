import React from 'react';
import CourseItem from '../components/CourseItem';
import ProgressBar from '../components/ProgressBar';
import { coursesData } from '../data/coursesData';
import '../styles/CurriculumPage.css';

const CurriculumPage = ({ completedCourses, toggleComplete, searchQuery, setSearchQuery }) => {
  const totalCourses = 80;

  // Filter courses based on search
  const filteredCourses = coursesData.map(levelGroup => ({
    ...levelGroup,
    courses: levelGroup.courses.filter(course =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(levelGroup => levelGroup.courses.length > 0);

  return (
    <div className="curriculum-page">
      <div className="curriculum-header">
        <div className="container">
          <h1 className="curriculum-title">curriculum</h1>
          <p className="curriculum-subtitle">
            follow the levels below to progress from early literacy to advanced literary analysis. 
            mark courses as you complete them to track your progress.
          </p>
          <input
            type="text"
            placeholder="🔎 type to filter courses in real time..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-box"
          />
        </div>
      </div>

      <div className="container">
        <ProgressBar completed={completedCourses.length} total={totalCourses} />

        {/* Course Levels */}
        {filteredCourses.map((levelGroup) => (
          <div key={levelGroup.level} className="level-section fade-in-up">
            <div className="level-header">
              <h2 className="level-title">{levelGroup.levelTitle}</h2>
              <p className="level-subtitle">{levelGroup.levelSubtitle}</p>
            </div>

            {levelGroup.courses.map((course) => (
              <CourseItem
                key={course.id}
                course={course}
                isCompleted={completedCourses.includes(course.id)}
                toggleComplete={toggleComplete}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurriculumPage;
