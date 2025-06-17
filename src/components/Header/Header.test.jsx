import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Header from "./Header";

describe("Header", () => {
  it("renders the title", () => {
    // Arrange

    // Act
    render(<Header />);

    // Assert
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("My Tricky Words");
  });
});
