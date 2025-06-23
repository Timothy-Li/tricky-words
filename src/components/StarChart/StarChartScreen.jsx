import StarDisplay from "./StarDisplay";
import { useState } from "react";

export default function StarChartScreen({ child, manualUpdateStars }) {
  const [showParentControls, setShowParentControls] = useState(false);
  return (
    <>
      <h2>{child.name}'s Star Chart</h2>
      <StarDisplay stars={child.stars} />

      <button
        onClick={() => setShowParentControls((show) => !show)}
        style={{ padding: "4px", marginTop: "5px" }}
      >
        {showParentControls
          ? "Hide Parent Controls ▲"
          : "Show Parent Controls ▼"}
      </button>

      {showParentControls && (
        <div
          style={{
            padding: "1rem",
            borderRadius: "8px",
          }}
        >
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
            disabled={child.stars === 0}
          >
            {" "}
            Reset Stars
          </button>
        </div>
      )}
    </>
  );
}
