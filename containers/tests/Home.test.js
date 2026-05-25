import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import HomeContainer, { getStaticProps } from "../Home";

const mockCard = jest.fn(({ pokemon }) => {
  return <div data-testid="pokemon-card">{pokemon.name}</div>;
});

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props) => {
    return <img {...props} />;
  },
}));

jest.mock("../../components/Card", () => ({
  __esModule: true,
  default: (props) => mockCard(props),
}));

describe("containers/Home", () => {
  beforeEach(() => {
    mockCard.mockClear();
    global.fetch = jest.fn();
  });

  it("deve buscar os pokemons e adicionar ids no getStaticProps", async () => {
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        results: [{ name: "bulbasaur" }, { name: "ivysaur" }],
      }),
    });

    const result = await getStaticProps();

    expect(global.fetch).toHaveBeenCalledWith(
      "https://pokeapi.co/api/v2/pokemon/?limit=50",
    );
    expect(result).toEqual({
      props: {
        pokemons: [
          { id: 1, name: "bulbasaur" },
          { id: 2, name: "ivysaur" },
        ],
      },
    });
  });

  it("deve renderizar o titulo, imagem e cards", () => {
    const pokemons = [
      { id: 1, name: "bulbasaur" },
      { id: 4, name: "charmander" },
    ];

    render(<HomeContainer pokemons={pokemons} />);

    expect(
      screen.getByRole("heading", { name: /poke next/i }),
    ).toBeInTheDocument();
    expect(screen.getByAltText("PokeNext")).toHaveAttribute(
      "src",
      "/images/pokeball.png",
    );
    expect(screen.getAllByTestId("pokemon-card")).toHaveLength(2);
    expect(mockCard.mock.calls.map(([props]) => props.pokemon)).toEqual(
      pokemons,
    );
  });
});
