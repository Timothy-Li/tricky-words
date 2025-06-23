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
          style={{
            color: isFilled ? "gold" : "lightgray",
            fontSize: "24px",
            marginRight: "4px",
          }}
        >
          ★
        </span>
      );
    }

    rows.push(
      <div
        key={i}
        style={{ display: "flex", alignItems: "center", marginBottom: "4px" }}
      >
        {rowStars}
        <span
          style={{
            marginLeft: "8px",
            fontSize: "14px",
            color: isRowFull ? "gold" : "gray",
            fontWeight: isRowFull ? "bold" : "normal",
          }}
        >
          {rowEnd}
        </span>
      </div>
    );
  }

  return <div>{rows}</div>;
}
