import { useState, useEffect } from "react";
import "./App.css";

import Header from "./components/Header/Header";
import HomeScreen from "./components/HomeScreen/HomeScreen";
import WordCard from "./components/WordCard/WordCard";
import ProgressBar from "./components/ProgressBar/ProgressBar";
import SummaryScreen from "./components/SummaryScreen/SummaryScreen";
import WelcomeScreen from "./components/WelcomeScreen/WelcomeScreen";

const TOTAL_WORDS = 10;

function App() {
  const [activeChildId, setActiveChildId] = useState(
    () => localStorage.getItem("activeChildId") || null
  );
  const [children, setChildren] = useState(() => {
    const saved = localStorage.getItem("children");
    return saved ? JSON.parse(saved) : [];
  });

  const activeChild = children.find((c) => c.id === activeChildId);
  const [roundInProgress, setRoundInProgress] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [shuffledWords, setShuffledWords] = useState([]);

  const handleSelectChild = (id) => {
    setActiveChildId(id);
    localStorage.setItem("activeChildId", id);
  };

  const handleAddChild = (newChild) => {
    const updated = [...children, newChild];
    setChildren(updated);
    localStorage.setItem("children", JSON.stringify(updated));

    setActiveChildId(newChild.id);
    localStorage.setItem("activeChildId", newChild.id);
  };

  // Remove a child by id
  const handleRemoveChild = (id) => {
    const updated = children.filter((child) => child.id !== id);
    setChildren(updated);
    localStorage.setItem("children", JSON.stringify(updated));

    // If removed child is active, clear activeChildId and reset game
    if (id === activeChildId) {
      localStorage.removeItem("activeChildId");
      setActiveChildId(null);
      goHome();
    }
  };

  const startGame = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/words?count=${TOTAL_WORDS}`
      );

      if (!response.ok) {
        throw new Error("Server error");
      }

      const data = await response.json();

      setShuffledWords(data);
      setRoundInProgress(true);
      setCurrentIndex(0);
      setScore(0);
      setAnswers([]);
    } catch (error) {
      console.error("Failed to fetch words:", error);
    }
  };

  const goHome = () => {
    setRoundInProgress(false);
    setCurrentIndex(0);
    setScore(0);
    setAnswers([]);
    setShuffledWords([]);
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
      { word: shuffledWords[currentIndex].word, correct: isCorrect },
    ]);

    if (currentIndex < shuffledWords.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      return;
    }

    setRoundInProgress(false);
    setCurrentIndex(shuffledWords.length);
  };

  const handleSwitchUser = () => {
    if (!activeChildId) return;

    localStorage.removeItem("activeChildId");
    localStorage.removeItem(`progress-${activeChildId}`);
    localStorage.removeItem(`stars-${activeChildId}`);

    setActiveChildId(null);
    setRoundInProgress(false);
    setCurrentIndex(0);
    setScore(0);
    setAnswers([]);
    setShuffledWords([]);
  };

  const onWelcomeScreen = !activeChildId;
  const onHomeScreen = !roundInProgress && currentIndex === 0 && activeChildId;

  const showBackToHome = activeChildId && !onWelcomeScreen && !onHomeScreen;

  const renderScreen = () => {
    if (!activeChildId) {
      return (
        <WelcomeScreen
          children={children}
          onAddChild={handleAddChild}
          onSelectChild={handleSelectChild}
          onRemoveChild={handleRemoveChild}
        />
      );
    }

    if (!roundInProgress && currentIndex === 0) {
      return (
        <HomeScreen
          onStart={startGame}
          childName={activeChild?.name || "there"}
        />
      );
    }
    if (roundInProgress && currentIndex < shuffledWords.length) {
      return (
        <>
          <ProgressBar
            current={currentIndex + 1}
            total={shuffledWords.length}
            score={score}
          />
          <WordCard
            word={shuffledWords[currentIndex].word}
            onAnswer={handleAnswer}
          />
        </>
      );
    }
    if (currentIndex === shuffledWords.length) {
      return (
        <SummaryScreen
          score={score}
          total={shuffledWords.length}
          answers={answers}
          restartSame={restartSameWords}
          restartNew={startGame}
        />
      );
    }
  };

  return (
    <>
      <Header
        activeChildName={activeChild?.name || null}
        onSwitchUser={handleSwitchUser}
        onGoHome={goHome}
        showBackToHome={showBackToHome}
      />
      {renderScreen()}
    </>
  );
}

export default App;
