import StarDisplay from "./StarDisplay";

export default function StarChartScreen({ child, manualUpdateStars }) {
  return (
    <>
      <h2>{child.name}'s Star Chart</h2>
      <StarDisplay stars={child.stars} />
      <button onClick={() => manualUpdateStars(child.id, 1)}>
        ➕ Add Star
      </button>
      <button
        onClick={() => manualUpdateStars(child.id, -1)}
        disabled={child.stars === 0}
      >
        ➖ Remove Star
      </button>
      <button
        onClick={() => {
          const confirmReset = window.confirm(
            `Are you sure you want to reset all stars for ${child.name}?`
          );
          if (confirmReset) {
            manualUpdateStars(child.id, -child.stars);
          }
        }}
      >
        {" "}
        Reset Stars
      </button>
    </>
  );
}
