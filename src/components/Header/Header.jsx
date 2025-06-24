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
  return (
    <header className="app-header">
      <h1>{activeChildName ? `${activeChildName}'s` : "My"} Tricky Words</h1>

      {activeChildName && (
        <div className="header-buttons">
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
        </div>
      )}
    </header>
  );
}
