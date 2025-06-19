import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

function WelcomeScreen({ children, onAddChild, onSelectChild, onRemoveChild }) {
  const [name, setName] = useState("");

  useEffect(() => {
    setName("");
  }, []);

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
    };

    onAddChild(newChild);
    setName("");
  };

  return (
    <div className="welcome-screen">
      <h2>Welcome to Tricky Words</h2>

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
    </div>
  );
}

export default WelcomeScreen;
