import "./HomeScreen.css";

export default function HomeScreen({ onStart, totalWords, setTotalWords }) {
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
      <h2>Home</h2>
      <p style={{ marginBottom: "40px" }}>
        Adjust the settings and press Start when ready
      </p>
      <div>
        <label>
          Number of Words <span className="number-display">{totalWords}</span>
          <input
            type="range"
            min="5"
            max="30"
            step="5"
            value={totalWords}
            onChange={(e) => setTotalWords(Number(e.target.value))}
          ></input>
          <button className="decrement-button" onClick={handleDecrement}>
            −
          </button>
          <button className="increment-button" onClick={handleIncrement}>
            +
          </button>
        </label>
      </div>
      <button
        onClick={onStart}
        className="start-button"
        style={{ marginTop: "40px" }}
      >
        Start
      </button>
    </div>
  );
}
