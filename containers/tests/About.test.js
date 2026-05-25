import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import AboutContainer from "../About";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props) => {
    return <img {...props} />;
  },
}));

describe("containers/About", () => {
  it("deve renderizar o conteudo da pagina sobre", () => {
    render(<AboutContainer />);

    expect(
      screen.getByRole("heading", { name: "Sobre o projeto" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "PokeNext é um App construído em Next.js para consultar Pokémons.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByAltText("Charizard")).toHaveAttribute(
      "src",
      "/images/charizard.png",
    );
  });
});
