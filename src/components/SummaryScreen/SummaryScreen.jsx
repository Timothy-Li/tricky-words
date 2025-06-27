import { useEffect } from "react";
import "./SummaryScreen.css";

export default function SummaryScreen({
  score,
  total,
  answers,
  restartSame,
  restartNew,
  updateStars,
  child,
}) {
  const fullMarks = score === total;

  const correctAnswers = answers.filter((a) => a.correct);
  const incorrectAnswers = answers.filter((a) => !a.correct);

  useEffect(() => {
    if (fullMarks) {
      updateStars();
    }
  }, [fullMarks, updateStars]);

  return (
    <div className="summary-screen">
      <h2>Summary</h2>
      <div>
        {child.name} scored {score} out of {total}.
      </div>
      {fullMarks ? (
        <div>
          Well done, you read all the words correctly, and earned a star! ⭐
        </div>
      ) : (
        <div>Practice any Tricky Words and Try Again!</div>
      )}

      {correctAnswers.length > 0 && (
        <>
          <h3 className="correct-title">Correct Words</h3>
          <ul className="correct-answers">
            {correctAnswers.map((answer, index) => (
              <li key={index}>{answer.word}</li>
            ))}
          </ul>
        </>
      )}

      {incorrectAnswers.length > 0 && (
        <>
          <h3 className="incorrect-title">Tricky Words</h3>
          <ul className="incorrect-answers">
            {incorrectAnswers.map((answer, index) => (
              <li key={index}>{answer.word}</li>
            ))}
          </ul>
        </>
      )}

      <div className="summary-buttons">
        <div className="summary-retry-label">Try Again</div>
        <button onClick={restartSame}>Same Words</button>
        <button onClick={restartNew}>New Words</button>
      </div>
    </div>
  );
}
