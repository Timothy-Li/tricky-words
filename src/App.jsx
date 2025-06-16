import { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import HomeScreen from "./components/HomeScreen/HomeScreen";

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const startGame = () => {
    setGameStarted(true);
    setCurrentIndex(0);
  };

  let screen;

  if (!gameStarted && currentIndex === 0) {
    screen = <HomeScreen onStart={startGame} />;
  }

  return (
    <>
      <Header />
      {screen}
    </>
  );
}

export default App;
