import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import SummaryScreen from "./SummaryScreen";

describe("SummaryScreen", () => {
  const mockAnswers = [
    { word: "said", correct: true },
    { word: "what", correct: false },
  ];

  it("displays the score summary", () => {
    // Arrange
    render(
      <SummaryScreen
        score={1}
        total={2}
        answers={mockAnswers}
        restartSame={() => {}}
        restartNew={() => {}}
      />
    );

    // Act
    const summary = screen.getByText(/you scored 1 out of 2/i);

    // Assert
    expect(summary).toBeInTheDocument();
  });

  it("renders correct and incorrect icons", () => {
    // Arrange
    render(
      <SummaryScreen
        score={1}
        total={2}
        answers={mockAnswers}
        restartSame={() => {}}
        restartNew={() => {}}
      />
    );

    // Assert
    expect(screen.getByText("said")).toBeInTheDocument();
    expect(screen.getByText("✔️")).toBeInTheDocument();
    expect(screen.getByText("what")).toBeInTheDocument();
    expect(screen.getByText("❌")).toBeInTheDocument();
  });

  it("calls restartSame when 'Try Again' is clicked", () => {
    // Arrange
    const restartSame = vi.fn();
    render(
      <SummaryScreen
        score={1}
        total={2}
        answers={mockAnswers}
        restartSame={restartSame}
        restartNew={() => {}}
      />
    );

    // Act
    fireEvent.click(screen.getByRole("button", { name: /try again/i }));

    // Assert
    expect(restartSame).toHaveBeenCalledTimes(1);
  });

  it("calls restartNew when 'New Round' is clicked", () => {
    // Arrange
    const restartNew = vi.fn();
    render(
      <SummaryScreen
        score={1}
        total={2}
        answers={mockAnswers}
        restartSame={() => {}}
        restartNew={restartNew}
      />
    );

    // Act
    fireEvent.click(screen.getByRole("button", { name: /new round/i }));

    // Assert
    expect(restartNew).toHaveBeenCalledTimes(1);
  });
});
