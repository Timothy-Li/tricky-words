import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import InfoModal from "../Modals/Modal";

export default function WelcomeScreen({
  children,
  onAddChild,
  onSelectChild,
  onRemoveChild,
}) {
  const [name, setName] = useState("");
  const [infoOpen, setInfoOpen] = useState(false);

  useEffect(() => {
    setName("");
  }, []);

  const toggleInfo = () => setInfoOpen((open) => !open);

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedName = name.trim();
    if (!trimmedName) return;

    const nameExists = children.some(
      (child) => child.name.toLowerCase() === trimmedName.toLowerCase()
    );

    if (nameExists) {
      alert(
        `The name "${trimmedName}" already exists. Please enter a different name, or include a surname.`
      );
      return;
    }

    const newChild = {
      id: uuidv4(),
      name: trimmedName,
      stars: 0,
    };

    onAddChild(newChild);
    setName("");
  };

  return (
    <div className="welcome-screen">
      <h2>Welcome to Tricky Words</h2>
      <button onClick={toggleInfo}>How It Works</button>
      {children.length > 0 && (
        <div>
          <h3>Who is Reading Today?</h3>
          <ul
            style={{
              listStyleType: "none",
              paddingLeft: 10,
            }}
          >
            {children.map((child) => (
              <li key={child.id} style={{ marginBottom: "8px" }}>
                <button onClick={() => onSelectChild(child.id)}>
                  {child.name}
                </button>{" "}
                <button
                  onClick={() => {
                    if (
                      window.confirm(
                        `Are you sure you want to remove ${child.name}'s profile?`
                      )
                    ) {
                      onRemoveChild(child.id);
                    }
                  }}
                  style={{
                    marginLeft: "10px",
                    color: "grey",
                  }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <h3>Add a New Reader:</h3>
      <form onSubmit={handleSubmit}>
        <label>
          What's your name?
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <button type="submit">Enter</button>
      </form>
      <InfoModal isOpen={infoOpen} onClose={toggleInfo} title="Information">
        <p>
          Welcome to <strong>Tricky Words</strong>, a fun and simple way to help
          children practice reading!
        </p>

        <h4>Getting Started</h4>
        <ul>
          <li>
            <strong>Choose a Reader:</strong> Select an existing child from the
            list or add a new one by typing their name.
          </li>
          <li>
            <strong>Begin a Round:</strong> Tap <em>Start</em> to begin a round
            of reading practice. A set of words will be shown one at a time.
          </li>
        </ul>

        <h4>During the Round</h4>
        <ul>
          <li>
            A <strong>word</strong> appears on the screen.
          </li>
          <li>
            Ask the child to <strong>read it out loud</strong>.
          </li>
          <li>
            Based on their response:
            <ul>
              <li>
                Click <strong>Right ✅</strong> if they read it correctly.
              </li>
              <li>
                Click <strong>Wrong ❌</strong> if they read it incorrectly.
              </li>
            </ul>
          </li>
        </ul>

        <h4>After the Round</h4>
        <ul>
          <li>
            You’ll see a <strong>summary screen</strong> showing:
            <ul>
              <li>The number of words read correctly.</li>
              <li>Which words were tricky for your child.</li>
            </ul>
          </li>
          <li>
            Choose to:
            <ul>
              <li>
                <strong>Try the same words again</strong> to reinforce learning.
              </li>
              <li>
                <strong>Start a new round</strong> with a new set of words.
              </li>
            </ul>
          </li>
        </ul>

        <h4>Tips</h4>
        <ul>
          <li>Practice regularly to build confidence.</li>
          <li>
            Allow the reader to read without any help—there will be opportunity
            to review tricky words at the end.
          </li>
          <li>
            Enjoy watching their confidence grow, and celebrate the stars they
            collect! ⭐
          </li>
        </ul>
      </InfoModal>
    </div>
  );
}
