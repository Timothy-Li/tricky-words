import React, { useState } from "react";

export default function HomeScreen({ onStart }) {
  const [showInstructions, setShowInstructions] = useState(false);

  return (
    <div className="home-screen">
      <p>
        Welcome! This app helps your child practise reading tricky English
        words.
      </p>
      <button onClick={() => setShowInstructions(!showInstructions)}>
        {showInstructions ? "Hide Instructions" : "Show Instructions"}
      </button>
      {showInstructions && (
        <>
          <p>
            You will listen to your child read each word aloud and then click
            "Right" if they read it correctly, or "Wrong" if not.
          </p>
          <p>
            Each round has 10 words. Try to encourage your child to read each
            word carefully. At the end, you will see how well they've done.
          </p>
        </>
      )}
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
