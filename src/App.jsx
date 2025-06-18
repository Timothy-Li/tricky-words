import { useState, useEffect } from "react";
import "./App.css";

import Header from "./components/Header/Header";
import HomeScreen from "./components/HomeScreen/HomeScreen";
import WordCard from "./components/WordCard/WordCard";
import ProgressBar from "./components/ProgressBar/ProgressBar";
import SummaryScreen from "./components/SummaryScreen/SummaryScreen";

import trickyWords from "./data/trickyWords.json";

const TOTAL_WORDS = 20;

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function App() {
  const [roundInProgress, setRoundInProgress] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [shuffledWords, setShuffledWords] = useState([]);

  const startGame = () => {
    setShuffledWords(shuffleArray(trickyWords).slice(0, TOTAL_WORDS));
    setRoundInProgress(true);
    setCurrentIndex(0);
    setScore(0);
    setAnswers([]);
  };

  const restartSameWords = () => {
    setRoundInProgress(true);
    setCurrentIndex(0);
    setScore(0);
    setAnswers([]);
  };

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
    setAnswers((prev) => [
      ...prev,
      { word: shuffledWords[currentIndex], correct: isCorrect },
    ]);

    if (currentIndex < TOTAL_WORDS - 1) {
      setCurrentIndex((prev) => prev + 1);
      return;
    }

    setRoundInProgress(false);
    setCurrentIndex(TOTAL_WORDS);
  };

  const renderScreen = () => {
    if (!roundInProgress && currentIndex === 0) {
      return <HomeScreen onStart={startGame} />;
    }
    if (roundInProgress && currentIndex < TOTAL_WORDS) {
      return (
        <>
          <ProgressBar
            current={currentIndex + 1}
            total={TOTAL_WORDS}
            score={score}
          />
          <WordCard
            word={shuffledWords[currentIndex]}
            onAnswer={handleAnswer}
          />
        </>
      );
    }
    if (currentIndex === TOTAL_WORDS) {
      return (
        <SummaryScreen
          score={score}
          total={TOTAL_WORDS}
          answers={answers}
          restartSame={restartSameWords}
          restartNew={startGame}
        />
      );
    }
  };

  // to check scores are updating properly
  // useEffect(() => {
  //   console.log("Score updated:", score);
  // }, [score]);

  // useEffect(() => {
  //   console.log("Answers", answers);
  // }, [answers]);

  return (
    <>
      <Header />
      {renderScreen()}
    </>
  );
}

export default App;
