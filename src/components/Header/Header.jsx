export default function Header({
  activeChildName,
  onLogOut,
  onGoHome,
  showBackToHome,
  onStarChart,
  showStarChart,
  isViewingStarChart,
}) {
  return (
    <header className="app-header">
      <h1>Tricky Words</h1>

      {activeChildName && (
        <div className="user-info">
          <span>👤 {activeChildName}</span>

          {(showBackToHome || showStarChart) && onGoHome && (
            <button onClick={onGoHome}>Home</button>
          )}

          {!isViewingStarChart && (
            <button onClick={onStarChart}>Star Chart</button>
          )}

          <button onClick={onLogOut}>Log Out</button>
        </div>
      )}
    </header>
  );
}
