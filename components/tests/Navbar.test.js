import Navbar from "../Navbar";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";


describe("Navbar", () => {
  it("deve renderizar o titulo", () => {
    render(<Navbar />);
    expect(screen.getByRole("heading", { name: "PokeNext" })).toBeInTheDocument();
  });

  it("deve renderizar os links Home e Sobre", () => {
    const { container } = render(<Navbar />);
    expect(container).toMatchSnapshot();    
  });

  it("deve ter href correto nos links", () => {
    render(<Navbar />);
    const homeLink = screen.getByRole("link", { name: "Home" });
    const aboutLink = screen.getByRole("link", { name: "Sobre" });
    expect(homeLink).toHaveAttribute("href", "/");
    expect(aboutLink).toHaveAttribute("href", "/about");
  });

  it("deve renderizar o logo com alt correto", () => {
    render(<Navbar />);
    expect(screen.getByAltText("PokeNext")).toBeInTheDocument();
  });

});
