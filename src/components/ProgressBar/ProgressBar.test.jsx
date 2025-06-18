import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ProgressBar from "./ProgressBar";

describe("ProgressBar", () => {
  it("displays current word count and the total", () => {
    // Arrange
    render(<ProgressBar current={8} total={10} score={5} />);

    // Act
    const progressBar = screen.getByText(/Word 8 out of 10/i);

    // Assert
    expect(progressBar).toBeInTheDocument();
  });
  it("displays current score", () => {
    // Arrange
    render(<ProgressBar current={8} total={10} score={5} />);

    // Act
    const progressBar = screen.getByText(/Score: 5/i);

    // Assert
    expect(progressBar).toBeInTheDocument();
  });
});
