import { useEffect, useRef } from "react";
import "./WordCard.css";

export default function WordCard({ word, onAnswer }) {
  const wrongBtnRef = useRef(null);
  const rightBtnRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        wrongBtnRef.current?.classList.add("key-pressed");
        onAnswer(false);
      } else if (event.key === "ArrowRight") {
        rightBtnRef.current?.classList.add("key-pressed");
        onAnswer(true);
      }
    };

    const handleKeyUp = (event) => {
      if (event.key === "ArrowLeft") {
        wrongBtnRef.current?.classList.remove("key-pressed");
      } else if (event.key === "ArrowRight") {
        rightBtnRef.current?.classList.remove("key-pressed");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [onAnswer]);

  return (
    <div className="word-card">
      <h2 className="word-text">{word}</h2>
      <div className="buttons">
        <button
          ref={wrongBtnRef}
          className="wrong-button"
          onClick={() => onAnswer(false)}
        >
          Wrong
        </button>
        <button
          ref={rightBtnRef}
          className="right-button"
          onClick={() => onAnswer(true)}
        >
          Right
        </button>
      </div>
    </div>
  );
}
