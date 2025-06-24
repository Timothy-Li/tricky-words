import "./ProgressBar.css";

// export default function ProgressBar({ current, total, score }) {
//   return (
//     <div className="progress-wrapper">
//       <div className="current-progress">
//         Word {current} out of {total}
//       </div>
//       <div classname="total-score">Score: {score}</div>
//     </div>
//   );
// }

export default function ProgressBar({ current, total, score }) {
  return (
    <div className="progress-bar">
      <div className="progress-info">
        <span className="progress-text">
          Word {current} / {total}
        </span>
        <span className="score-text">⭐ Score: {score}</span>
      </div>
    </div>
  );
}
