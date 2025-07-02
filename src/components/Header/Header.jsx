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

      <InfoModal isOpen={infoOpen} onClose={toggleInfo} title="Guide">
        <div className="info-modal-content">
          <section>
            <h4>Welcome</h4>
            <ul>
              <li>Select a Reader or Add a New Reader</li>
            </ul>
          </section>

          <section>
            <h4>Home</h4>
            <ul>
              <li>Choose desired number of words (5-30)</li>
              <li>Select a level (1-4)</li>
              <li>Press Start to begin</li>
            </ul>
          </section>

          <section>
            <h4>During</h4>
            <ul>
              <li>Child reads the word aloud</li>
              <li>
                Observer clicks or presses the arrow keys: (←) for Wrong, (→)
                for Right
              </li>
            </ul>
          </section>

          <section>
            <h4>Summary</h4>
            <ul>
              <li>See the score for the round and review tricky words</li>
              <li>Try Again with the Same words or New ones</li>
              <li>Earn stars for perfect rounds!</li>
            </ul>
          </section>

          <section>
            <h4>Star Chart & Controls</h4>
            <ul>
              <li>Track progress with stars</li>
              <li>Parents can add, remove, or reset stars</li>
            </ul>
          </section>
        </div>
      </InfoModal>
    </header>
  );
}
