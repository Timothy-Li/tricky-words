import "./ProgressBar.css";

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
