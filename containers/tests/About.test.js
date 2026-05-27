import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import About from "../About";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props) => {
    return <img {...props} />;
  },
}));

describe("containers/About", () => {
  it("deve renderizar o conteudo estatico da pagina", () => {
    const { asFragment } = render(<About />);

    expect(
      screen.getByRole("heading", { name: "Sobre o projeto" }),
    ).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
