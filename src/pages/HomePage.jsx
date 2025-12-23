import React from 'react';
import StatCard from '../components/StatCard';
import '../styles/HomePage.css';

const HomePage = ({ setCurrentPage }) => {
  return (
    <div className="home-page">
      {/* Decorative background elements */}
      <div className="decorative-quote decorative-quote-1">"</div>
      <div className="decorative-quote decorative-quote-2">"</div>
      
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1 className="hero-title fade-in-up">
            master the art of english
          </h1>
          <p className="hero-subtitle fade-in-up" style={{ animationDelay: '0.2s' }}>
            from foundational literacy to literary analysis — a comprehensive journey 
            through reading, writing, grammar, and rhetoric
          </p>
          <div className="cta-buttons fade-in-up" style={{ animationDelay: '0.4s' }}>
            <button className="btn-primary" onClick={() => setCurrentPage('curriculum')}>
              begin your journey
            </button>
            <button className="btn-secondary" onClick={() => setCurrentPage('diagnostic')}>
              take diagnostic
            </button>
          </div>
          <p className="hero-note">
            curated courses from world-class institutions • completely free
          </p>

          {/* Stats */}
          <div className="stats">
            <StatCard number="80+" label="free courses" delay={0.5} />
            <StatCard number="13" label="levels" delay={0.6} />
            <StatCard number="100%" label="free content" delay={0.7} />
            <StatCard number="∞" label="possibilities" delay={0.8} />
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-content">
            <div className="mission-text">
              <h2 className="section-title">our mission</h2>
              <h3 className="mission-subtitle">eloquence through education</h3>
              <p className="mission-para">
                we believe that mastery of language unlocks doors to understanding, 
                expression, and opportunity. from learning to read to crafting persuasive 
                arguments, we guide learners through the complete arc of english mastery.
              </p>
              <ul className="mission-list">
                <li className="mission-item">📚 curated courses from top universities and platforms</li>
                <li className="mission-item">📝 clear progression from literacy to advanced composition</li>
                <li className="mission-item">✍️ writing practice and literary analysis</li>
                <li className="mission-item">🎯 diagnostic assessment to find your perfect starting point</li>
              </ul>
            </div>
            <div className="literary-quote">
              <div className="quote-text">
                "The limits of my language mean the limits of my world."
              </div>
              <div className="quote-author">— Ludwig Wittgenstein</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="container">
          <h2 className="section-title">how it works</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3 className="step-title">assess your level</h3>
              <p className="step-description">
                take our comprehensive diagnostic to identify your current reading level 
                and language proficiency
              </p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3 className="step-title">follow the curriculum</h3>
              <p className="step-description">
                progress through levels from early literacy to advanced rhetoric, with 
                curated courses at each stage
              </p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3 className="step-title">engage the community</h3>
              <p className="step-description">
                join discussions, share your writing, receive feedback, and connect 
                with fellow learners
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Preview */}
      <section className="curriculum-preview">
        <div className="container">
          <h2 className="section-title">curriculum overview</h2>
          <p className="section-subtitle">
            a structured pathway through the complete arc of english mastery
          </p>
          <div className="level-cards">
            <div className="level-card">
              <div className="level-icon">📖</div>
              <h3 className="level-card-title">levels 1-3</h3>
              <p className="level-card-description">
                early literacy — phonics, reading fundamentals, basic writing
              </p>
            </div>
            <div className="level-card">
              <div className="level-icon">✍️</div>
              <h3 className="level-card-title">levels 4-6</h3>
              <p className="level-card-description">
                intermediate reading — comprehension, grammar, creative writing
              </p>
            </div>
            <div className="level-card">
              <div className="level-icon">📚</div>
              <h3 className="level-card-title">levels 7-9</h3>
              <p className="level-card-description">
                advanced literacy — literature analysis, persuasive writing
              </p>
            </div>
            <div className="level-card">
              <div className="level-icon">🎓</div>
              <h3 className="level-card-title">levels 10-13</h3>
              <p className="level-card-description">
                mastery — rhetoric, critical theory, academic writing
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="container">
          <h2 className="section-title">what learners say</h2>
          <div className="testimonial-grid">
            <div className="testimonial">
              <div className="testimonial-quote">"</div>
              <p className="testimonial-text">
                this curriculum transformed my relationship with reading. i went from 
                struggling with comprehension to analyzing shakespeare with confidence.
              </p>
              <p className="testimonial-author">— maya, college freshman</p>
            </div>
            <div className="testimonial">
              <div className="testimonial-quote">"</div>
              <p className="testimonial-text">
                as an english learner, this structured approach gave me the foundation 
                i needed. now i write professionally and read voraciously.
              </p>
              <p className="testimonial-author">— james, software engineer</p>
            </div>
            <div className="testimonial">
              <div className="testimonial-quote">"</div>
              <p className="testimonial-text">
                the progression from basic grammar to rhetorical analysis was exactly 
                what i needed to prepare for graduate school.
              </p>
              <p className="testimonial-author">— patricia, phd student</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
