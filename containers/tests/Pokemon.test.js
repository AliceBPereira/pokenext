import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import PokemonContainer, { getStaticPaths, getStaticProps } from "../Pokemon";

const mockUseRouter = jest.fn();

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props) => {
    return <img {...props} />;
  },
}));

jest.mock("next/router", () => ({
  useRouter: () => mockUseRouter(),
}));

describe("containers/Pokemon", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
    mockUseRouter.mockReset();
    jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("deve montar os paths estaticos com ids em string", async () => {
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        results: [{ name: "bulbasaur" }, { name: "ivysaur" }],
      }),
    });

    const result = await getStaticPaths();

    expect(global.fetch).toHaveBeenCalledWith(
      "https://pokeapi.co/api/v2/pokemon//?limit=251",
    );
    expect(result).toEqual({
      paths: [{ params: { pokemonId: "1" } }, { params: { pokemonId: "2" } }],
      fallback: false,
    });
  });

  it("deve buscar um pokemon por id no getStaticProps", async () => {
    const pokemon = { id: 25, name: "pikachu" };

    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(pokemon),
    });

    const result = await getStaticProps({
      params: { pokemonId: "25" },
    });

    expect(global.fetch).toHaveBeenCalledWith(
      "https://pokeapi.co/api/v2/pokemon/25",
    );
    expect(result).toEqual({
      props: { pokemon },
    });
  });

  it("deve renderizar estado de fallback", () => {
    mockUseRouter.mockReturnValue({ isFallback: true });

    render(<PokemonContainer pokemon={{}} />);

    expect(screen.getByText("Carregando...")).toBeInTheDocument();
  });

  it("deve renderizar os detalhes do pokemon", () => {
    mockUseRouter.mockReturnValue({ isFallback: false });

    render(
      <PokemonContainer
        pokemon={{
          id: 25,
          name: "pikachu",
          height: 4,
          weight: 60,
          types: [{ type: { name: "electric" } }, { type: { name: "cute" } }],
        }}
      />,
    );

    expect(
      screen.getByRole("heading", { name: "pikachu" }),
    ).toBeInTheDocument();
    expect(screen.getByText("#25")).toBeInTheDocument();
    expect(screen.getByText("electric")).toBeInTheDocument();
    expect(screen.getByText("cute")).toBeInTheDocument();
    expect(screen.getByText("40 cm")).toBeInTheDocument();
    expect(screen.getByText("6 kg")).toBeInTheDocument();
    expect(screen.getByAltText("pikachu")).toHaveAttribute(
      "src",
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
    );
  });
});
