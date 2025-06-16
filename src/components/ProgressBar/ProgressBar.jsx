export default function ProgressBar({ current, total, score }) {
  return (
    <div>
      <div>
        Word {current} out of {total}
      </div>
      <div>Score: {score}</div>
    </div>
  );
}
