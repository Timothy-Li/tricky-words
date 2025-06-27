import { useState } from "react";
import InfoModal from "../Modals/InfoModal";
import "./Header.css";

export default function Header({
  activeChildName,
  onLogOut,
  onGoHome,
  showBackToHome,
  onStarChart,
  showStarChart,
  isViewingStarChart,
  isGameActive,
}) {
  const [infoOpen, setInfoOpen] = useState(false);
  const toggleInfo = () => setInfoOpen((open) => !open);

  return (
    <header className="app-header">
      <h1 className="main-title">
        {activeChildName ? `${activeChildName}'s` : "My"} Tricky Words
      </h1>

      <div className="header-buttons">
        <button className="guide-button" onClick={toggleInfo}>
          Guide
        </button>

        {activeChildName && (
          <>
            {!isViewingStarChart && !isGameActive && (
              <button className="star-chart-button" onClick={onStarChart}>
                Star Chart
              </button>
            )}

            {(showBackToHome || showStarChart) && onGoHome && (
              <button className="home-button" onClick={onGoHome}>
                Home
              </button>
            )}

            <button className="log-out-button" onClick={onLogOut}>
              Log Out
            </button>
          </>
        )}
      </div>

      <InfoModal isOpen={infoOpen} onClose={toggleInfo} title="How It Works">
        <h4>Start</h4>
        <ul>
          <li>Select or Add a child.</li>
          <li>Choose the number of words.</li>
          <li>Press Start to begin.</li>
        </ul>

        <h4>During</h4>
        <ul>
          <li>Child reads the word aloud.</li>
          <li>
            Parents click or press the arrow keys: use the Left Arrow (←) for
            Wrong, and the Right Arrow (→) for Right.
          </li>
        </ul>

        <h4>After</h4>
        <ul>
          <li>See the score and review tricky words.</li>
          <li>Try Again with the Same words or New ones.</li>
          <li>Earn stars for perfect rounds!</li>
        </ul>

        <h4>Star Chart & Controls</h4>
        <ul>
          <li>Track progress with stars.</li>
          <li>Parents can add, remove, or reset stars.</li>
        </ul>

        <h4>Tips</h4>
        <ul>
          <li>Practice often.</li>
          <li>Let your child read without help first.</li>
          <li>Celebrate their progress!</li>
        </ul>
      </InfoModal>
    </header>
  );
}
