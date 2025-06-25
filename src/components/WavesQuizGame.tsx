import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  level: string;
}

interface Wave {
  number: number;
  questions: Question[];
  timeLimit: number;
  completed: boolean;
}

interface WavesQuizGameProps {
  onBackToMenu: () => void;
  showCloseIcon?: boolean;
}

// Local algebraic questions (15 total, 5 waves of 3)
const allQuestions: Question[] = [
  { id: '1', question: 'Which is a variable?', options: ['5', 'x', '7', '12'], correctAnswer: 'x', level: 'too easy' },
  { id: '2', question: 'Which is a constant?', options: ['y', '3', 'a', 'z'], correctAnswer: '3', level: 'too easy' },
  { id: '3', question: 'Which is an expression?', options: ['2x + 1', 'b', '9', 'c'], correctAnswer: '2x + 1', level: 'too easy' },
  { id: '4', question: 'Which is an equation?', options: ['x + 2 = 5', 'm', '4', 'y'], correctAnswer: 'x + 2 = 5', level: 'easy' },
  { id: '5', question: 'Which is a variable?', options: ['7', 'k', '10', '2'], correctAnswer: 'k', level: 'easy' },
  { id: '6', question: 'Which is a constant?', options: ['n', '8', 'p', 'q'], correctAnswer: '8', level: 'easy' },
  { id: '7', question: 'Which is an expression?', options: ['3y - 4', '5', 'r', 's'], correctAnswer: '3y - 4', level: 'medium' },
  { id: '8', question: 'Which is an equation?', options: ['a + b = 7', 't', 'u', '6'], correctAnswer: 'a + b = 7', level: 'medium' },
  { id: '9', question: 'Which is a variable?', options: ['v', '11', 'w', '13'], correctAnswer: 'v', level: 'medium' },
  { id: '10', question: 'Which is a constant?', options: ['x', 'y', '14', 'z'], correctAnswer: '14', level: 'hard' },
  { id: '11', question: 'Which is an expression?', options: ['4m + 2', 'n', 'o', '15'], correctAnswer: '4m + 2', level: 'hard' },
  { id: '12', question: 'Which is an equation?', options: ['p + 3 = 9', 'q', 'r', '16'], correctAnswer: 'p + 3 = 9', level: 'hard' },
  { id: '13', question: 'Which is a variable?', options: ['s', '17', 't', '18'], correctAnswer: 's', level: 'too hard' },
  { id: '14', question: 'Which is a constant?', options: ['u', '19', 'v', '20'], correctAnswer: '19', level: 'too hard' },
  { id: '15', question: 'Which is an expression?', options: ['5x - 2', 'w', 'x', 'y'], correctAnswer: '5x - 2', level: 'too hard' },
];

const levels = ['too easy', 'easy', 'medium', 'hard', 'too hard'];

function generateWaves(questions: Question[], numWaves = 5, questionsPerWave = 3): Wave[] {
  const waves: Wave[] = [];
  for (let i = 0; i < numWaves; i++) {
    const level = levels[i] || levels[levels.length - 1];
    let questionsForLevel = questions.filter(q => q.level === level);
    if (questionsForLevel.length < questionsPerWave) {
      questionsForLevel = [...questionsForLevel, ...questions.filter(q => q.level !== level)];
    }
    const shuffled = [...questionsForLevel].sort(() => Math.random() - 0.5);
    waves.push({
      number: i + 1,
      questions: shuffled.slice(0, questionsPerWave),
      timeLimit: 30,
      completed: false,
    });
  }
  return waves;
}

