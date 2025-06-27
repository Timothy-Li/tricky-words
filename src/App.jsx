import { useState } from "react";
import "./App.css";

import Header from "./components/Header/Header";
import HomeScreen from "./components/HomeScreen/HomeScreen";
import WordCard from "./components/WordCard/WordCard";
import ProgressBar from "./components/ProgressBar/ProgressBar";
import SummaryScreen from "./components/SummaryScreen/SummaryScreen";
import WelcomeScreen from "./components/WelcomeScreen/WelcomeScreen";
import StarChartScreen from "./components/StarChart/StarChartScreen";

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
  const [isViewingStarChart, setIsViewingStarChart] = useState(false);
  const [starsGiven, setStarsGiven] = useState(false);
  const [totalWords, setTotalWords] = useState(10);

  const handleSelectChild = (id) => {
    setActiveChildId(id);
    localStorage.setItem("activeChildId", id);
    setTotalWords(10);
  };

  const handleAddChild = (newChild) => {
    const updated = [...children, newChild];
    setChildren(updated);
    localStorage.setItem("children", JSON.stringify(updated));
  };

  const handleRemoveChild = (id) => {
    const updated = children.filter((child) => child.id !== id);
    setChildren(updated);
    localStorage.setItem("children", JSON.stringify(updated));

    if (id === activeChildId) {
      localStorage.removeItem("activeChildId");
      setActiveChildId(null);
      goHome();
    }
  };

  const handleUpdateStars = (childId = activeChildId, starsToAdd = 1) => {
    if (starsGiven) return;

    const updatedChildren = children.map((child) => {
      if (child.id === childId) {
        return { ...child, stars: child.stars + starsToAdd };
      }
      return child;
    });
    setChildren(updatedChildren);
    localStorage.setItem("children", JSON.stringify(updatedChildren));
    setStarsGiven(true);
  };

  const handleManualUpdateStars = (childId = activeChildId, starsToAdd) => {
    const updatedChildren = children.map((child) => {
      if (child.id === childId) {
        const newStarCount = Math.max(0, (child.stars || 0) + starsToAdd);
        return { ...child, stars: newStarCount };
      }
      return child;
    });
    setChildren(updatedChildren);
    localStorage.setItem("children", JSON.stringify(updatedChildren));
  };

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const startGame = async () => {
    setStarsGiven(false);

    try {
      const response = await fetch(`${backendUrl}/words?count=${totalWords}`);

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
    setIsViewingStarChart(false);
  };

  const restartSameWords = () => {
    setRoundInProgress(true);
    setCurrentIndex(0);
    setScore(0);
    setAnswers([]);
    setStarsGiven(false);
  };

  const handleShowStarChart = () => {
    setIsViewingStarChart(true);
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

  const handleLogOut = () => {
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
    setIsViewingStarChart(false);
  };

  const onWelcomeScreen = !activeChildId;
  const onHomeScreen = !roundInProgress && currentIndex === 0 && activeChildId;
  const showBackToHome = activeChildId && !onWelcomeScreen && !onHomeScreen;

  const renderScreen = () => {
    if (isViewingStarChart && activeChild) {
      return (
        <StarChartScreen
          child={activeChild}
          manualUpdateStars={handleManualUpdateStars}
        />
      );
    }

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
          totalWords={totalWords}
          setTotalWords={setTotalWords}
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
          child={activeChild}
          score={score}
          total={shuffledWords.length}
          answers={answers}
          restartSame={restartSameWords}
          restartNew={startGame}
          updateStars={handleUpdateStars}
        />
      );
    }
  };

  return (
    <>
      <Header
        activeChildName={activeChild?.name || null}
        onLogOut={handleLogOut}
        onGoHome={goHome}
        showBackToHome={isViewingStarChart || showBackToHome}
        onStarChart={handleShowStarChart}
        isViewingStarChart={isViewingStarChart}
        isGameActive={roundInProgress}
      />
      {renderScreen()}
    </>
  );
}

export default App;
