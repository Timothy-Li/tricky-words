import "./StarDisplay.css";

export default function StarDisplay({ stars }) {
  const totalStars = 100;
  const starsPerRow = 10;

  const rows = [];

  for (let i = 0; i < totalStars; i += starsPerRow) {
    const rowStars = [];
    const rowEnd = i + starsPerRow;
    const isRowFull = stars >= rowEnd;

    for (let j = 0; j < starsPerRow; j++) {
      const starIndex = i + j;
      const isFilled = starIndex < stars;

      rowStars.push(
        <span
          key={starIndex}
          className={`star ${isFilled ? "filled" : "empty"}`}
        >
          ★
        </span>
      );
    }

    rows.push(
      <div key={i} className="star-row">
        {rowStars}
        <span className={`row-label ${isRowFull ? "full" : ""}`}>{rowEnd}</span>
      </div>
    );
  }

  return <div className="star-display">{rows}</div>;
}
