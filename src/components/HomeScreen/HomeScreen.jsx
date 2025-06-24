import "./HomeScreen.css";

export default function HomeScreen({
  onStart,
  childName,
  totalWords,
  setTotalWords,
}) {
  const handleIncrement = () => {
    if (totalWords < 30) {
      setTotalWords((prev) => prev + 5);
    }
  };

  const handleDecrement = () => {
    if (totalWords > 5) {
      setTotalWords((prev) => prev - 5);
    }
  };

  return (
    <div className="home-screen">
      <p>Hello {childName}, press Start when you are ready.</p>
      <div>
        <label>
          Number of Words: <span className="number-display">{totalWords}</span>
          <input
            type="range"
            min="5"
            max="30"
            step="5"
            value={totalWords}
            onChange={(e) => setTotalWords(Number(e.target.value))}
          ></input>
          <button onClick={handleDecrement}>−</button>
          <button onClick={handleIncrement}>+</button>
        </label>
      </div>
      <button
        onClick={onStart}
        className="start-button"
        style={{ marginTop: "20px" }}
      >
        Start
      </button>
    </div>
  );
}
