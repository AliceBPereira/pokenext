import { render, screen } from "@testing-library/react";

jest.mock("../containers/Home", () => ({
  __esModule: true,
  default: ({ pokemons }) => <div>Home container {pokemons.length}</div>,
}));

const { default: HomePage, getStaticProps } = require("../pages/index");

describe("pages/index", () => {
  it("renderiza a pagina", () => {
    render(<HomePage pokemons={[{ id: 1, name: "bulbasaur" }]} />);

    screen.getByText("Home container 1");
  });

  it("retorna os pokemons no getStaticProps", async () => {
    global.fetch = () =>
      Promise.resolve({
        json: async () => ({
          results: [{ name: "bulbasaur" }],
        }),
      });

    const result = await getStaticProps();

    expect(result).toEqual({
      props: {
        pokemons: [{ id: 1, name: "bulbasaur" }],
      },
    });
  });
});
