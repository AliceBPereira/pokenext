import Card from "../Card";

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Card", () => {
  const pokemon = {
    id: 25,
    name: "pikachu",
  };

  it("deve renderizar as informacoes do pokemon", () => {
    render(<Card pokemon={pokemon} />);

    expect(screen.getByText("#25")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "pikachu" }),
    ).toBeInTheDocument();
  });

  it("deve ter o link de detalhes com href correto", () => {
    render(<Card pokemon={pokemon} />);

    expect(screen.getByRole("link", { name: "Detalhes" })).toHaveAttribute(
      "href",
      "/pokemon/25",
    );
  });
});
