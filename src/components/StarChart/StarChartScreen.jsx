import { useState } from "react";
import StarDisplay from "./StarDisplay";
import "./StarChartScreen.css";

export default function StarChartScreen({ child, manualUpdateStars }) {
  const [showParentControls, setShowParentControls] = useState(false);

  return (
    <div className="star-chart-container">
      <div className="star-chart-header">
        <div className="star-tracker">
          <h2>{child.name}'s Star Chart</h2>
          <div style={{ fontStyle: "italic" }}>
            Stars Collected: {child.stars || 0}
          </div>
        </div>

        <div className="parent-controls-wrapper">
          <button
            onClick={() => setShowParentControls((show) => !show)}
            className="parent-controls-toggle"
          >
            {showParentControls
              ? "Hide Parental Controls"
              : "Show Parental Controls"}
          </button>

          {showParentControls && (
            <div className="parent-controls-panel">
              <button
                className="control-button"
                onClick={() => manualUpdateStars(child.id, 1)}
              >
                Add Star ➕
              </button>
              <button
                className="control-button"
                onClick={() => manualUpdateStars(child.id, -1)}
                disabled={child.stars === 0}
              >
                Remove Star ➖
              </button>
              <button
                className="control-button"
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
                Reset Stars
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="star-chart-content">
        <StarDisplay stars={child.stars} size="large" />
      </div>
    </div>
  );
}
