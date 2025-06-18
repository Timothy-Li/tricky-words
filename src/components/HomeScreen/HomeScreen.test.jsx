import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import HomeScreen from "./HomeScreen";

describe("HomeScreen", () => {
  it("renders a start button", () => {
    // Arrange
    render(<HomeScreen onStart={() => {}} />);

    // Act
    const button = screen.getByRole("button", { name: /start/i });

    // Assert
    expect(button).toBeInTheDocument();
  });

  it("calls onStart when start button is clicked", () => {
    // Arrange
    const handleStart = vi.fn();
    render(<HomeScreen onStart={handleStart} />);
    const button = screen.getByRole("button", { name: /start/i });

    // Act
    fireEvent.click(button);

    // Assert
    expect(handleStart).toHaveBeenCalledTimes(1);
  });
});
