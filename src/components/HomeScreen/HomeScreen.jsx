// import "./HomeScreen.css";

// export default function HomeScreen({
//   onStart,
//   totalWords,
//   setTotalWords,
//   level,
//   setLevel,
// }) {
//   const handleWordCountIncrement = () => {
//     if (totalWords < 30) {
//       setTotalWords((prev) => prev + 5);
//     }
//   };

//   const handleWordCountDecrement = () => {
//     if (totalWords > 5) {
//       setTotalWords((prev) => prev - 5);
//     }
//   };

//   const handleLevelIncrement = () => {
//     if (level < 4) {
//       setLevel((prev) => prev + 1);
//     }
//   };

//   const handleLevelDecrement = () => {
//     if (level > 1) {
//       setLevel((prev) => prev - 1);
//     }
//   };

//   return (
//     <div className="home-screen">
//       <h2>Home</h2>
//       <p style={{ marginBottom: "40px" }}>
//         Adjust the settings and click Start
//       </p>
//       <div>
//         <label>
//           Number of Words <span className="number-display">{totalWords}</span>
//           <input
//             type="range"
//             min="5"
//             max="30"
//             step="5"
//             value={totalWords}
//             onChange={(e) => setTotalWords(Number(e.target.value))}
//           ></input>
//           <button
//             className="decrement-button"
//             onClick={handleWordCountDecrement}
//           >
//             −
//           </button>
//           <button
//             className="increment-button"
//             onClick={handleWordCountIncrement}
//           >
//             +
//           </button>
//         </label>
//       </div>
//       <div className="slider-block">
//         <label>
//           Level <span className="number-display">{level}</span>
//           <input
//             type="range"
//             min="1"
//             max="4"
//             step="1"
//             value={level}
//             onChange={(e) => setLevel(Number(e.target.value))}
//           />
//           <button className="decrement-button" onClick={handleLevelDecrement}>
//             −
//           </button>
//           <button className="increment-button" onClick={handleLevelIncrement}>
//             +
//           </button>
//         </label>
//       </div>
//       <button
//         onClick={onStart}
//         className="start-button"
//         style={{ marginTop: "40px" }}
//       >
//         Start
//       </button>
//     </div>
//   );
// }

import "./HomeScreen.css";

export default function HomeScreen({
  onStart,
  totalWords,
  setTotalWords,
  level,
  setLevel,
}) {
  const handleWordCountIncrement = () => {
    if (totalWords < 30) {
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

  return (
    <div className="home-screen">
      <h2>Home</h2>
      <p style={{ marginBottom: "40px" }}>
        Adjust the settings and click Start
      </p>

      <div className="slider-block">
        <label className="slider-label">
          Number of Words <span className="number-display">{totalWords}</span>
        </label>
        <div className="slider-row">
          <input
            type="range"
            min="5"
            max="30"
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

      <div className="slider-block">
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
