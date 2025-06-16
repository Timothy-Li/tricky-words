export default function SummaryScreen({
  score,
  total,
  answers,
  restartSame,
  restartNew,
}) {
  return (
    <div>
      <h2>Summary</h2>
      <div>
        You scored {score} out of {total}!
      </div>
      <ul
        style={{
          listStyleType: "none",
          paddingLeft: 10,
          maxWidth: 100,
        }}
      >
        {answers.map((answer, index) => (
          <li
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
              fontWeight: answer.correct ? "normal" : "bold",
            }}
          >
            <span>{answer.word}</span>
            <span>{answer.correct ? "✔️" : "❌"}</span>
          </li>
        ))}
      </ul>
      <button onClick={restartSame}>Try Again</button>
      <button onClick={restartNew}>New Round</button>
    </div>
  );
}
