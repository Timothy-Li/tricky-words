import "./HomeScreen.css";

export default function HomeScreen({
  onStart,
  totalWords,
  setTotalWords,
  level,
  setLevel,
}) {
  const handleWordCountIncrement = () => {
    if (totalWords < 20) {
      setTotalWords((prev) => prev + 5);
    }
  };

  const handleWordCountDecrement = () => {
    if (totalWords > 5) {
      setTotalWords((prev) => prev - 5);
    }
  };

  const handleLevelIncrement = () => {
    if (level < 4) {
      setLevel((prev) => prev + 1);
    }
  };

  const handleLevelDecrement = () => {
    if (level > 1) {
      setLevel((prev) => prev - 1);
    }
  };

  const levelDescription = {
    1: "Reception (ages 4-5): Simple, short words",
    2: "Year 1 & 2 (ages 5-7): Easy words to build reading confidence",
    3: "Year 3 & 4 (ages 7-9): Words with moderate challenge",
    4: "Year 5 & 6 (ages 9-11): Trickiest words for advanced readers",
  };

  return (
    <div className="home-screen">
      <h2>Home</h2>
      <p style={{ marginBottom: "40px", fontStyle: "italic" }}>
        Adjust the settings then click Start to begin
      </p>

      <div className="slider-block">
        <label className="slider-label">
          Number of Words <span className="number-display">{totalWords}</span>
        </label>
        <div className="slider-row">
          <input
            type="range"
            min="5"
            max="20"
            step="5"
            value={totalWords}
            onChange={(e) => setTotalWords(Number(e.target.value))}
          />
          <div className="button-group">
            <button
              className="decrement-button"
              onClick={handleWordCountDecrement}
            >
              −
            </button>
            <button
              className="increment-button"
              onClick={handleWordCountIncrement}
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div className="slider-block" style={{ marginBottom: "10px" }}>
        <label className="slider-label">
          Level <span className="number-display">{level}</span>
        </label>
        <div className="slider-row">
          <input
            type="range"
            min="1"
            max="4"
            step="1"
            value={level}
            onChange={(e) => setLevel(Number(e.target.value))}
          />
          <div className="button-group">
            <button className="decrement-button" onClick={handleLevelDecrement}>
              −
            </button>
            <button className="increment-button" onClick={handleLevelIncrement}>
              +
            </button>
          </div>
        </div>
      </div>
      <div className="level-description">{levelDescription[level]}</div>

      <button
        onClick={onStart}
        className="start-button"
        style={{ marginTop: "60px" }}
      >
        Start
      </button>
    </div>
  );
}
