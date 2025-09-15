import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import QuizApp from './components/QuizApp';
import testDauThauData from './test_dau_thau.json';

interface QuizQuestion {
  source: string;
  number: number;
  question: string;
  options: string[];
  answer_letter: string;
  answer_explanation: string;
}

// Prepare quiz data for Luật Đấu thầu
const luatDauThauQuizData: QuizQuestion[] = testDauThauData.map((item: any) => ({
  source: "Luật Đấu thầu",
  number: item.question_number || item.original_question_number,
  question: item.question,
  options: item.options,
  answer_letter: item.answer_letter,
  answer_explanation: ""
}));

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
          path="/luat-dau-thau" 
          element={
            <QuizApp 
              quizData={luatDauThauQuizData}
              title="Quiz Luật Đấu thầu"
              storageKey="luatDauThauQuizProgress"
            />
          } 
        />
        {/* Add more quiz routes here in the future */}
      </Routes>
    </HashRouter>
  );
};

// Render the app
const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default App;