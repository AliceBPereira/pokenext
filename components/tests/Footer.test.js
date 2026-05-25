import Footer from "../Footer";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Footer", () => {
  it("deve renderizar o footer com o texto correto", () => {
    render(<Footer />);
    const footerElement = screen.getByText(/PokeNext/i);
    expect(footerElement).toBeInTheDocument();
  });
});
