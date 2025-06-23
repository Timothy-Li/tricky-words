import "./HomeScreen.css";

export default function HomeScreen({ onStart, childName }) {
  return (
    <div className="home-screen">
      <p>Hello {childName}, press Start when you are ready.</p>
      <div style={{ marginTop: "20px" }}>
        <button onClick={onStart} className="start-button">
          Start
        </button>
      </div>
    </div>
  );
}
