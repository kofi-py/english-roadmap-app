import React, { useState } from 'react';
import { diagnosticQuestions, levelInfo } from '../data/diagnosticData';
import '../styles/DiagnosticPage.css';

const DiagnosticPage = ({ setCurrentPage }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswer = (optionIndex) => {
    setSelectedAnswer(optionIndex);
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;

    const newAnswers = [...answers, {
      correct: selectedAnswer === diagnosticQuestions[currentQuestion].correct,
      level: diagnosticQuestions[currentQuestion].level
    }];
    setAnswers(newAnswers);

    if (currentQuestion < diagnosticQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResults(true);
    }
  };

  const calculateLevel = () => {
    let recommendedLevel = 1;
    let correctCount = 0;

    for (let answer of answers) {
      if (answer.correct) {
        correctCount++;
        recommendedLevel = Math.max(recommendedLevel, answer.level);
      } else {
        break;
      }
    }

    if (correctCount < 4) {
      recommendedLevel = Math.max(1, Math.floor(recommendedLevel / 2));
    }

    return recommendedLevel;
  };

  if (showResults) {
    const level = calculateLevel();
    return (
      <div className="diagnostic-page">
        <div className="container">
          <div className="diagnostic-container">
            <div className="results">
              <h2 className="results-title">your recommended level</h2>
              <div className="level-badge">level {level}</div>
              <div className="recommendation">
                <h3 className="recommendation-title">{levelInfo[level]}</h3>
                <p className="recommendation-text">
                  Based on your responses, we recommend starting with Level {level}. 
                  This will ensure you build a strong foundation while being appropriately challenged.
                </p>
              </div>
              <div className="action-buttons">
                <button 
                  className="btn-primary"
                  onClick={() => setCurrentPage('curriculum')}
                >
                  view curriculum
                </button>
                <button 
                  className="btn-secondary"
                  onClick={() => window.location.reload()}
                >
                  retake test
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const progress = ((currentQuestion) / diagnosticQuestions.length) * 100;

  return (
    <div className="diagnostic-page">
      <div className="diagnostic-header">
        <div className="container">
          <h1 className="diagnostic-title">find your level</h1>
          <p className="diagnostic-subtitle">
            answer these questions to discover your current english proficiency level 
            and get personalized curriculum recommendations
          </p>
        </div>
      </div>

      <div className="container">
        <div className="diagnostic-container">
          <div className="progress-bar-small">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="question-section">
            <div className="question-number">
              question {currentQuestion + 1} of {diagnosticQuestions.length}
            </div>
            <div className="question-text">
              {diagnosticQuestions[currentQuestion].question}
            </div>
            <div className="options">
              {diagnosticQuestions[currentQuestion].options.map((option, idx) => (
                <div
                  key={idx}
                  className={`option ${selectedAnswer === idx ? 'selected' : ''}`}
                  onClick={() => handleAnswer(idx)}
                >
                  {option}
                </div>
              ))}
            </div>
            <div className="navigation-buttons">
              <button
                className="btn-primary btn-next"
                onClick={handleNext}
                disabled={selectedAnswer === null}
              >
                {currentQuestion < diagnosticQuestions.length - 1 ? 'next' : 'see results'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagnosticPage;
