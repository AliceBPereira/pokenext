import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Pokemon from "../Pokemon";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props) => {
    return <img {...props} />;
  },
}));

describe("containers/Pokemon", () => {
  it("deve renderizar os dados do pokemon", () => {
    const { asFragment } = render(
      <Pokemon
        pokemon={{
          id: 25,
          name: "pikachu",
          types: [{ type: { name: "electric" } }],
          height: 4,
          weight: 60,
        }}
      />,
    );

    expect(
      screen.getByRole("heading", { name: "pikachu" }),
    ).toBeInTheDocument();
    expect(screen.getByText("#25")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
