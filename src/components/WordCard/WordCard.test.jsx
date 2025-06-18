import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import WordCard from "./WordCard";

describe("WordCard", () => {
  it("renders the word", () => {
    // Arrange
    render(<WordCard word="because" onAnswer={() => {}} />);

    // Act
    const word = screen.getByRole("heading", { level: 2 });

    // Assert
    expect(word).toBeInTheDocument();
    expect(word).toHaveTextContent("because");
  });

  it("calls onAnswer(true) when Right is clicked", () => {
    // Arrange
    const handleAnswer = vi.fn();
    render(<WordCard word="because" onAnswer={handleAnswer} />);
    const rightButton = screen.getByRole("button", { name: /right/i });

    // Act
    fireEvent.click(rightButton);

    // Assert
    expect(handleAnswer).toHaveBeenCalledWith(true);
  });

  it("calls onAnswer(false) when Wrong is clicked", () => {
    // Arrange
    const handleAnswer = vi.fn();
    render(<WordCard word="because" onAnswer={handleAnswer} />);
    const wrongButton = screen.getByRole("button", { name: /wrong/i });

    // Act
    fireEvent.click(wrongButton);

    // Assert
    expect(handleAnswer).toHaveBeenCalledWith(false);
  });
});
