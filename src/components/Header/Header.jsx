export default function Header({
  activeChildName,
  onSwitchUser,
  onGoHome,
  showBackToHome,
  onShowInfo,
}) {
  return (
    <header className="app-header">
      <h1>Tricky Words</h1>

      {activeChildName && (
        <div className="user-info">
          <span>👤 {activeChildName}</span>

          {showBackToHome && onGoHome && (
            <button onClick={onGoHome}>Home</button>
          )}

          <button onClick={onSwitchUser}>Log Out</button>
        </div>
      )}
    </header>
  );
}