const WavesQuizGame: React.FC<WavesQuizGameProps> = ({ onBackToMenu, showCloseIcon }) => {
  const [waves, setWaves] = useState<Wave[]>([]);
  const [currentWave, setCurrentWave] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [showWaveComplete, setShowWaveComplete] = useState(false);
  const [showGameOver, setShowGameOver] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [nameEntered, setNameEntered] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);

  useEffect(() => {
    setWaves(generateWaves(allQuestions));
    setCurrentWave(0);
    setQuestionIndex(0);
    setScore(0);
    setFeedback(null);
    setSelected(null);
    setShowWaveComplete(false);
    setShowGameOver(false);
    setNameEntered(false);
    setPlayerName('');
  }, []);

  // Add close icon to all screens
  const CloseIcon = showCloseIcon ? (
    <button
      className="absolute top-4 right-4 z-50 text-gray-400 hover:text-gray-700 text-3xl font-bold focus:outline-none"
      aria-label="Close and return to menu"
      onClick={onBackToMenu}
      type="button"
    >
      ×
    </button>
  ) : null;

  if (showInstructions) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col justify-between">
        <div className="flex-1 flex flex-col items-center justify-center relative">
          {CloseIcon}
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full flex flex-col gap-6 items-center">
            <h1 className="text-3xl font-bold text-center mb-4">How to Play</h1>
            <ul className="list-disc list-inside text-gray-700 space-y-3 mb-6 text-base">
              <li>You will see algebra questions. For each, select the correct answer.</li>
              <li>Try to get as many right as you can through 5 waves!</li>
            </ul>
            <button
              className="w-full bg-blue-600 text-white p-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
              onClick={() => setShowInstructions(false)}
            >
              Continue
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!nameEntered) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col justify-between">
        <div className="flex-1 flex flex-col items-center justify-center relative">
          {CloseIcon}
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full flex flex-col gap-6 items-center">
            <h1 className="text-2xl font-bold text-center mb-2">Enter Your Name</h1>
            <input
              className="w-full p-3 border rounded-lg text-lg"
              type="text"
              value={playerName}
              onChange={e => setPlayerName(e.target.value)}
              placeholder="Your name"
              maxLength={20}
            />
            <button
              className="w-full bg-blue-600 text-white p-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
              onClick={() => setNameEntered(true)}
              disabled={!playerName.trim()}
            >
              Start Quiz
            </button>
            <button
              className="w-full bg-gray-300 text-gray-800 p-3 rounded-lg hover:bg-gray-400"
              onClick={onBackToMenu}
            >
              Back to Menu
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (waves.length === 0) return null;
  const wave = waves[currentWave];
  const question = wave.questions[questionIndex];

  const handleAnswer = (option: string) => {
    if (selected) return;
    setSelected(option);
    if (option === question.correctAnswer) {
      setScore(s => s + 1);
      setFeedback('correct');
    } else {
      setFeedback('incorrect');
    }
    setTimeout(() => {
      setSelected(null);
      setFeedback(null);
      if (questionIndex < wave.questions.length - 1) {
        setQuestionIndex(q => q + 1);
      } else {
        setShowWaveComplete(true);
      }
    }, 1200);
  };

  const handleNextWave = () => {
    if (currentWave < waves.length - 1) {
      setCurrentWave(w => w + 1);
      setQuestionIndex(0);
      setShowWaveComplete(false);
    } else {
      setShowGameOver(true);
    }
  };

  const handleRestart = () => {
    setWaves(generateWaves(allQuestions));
    setCurrentWave(0);
    setQuestionIndex(0);
    setScore(0);
    setFeedback(null);
    setSelected(null);
    setShowWaveComplete(false);
    setShowGameOver(false);
  };

  if (showGameOver) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col justify-between">
        <div className="flex-1 flex flex-col items-center justify-center relative">
          {CloseIcon}
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full flex flex-col gap-6 items-center">
            <h1 className="text-2xl font-bold text-center mb-2">Quiz Complete!</h1>
            <p className="text-lg">Your score: <span className="font-bold">{score} / 15</span></p>
            <button className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700" onClick={handleRestart}>Play Again</button>
            <button className="bg-gray-300 text-gray-800 p-3 rounded-lg hover:bg-gray-400" onClick={onBackToMenu}>Back to Menu</button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (showWaveComplete) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col justify-between">
        <div className="flex-1 flex flex-col items-center justify-center relative">
          {CloseIcon}
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full flex flex-col gap-6 items-center">
            <h1 className="text-2xl font-bold text-center mb-2">Wave {currentWave + 1} Complete!</h1>
            <p className="text-lg">Current score: <span className="font-bold">{score}</span></p>
            <button className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700" onClick={handleNextWave}>Next Wave</button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-between">
      <div className="flex-1 flex flex-col items-center justify-center relative">
        {CloseIcon}
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full flex flex-col gap-6 items-center">
          <h1 className="text-2xl font-bold text-center mb-2">Good luck, {playerName}!</h1>
          <h1 className="text-2xl font-bold text-center mb-2">Wave {currentWave + 1} / 5</h1>
          <p className="text-lg font-semibold mb-2">Question {questionIndex + 1} / 3</p>
          <div className="w-full bg-gray-200 rounded-lg h-2 mb-4">
            <div className="bg-blue-500 h-2 rounded-lg" style={{ width: `${((currentWave * 3 + questionIndex) / 15) * 100}%` }}></div>
          </div>
          <div className="w-full text-center text-xl font-bold mb-4">{question.question}</div>
          <div className="grid grid-cols-2 gap-4 w-full">
            {question.options.map((option, idx) => (
              <button
                key={idx}
                className={`p-4 rounded-lg border-2 font-semibold transition text-lg ${selected === option ? (feedback === 'correct' ? 'bg-green-200 border-green-500' : 'bg-red-200 border-red-500') : 'bg-white border-gray-300 hover:bg-blue-50'}`}
                onClick={() => handleAnswer(option)}
                disabled={!!selected}
              >
                {option}
              </button>
            ))}
          </div>
          {feedback && (
            <div className="mt-4 text-lg font-semibold">
              {feedback === 'correct' ? <span className="text-green-600">Correct!</span> : <span className="text-red-600">Incorrect!</span>}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default WavesQuizGame; 