import { useEffect } from "react";
import "./WordCard.css";

export default function WordCard({ word, onAnswer }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") {
        onAnswer(true);
      } else if (event.key === "ArrowLeft") {
        onAnswer(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onAnswer]);

  return (
    <div className="word-card">
      <h2 className="word-text">{word}</h2>
      <div className="buttons">
        <button className="right-button" onClick={() => onAnswer(true)}>
          Right
        </button>
        <button className="wrong-button" onClick={() => onAnswer(false)}>
          Wrong
        </button>
      </div>
    </div>
  );
}
