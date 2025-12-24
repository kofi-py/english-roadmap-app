import { useAuth } from '../context/AuthContext';
import '../styles/Navigation.css';

const Navigation = ({ currentPage, setCurrentPage }) => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setCurrentPage('home');
  };

  return (
    <nav className="nav">
      <div className="nav-container">
        <div className="logo" onClick={() => setCurrentPage('home')}>
          <span className="logo-icon">✒️</span>
          <span className="logo-text">english mastery roadmap</span>
        </div>
        <ul className="nav-links">
          <li className="nav-item" onClick={() => setCurrentPage('curriculum')}>curriculum</li>
          <li className="nav-item" onClick={() => setCurrentPage('diagnostic')}>diagnostic</li>
          <li className="nav-item" onClick={() => setCurrentPage('forum')}>forum</li>
          <li className="nav-item" onClick={() => setCurrentPage('contact')}>contact</li>
          {user ? (
            <>
              <li className="user-badge">
                <span className="user-icon">👤</span>
                {user.username}
              </li>
              <li className="nav-item" onClick={handleLogout}>logout</li>
            </>
          ) : (
            <li className="nav-item" onClick={() => setCurrentPage('login')}>login</li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
