export default function WordCard({ word, onAnswer, onNavHome }) {
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
