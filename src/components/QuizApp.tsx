import React, { useState, useEffect } from 'react';
import { Shuffle, RotateCcw, CheckCircle, XCircle, Award, BookOpen, List, X } from 'lucide-react';

interface QuizQuestion {
  source: string;
  number: number;
  question: string;
  options: string[];
  answer_letter: string;
  answer_explanation: string;
}

interface AnsweredQuestion {
  question: string;
  selectedAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  options: string[];
}

interface QuestionStatus {
  answered: boolean;
  isCorrect?: boolean;
  selectedAnswer?: string;
}

interface QuizAppProps {
  quizData: QuizQuestion[];
  title: string;
  storageKey: string;
}

const QuizApp: React.FC<QuizAppProps> = ({ quizData, title, storageKey }) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<AnsweredQuestion[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showQuestionList, setShowQuestionList] = useState(false);
  const [questionStatus, setQuestionStatus] = useState<QuestionStatus[]>([]);
  const [showHint, setShowHint] = useState(false);

  // Local storage functions
  const saveToLocalStorage = () => {
    const quizState = {
      questions,
      currentQuestionIndex,
      selectedAnswer,
      showResult,
      score,
      answeredQuestions,
      quizCompleted,
      questionStatus,
      showHint,
      timestamp: Date.now()
    };
    localStorage.setItem(storageKey, JSON.stringify(quizState));
  };

  const loadFromLocalStorage = () => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const state = JSON.parse(saved);
        // Check if saved data is not too old (24 hours)
        if (Date.now() - state.timestamp < 24 * 60 * 60 * 1000) {
          setQuestions(state.questions || []);
          setCurrentQuestionIndex(state.currentQuestionIndex || 0);
          setSelectedAnswer(state.selectedAnswer || '');
          setShowResult(state.showResult || false);
          setScore(state.score || 0);
          setAnsweredQuestions(state.answeredQuestions || []);
          setQuizCompleted(state.quizCompleted || false);
          setQuestionStatus(state.questionStatus || []);
          setShowHint(state.showHint || false);
          return true;
        }
      }
    } catch (error) {
      console.log('Error loading saved quiz:', error);
    }
    return false;
  };

  const clearLocalStorage = () => {
    localStorage.removeItem(storageKey);
  };

  // Initialize quiz on component mount
  useEffect(() => {
    const hasLoadedData = loadFromLocalStorage();
    if (!hasLoadedData) {
    shuffleQuestions();
    }
  }, []);

  // Save state changes to localStorage
  useEffect(() => {
    if (questions.length > 0) {
      saveToLocalStorage();
    }
  }, [questions, currentQuestionIndex, selectedAnswer, showResult, score, answeredQuestions, quizCompleted, questionStatus, showHint]);

  // Auto-show results when hint mode is enabled
  useEffect(() => {
    if (showHint) {
      setShowResult(true);
    }
  }, [showHint]);

  const shuffleQuestions = () => {
    const shuffled = [...quizData].sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
    setCurrentQuestionIndex(0);
    setSelectedAnswer('');
    setShowResult(false);
    setScore(0);
    setAnsweredQuestions([]);
    setQuizCompleted(false);
    setQuestionStatus(new Array(shuffled.length).fill(null).map(() => ({ answered: false })));
    setShowHint(false);
    clearLocalStorage();
  };

  const handleAnswerSelect = (_option: string, index: number) => {
    const questionAlreadyAnswered = questionStatus[currentQuestionIndex]?.answered;
    if (!showResult && !questionAlreadyAnswered && !showHint) {
      setSelectedAnswer(String.fromCharCode(65 + index)); // Convert to A, B, C, D
    }
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer) return;

    const currentQuestion = questions[currentQuestionIndex];
    // Compare selected answer letter with correct answer letter
    const isCorrect = selectedAnswer === currentQuestion.answer_letter;
    
    if (isCorrect) {
      setScore(score + 1);
    }

    // Mark this question as answered with correct/incorrect status
    const newQuestionStatus = [...questionStatus];
    newQuestionStatus[currentQuestionIndex] = {
      answered: true,
      isCorrect,
      selectedAnswer
    };
    setQuestionStatus(newQuestionStatus);

    setAnsweredQuestions([
      ...answeredQuestions,
      {
        question: currentQuestion.question,
        selectedAnswer,
        correctAnswer: currentQuestion.answer_letter,
        isCorrect,
        options: currentQuestion.options
      }
    ]);

    setShowResult(true);
  };

  const resetQuiz = () => {
    shuffleQuestions();
  };

  // Navigate to specific question
  const goToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
    
    // If this question was already answered, show the previous answer and result
    const questionAlreadyAnswered = questionStatus[index]?.answered;
    if (questionAlreadyAnswered) {
      setSelectedAnswer(questionStatus[index]?.selectedAnswer || '');
      setShowResult(true);
    } else if (showHint) {
      // In hint mode, show results for all questions
      setSelectedAnswer('');
      setShowResult(true);
    } else {
      setSelectedAnswer('');
      setShowResult(false);
    }
    
    setShowQuestionList(false);
  };

  // Toggle question list visibility
  const toggleQuestionList = () => {
    setShowQuestionList(!showQuestionList);
  };

  // Navigation functions
  const goToPrevious = () => {
    if (currentQuestionIndex > 0) {
      const newIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(newIndex);
      
      // Check if the destination question was already answered
      const questionAlreadyAnswered = questionStatus[newIndex]?.answered;
      if (questionAlreadyAnswered) {
        setSelectedAnswer(questionStatus[newIndex]?.selectedAnswer || '');
        setShowResult(true);
      } else if (showHint) {
        // In hint mode, show results for all questions
        setSelectedAnswer('');
        setShowResult(true);
      } else {
        setSelectedAnswer('');
        setShowResult(false);
      }
    }
  };

  const goToNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      const newIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(newIndex);
      
      // Check if the destination question was already answered
      const questionAlreadyAnswered = questionStatus[newIndex]?.answered;
      if (questionAlreadyAnswered) {
        setSelectedAnswer(questionStatus[newIndex]?.selectedAnswer || '');
        setShowResult(true);
      } else if (showHint) {
        // In hint mode, show results for all questions
        setSelectedAnswer('');
        setShowResult(true);
      } else {
        setSelectedAnswer('');
        setShowResult(false);
      }
    } else {
      setQuizCompleted(true);
    }
  };

  const getScoreColor = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (questions.length === 0) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (quizCompleted) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white min-h-screen">
        <div className="text-center mb-8">
          <Award className="mx-auto mb-4 text-6xl text-yellow-500" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Quiz Completed!</h1>
          <div className={`text-4xl font-bold mb-4 ${getScoreColor()}`}>
            {score}/{questions.length} ({percentage}%)
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Review Your Answers</h2>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {answeredQuestions.map((answer, index) => (
              <div key={index} className="border-l-4 border-gray-300 pl-4">
                <p className="font-medium text-gray-700 mb-2">
                  Question {index + 1}: {answer.question.substring(0, 100)}...
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <span className={`flex items-center gap-1 ${answer.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                    {answer.isCorrect ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                    Your answer: {answer.selectedAnswer}
                  </span>
                  {!answer.isCorrect && (
                    <span className="text-green-600">
                      Correct: {answer.correctAnswer}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={resetQuiz}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            Start New Quiz
          </button>
          <button
            onClick={() => window.location.hash = '#/'}
            className="flex items-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <BookOpen className="w-6 h-6" />
            {title}
          </h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.location.hash = '#/'}
              className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Home
            </button>
            <button
              onClick={toggleQuestionList}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <List className="w-4 h-4" />
              Questions
            </button>
            <button
              onClick={resetQuiz}
              className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Restart
            </button>
          <button
            onClick={shuffleQuestions}
            className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <Shuffle className="w-4 h-4" />
            Shuffle
          </button>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between text-sm text-gray-600">
          <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
          <span>Score: {score}/{currentQuestionIndex + (showResult ? 1 : 0)}</span>
        </div>
      </div>

      {/* Question List Overlay */}
      {showQuestionList && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={toggleQuestionList}>
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-96 overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-800">Question Navigation</h3>
              <button
                onClick={toggleQuestionList}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 overflow-y-auto max-h-80">
              <div className="grid grid-cols-1 gap-2">
                {questions.map((question, index) => {
                  const status = questionStatus[index] || { answered: false };
                  const isCurrent = currentQuestionIndex === index;
                  return (
                    <button
                      key={index}
                      onClick={() => goToQuestion(index)}
                      className={`p-3 rounded-lg border-2 transition-all text-left flex items-center gap-3 ${
                        isCurrent
                          ? 'border-blue-500 bg-blue-50'
                          : status.answered && status.isCorrect
                          ? 'border-green-200 bg-green-50 hover:bg-green-100'
                          : status.answered && !status.isCorrect
                          ? 'border-red-200 bg-red-50 hover:bg-red-100'
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex-shrink-0">
                        {status.answered && status.isCorrect ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : status.answered && !status.isCorrect ? (
                          <XCircle className="w-5 h-5 text-red-600" />
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-medium text-sm text-gray-800">
                          Question {index + 1}
                          {isCurrent && <span className=" text-blue-600"> (Current)</span>}
                        </div>
                        <div className="text-xs text-gray-600 truncate">
                          {question.question.substring(0, 80)}...
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Question */}
      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <div className="text-xs text-blue-600 mb-2 uppercase tracking-wide">
          {currentQuestion.source}
        </div>
        <h2 className="text-lg font-medium text-gray-800 leading-relaxed">
          {currentQuestion.question}
        </h2>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {currentQuestion.options.map((option: string, index: number) => {
          const optionLetter = String.fromCharCode(65 + index);
          const isSelected = selectedAnswer === optionLetter;
          const isCorrect = optionLetter === currentQuestion.answer_letter; // Compare option letter with answer letter
          const questionAlreadyAnswered = questionStatus[currentQuestionIndex]?.answered;
          
          let buttonClass = "w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ";
          
          if (showResult || questionAlreadyAnswered || showHint) {
            // Show result state - readonly with color coding
            if (isCorrect) {
              // ALWAYS highlight the correct answer in green
              buttonClass += "border-green-500 bg-green-50 text-green-800";
            } else if (isSelected && !showHint) {
              // Show user's selected answer (if wrong, will be red) - only when not in hint mode
              buttonClass += "border-red-500 bg-red-50 text-red-800";
            } else {
              // Other unselected options remain neutral
              buttonClass += "border-gray-200 bg-gray-50 text-gray-600";
            }
            buttonClass += " cursor-default"; // Make it clear it's not clickable
          } else {
            // Interactive state - can be clicked
            if (isSelected) {
              buttonClass += "border-blue-500 bg-blue-50 text-blue-800";
            } else {
              buttonClass += "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50 cursor-pointer";
            }
          }

          return (
            <button
              key={index}
              onClick={() => handleAnswerSelect(option, index)}
              disabled={showResult || questionAlreadyAnswered || showHint}
              className={buttonClass}
            >
              <div className="flex items-start gap-3">
                <span className="font-bold text-sm mt-1 min-w-[24px]">
                  {optionLetter}.
                </span>
                <span className="flex-1">{option}</span>
                {(showResult || questionAlreadyAnswered || showHint) && isCorrect && (
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                )}
                {(showResult || questionAlreadyAnswered) && isSelected && !isCorrect && !showHint && (
                  <XCircle className="w-5 h-5 text-red-600 mt-1" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Hint Checkbox */}
      <div className="flex justify-center mb-4">
        <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
          <input
            type="checkbox"
            checked={showHint}
            onChange={(e) => setShowHint(e.target.checked)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
          />
          <span>Show all correct answers (Review Mode)</span>
        </label>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center items-center gap-4 mt-6">
        {/* Previous Button */}
        <button
          onClick={goToPrevious}
          disabled={currentQuestionIndex === 0}
          className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          ← Previous
        </button>

        {/* Submit Answer Button (only show if not submitted yet and not in hint mode) */}
        {!showResult && !questionStatus[currentQuestionIndex]?.answered && !showHint && (
          <button
            onClick={handleSubmitAnswer}
            disabled={!selectedAnswer}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            Submit Answer
          </button>
        )}

        {/* Next Button */}
        <button
          onClick={goToNext}
          className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
        >
          {currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next →'}
        </button>
      </div>
    </div>
  );
};

export default QuizApp;
