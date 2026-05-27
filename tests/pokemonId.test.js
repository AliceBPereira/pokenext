import { render, screen } from "@testing-library/react";

jest.mock("../containers/Pokemon", () => ({
  __esModule: true,
  default: ({ pokemon }) => <div>Pokemon container {pokemon.name}</div>,
}));

const {
  default: PokemonPage,
  getStaticPaths,
  getStaticProps,
} = require("../pages/pokemon/[pokemonId]");

describe("pages/pokemon", () => {
  it("renderiza a pagina", () => {
    render(<PokemonPage pokemon={{ id: 25, name: "pikachu" }} />);

    screen.getByText("Pokemon container pikachu");
  });

  it("gera os paths estaticos", async () => {
    global.fetch = () =>
      Promise.resolve({
        json: async () => ({
          results: [{ name: "bulbasaur" }],
        }),
      });

    const result = await getStaticPaths();

    expect(result).toEqual({
      paths: [{ params: { pokemonId: "1" } }],
      fallback: false,
    });
  });

  it("busca os dados do pokemon", async () => {
    const pokemon = { id: 1, name: "bulbasaur" };

    global.fetch = () =>
      Promise.resolve({
        json: async () => pokemon,
      });

    const result = await getStaticProps({
      params: { pokemonId: "1" },
    });

    expect(result).toEqual({
      props: { pokemon },
    });
  });
});
