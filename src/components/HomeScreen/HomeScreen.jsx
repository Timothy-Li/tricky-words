import "./HomeScreen.css";

export default function HomeScreen({
  onStart,
  childName,
  totalWords,
  setTotalWords,
}) {
  return (
    <div className="home-screen">
      <p>Hello {childName}, press Start when you are ready.</p>
      <label>
        Number of Words: {totalWords}
        <input
          type="range"
          min="5"
          max="30"
          step="5"
          value={totalWords}
          onChange={(e) => setTotalWords(Number(e.target.value))}
        ></input>
      </label>
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
