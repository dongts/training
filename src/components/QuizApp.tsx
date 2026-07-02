import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Shuffle, RotateCcw, CheckCircle, XCircle, Award, BookOpen, List, X, Clock, Play } from 'lucide-react';

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

const parsePositiveInt = (value: string | null): number | null => {
  if (!value) return null;
  const n = parseInt(value, 10);
  return Number.isFinite(n) && n > 0 ? n : null;
};

const formatTime = (totalSeconds: number): string => {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};

const QuizApp: React.FC<QuizAppProps> = ({ quizData, title, storageKey }) => {
  // Fingerprint of the shipped question bank; saved progress from a different
  // bank version (e.g. before a dataset update) is discarded on load
  const bankSignature = `${quizData.length}-${quizData.map((q) => q.answer_letter).join('')}`;
  const [searchParams] = useSearchParams();
  const prefillCount = parsePositiveInt(searchParams.get('count'));
  const prefillTime = parsePositiveInt(searchParams.get('time'));

  const [quizStarted, setQuizStarted] = useState(false);
  const [configCount, setConfigCount] = useState(
    Math.min(prefillCount ?? quizData.length, quizData.length)
  );
  const [configTime, setConfigTime] = useState(prefillTime ?? 0); // minutes, 0 = no limit
  const [timeLeft, setTimeLeft] = useState<number | null>(null); // seconds, null = no limit
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
      timeLeft,
      configCount,
      configTime,
      bankSignature,
      timestamp: Date.now()
    };
    localStorage.setItem(storageKey, JSON.stringify(quizState));
  };

  const loadFromLocalStorage = () => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const state = JSON.parse(saved);
        // Discard progress saved against a different question bank version
        if (state.bankSignature !== bankSignature) {
          console.log('Clearing cached quiz - question bank has been updated');
          clearLocalStorage();
          return false;
        }
        // Check if saved data is not too old (24 hours)
        if (Date.now() - state.timestamp < 24 * 60 * 60 * 1000) {
          // Check if the questions have the correct structure (with answer_letter)
          if (state.questions && state.questions.length > 0 && state.questions[0].answer_letter) {
            setQuestions(state.questions || []);
            setCurrentQuestionIndex(state.currentQuestionIndex || 0);
            setSelectedAnswer(state.selectedAnswer || '');
            setShowResult(state.showResult || false);
            setScore(state.score || 0);
            setAnsweredQuestions(state.answeredQuestions || []);
            setQuizCompleted(state.quizCompleted || false);
            setQuestionStatus(state.questionStatus || []);
            setShowHint(state.showHint || false);
            setTimeLeft(typeof state.timeLeft === 'number' ? state.timeLeft : null);
            if (state.configCount) setConfigCount(state.configCount);
            if (typeof state.configTime === 'number') setConfigTime(state.configTime);
            setQuizStarted(true);
            return true;
          } else {
            // Clear invalid cached data
            console.log('Clearing invalid cached data - missing answer_letter field');
            clearLocalStorage();
          }
        }
      }
    } catch (error) {
      console.log('Error loading saved quiz:', error);
      clearLocalStorage();
    }
    return false;
  };

  const clearLocalStorage = () => {
    localStorage.removeItem(storageKey);
  };

  // Resume a saved quiz on mount; otherwise stay on the setup screen
  useEffect(() => {
    loadFromLocalStorage();
  }, []);

  // Save state changes to localStorage
  useEffect(() => {
    if (questions.length > 0) {
      saveToLocalStorage();
    }
  }, [questions, currentQuestionIndex, selectedAnswer, showResult, score, answeredQuestions, quizCompleted, questionStatus, showHint, timeLeft]);

  // Countdown timer: ticks once per second, finishes the quiz at 0
  useEffect(() => {
    if (!quizStarted || quizCompleted || timeLeft === null) return;
    if (timeLeft <= 0) {
      setQuizCompleted(true);
      return;
    }
    const id = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(id);
  }, [quizStarted, quizCompleted, timeLeft]);

  // Auto-show results when hint mode is enabled
  useEffect(() => {
    if (showHint) {
      setShowResult(true);
    }
  }, [showHint]);

  const startQuiz = (count: number, timeMinutes: number) => {
    const clampedCount = Math.min(Math.max(count, 1), quizData.length);
    const shuffled = [...quizData].sort(() => Math.random() - 0.5).slice(0, clampedCount);
    setQuestions(shuffled);
    setCurrentQuestionIndex(0);
    setSelectedAnswer('');
    setShowResult(false);
    setScore(0);
    setAnsweredQuestions([]);
    setQuizCompleted(false);
    setQuestionStatus(new Array(shuffled.length).fill(null).map(() => ({ answered: false })));
    setShowHint(false);
    setTimeLeft(timeMinutes > 0 ? timeMinutes * 60 : null);
    setQuizStarted(true);
    clearLocalStorage();
  };

  const shuffleQuestions = () => {
    startQuiz(configCount, configTime);
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

  // Back to the setup screen to pick a new configuration
  const resetQuiz = () => {
    clearLocalStorage();
    setQuizStarted(false);
    setQuizCompleted(false);
    setQuestions([]);
    setTimeLeft(null);
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

  if (!quizStarted) {
    const maxCount = quizData.length;
    return (
      <div className="max-w-xl mx-auto p-6 bg-white min-h-screen flex flex-col justify-center">
        <div className="bg-gray-50 rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <BookOpen className="w-10 h-10 text-blue-600 mx-auto mb-3" />
            <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
            <p className="text-sm text-gray-500 mt-2">{maxCount} câu hỏi khả dụng</p>
          </div>

          <div className="space-y-6 mb-8">
            <div>
              <label htmlFor="quiz-count" className="block text-sm font-medium text-gray-700 mb-2">
                Số câu hỏi (1–{maxCount})
              </label>
              <input
                id="quiz-count"
                type="number"
                min={1}
                max={maxCount}
                value={configCount}
                onChange={(e) => setConfigCount(parseInt(e.target.value, 10) || 0)}
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
              />
              <div className="flex gap-2 mt-2">
                {[10, 20, 50, maxCount].filter((n, i, arr) => n <= maxCount && arr.indexOf(n) === i).map((n) => (
                  <button
                    key={n}
                    onClick={() => setConfigCount(n)}
                    className={`px-3 py-1 rounded-full text-xs border transition-colors ${
                      configCount === n
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400'
                    }`}
                  >
                    {n === maxCount ? `Tất cả (${maxCount})` : n}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="quiz-time" className="block text-sm font-medium text-gray-700 mb-2">
                Thời gian làm bài (phút, 0 = không giới hạn)
              </label>
              <input
                id="quiz-time"
                type="number"
                min={0}
                value={configTime}
                onChange={(e) => setConfigTime(parseInt(e.target.value, 10) || 0)}
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
              />
              <div className="flex gap-2 mt-2">
                {[0, 15, 30, 60].map((n) => (
                  <button
                    key={n}
                    onClick={() => setConfigTime(n)}
                    className={`px-3 py-1 rounded-full text-xs border transition-colors ${
                      configTime === n
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400'
                    }`}
                  >
                    {n === 0 ? 'Không giới hạn' : `${n} phút`}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => startQuiz(configCount, configTime)}
              disabled={configCount < 1}
              className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
            >
              <Play className="w-5 h-5" />
              Bắt đầu
            </button>
            <button
              onClick={() => window.location.hash = '#/'}
              className="flex items-center justify-center gap-2 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Về trang chủ
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (quizCompleted) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white min-h-screen">
        <div className="text-center mb-8">
          <Award className="mx-auto mb-4 text-6xl text-yellow-500" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {timeLeft === 0 ? 'Hết giờ!' : 'Quiz Completed!'}
          </h1>
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
        
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
          {timeLeft !== null && (
            <span
              className={`flex items-center gap-1 font-mono text-base font-semibold ${
                timeLeft < 60 ? 'text-red-600 animate-pulse' : 'text-gray-700'
              }`}
            >
              <Clock className="w-4 h-4" />
              {formatTime(timeLeft)}
            </span>
          )}
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
              // ALWAYS highlight the correct answer in green (highest priority)
              buttonClass += "border-green-500 bg-green-50 text-green-800";
            } else if (isSelected && !isCorrect) {
              // Show user's selected answer (if wrong, will be red)
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
                {(showResult || questionAlreadyAnswered) && isSelected && !isCorrect && (
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
