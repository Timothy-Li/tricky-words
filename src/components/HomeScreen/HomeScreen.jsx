import React, { useState } from "react";

export default function HomeScreen({ onStart, childName }) {
  const [showInstructions, setShowInstructions] = useState(false);

  return (
    <div className="home-screen">
      <p>Hi {childName}, press Start when you are ready!</p>
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={onStart}
          style={{
            backgroundColor: "green",
            color: "white",
          }}
        >
          Start
        </button>
      </div>
    </div>
  );
}
