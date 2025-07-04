import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./WelcomeScreen.css";

export default function WelcomeScreen({
  children,
  onAddChild,
  onSelectChild,
  onRemoveChild,
}) {
  const [name, setName] = useState("");

  useEffect(() => {
    setName("");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedName = name.trim();
    if (!trimmedName) return;

    const isValidName = /^[a-zA-Z\s'-]{1,20}$/.test(trimmedName);
    if (!isValidName) {
      alert(
        "That name’s a bit tricky! Please use letters, spaces, dashes, and apostrophes only. Up to 20 characters"
      );
      return;
    }

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
      <h3
        style={{
          fontStyle: "italic",
        }}
      >
        Let’s turn tricky words into easy ones with practice!
      </h3>

      {children.length > 0 && (
        <div>
          <h3>Who's Reading?</h3>
          <ul className="child-list">
            {children.map((child) => (
              <li key={child.id} className="child-item">
                <button
                  className="child-icon-button"
                  onClick={() => onSelectChild(child.id)}
                >
                  {child.name.charAt(0).toUpperCase()}
                </button>
                <div className="child-info">
                  <button
                    className="child-name-button"
                    onClick={() => onSelectChild(child.id)}
                  >
                    {child.name}
                  </button>
                  <button
                    className="remove-button"
                    onClick={() => {
                      if (
                        window.confirm(
                          `Are you sure you want to delete ${child.name}'s profile? Click OK to confirm.`
                        )
                      ) {
                        onRemoveChild(child.id);
                      }
                    }}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <h3>Add a New Reader</h3>
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
