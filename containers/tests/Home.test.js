import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Home from "../Home";

jest.mock("../../components/Card", () => ({
  __esModule: true,
  default: ({ pokemon }) => <div>{pokemon.name}</div>,
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props) => {
    return <img {...props} />;
  },
}));

describe("containers/Home", () => {
  it("deve renderizar o titulo e os cards dos pokemons", () => {
    const { container } = render(
      <Home
        pokemons={[
          { id: 1, name: "bulbasaur" },
          { id: 4, name: "charmander" },
        ]}
      />,
    );

    expect(
      screen.getByRole("heading", { name: /Poke\s+Next/ }),
    ).toBeInTheDocument();
    expect(screen.getByAltText("PokeNext")).toHaveAttribute(
      "src",
      "/images/pokeball.png",
    );
    expect(screen.getByText("bulbasaur")).toBeInTheDocument();
    expect(screen.getByText("charmander")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
