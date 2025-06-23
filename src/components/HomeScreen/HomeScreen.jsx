export default function HomeScreen({ onStart, childName }) {
  return (
    <div className="home-screen">
      <p>Hello {childName}, press Start when you are ready.</p>
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
