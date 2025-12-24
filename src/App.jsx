import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import CurriculumPage from './pages/CurriculumPage';
import DiagnosticPage from './pages/DiagnosticPage';
import ForumPage from './pages/ForumPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Footer from './components/Footer';
import { AuthProvider } from './context/AuthContext';
import './styles/global.css';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [completedCourses, setCompletedCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Load progress from localStorage
    const saved = localStorage.getItem('englishProgress');
    if (saved) {
      setCompletedCourses(JSON.parse(saved));
    }
  }, []);

  const toggleComplete = (courseId) => {
    const newCompleted = completedCourses.includes(courseId)
      ? completedCourses.filter(id => id !== courseId)
      : [...completedCourses, courseId];

    setCompletedCourses(newCompleted);
    localStorage.setItem('englishProgress', JSON.stringify(newCompleted));
  };

  return (
    <AuthProvider>
      <div className="app">
        <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />

        {currentPage === 'home' && <HomePage setCurrentPage={setCurrentPage} />}
        {currentPage === 'curriculum' && (
          <CurriculumPage
            completedCourses={completedCourses}
            toggleComplete={toggleComplete}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )}
        {currentPage === 'diagnostic' && <DiagnosticPage setCurrentPage={setCurrentPage} />}
        {currentPage === 'forum' && <ForumPage setCurrentPage={setCurrentPage} />}
        {currentPage === 'contact' && <ContactPage />}
        {currentPage === 'login' && <LoginPage setCurrentPage={setCurrentPage} />}
        {currentPage === 'signup' && <SignupPage setCurrentPage={setCurrentPage} />}

        <Footer completedCourses={completedCourses} />
      </div>
    </AuthProvider>
  );
};

export default App;
