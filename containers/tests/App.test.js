import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import AppContainer from "../App";

jest.mock("../../components/Layout", () => ({
  __esModule: true,
  default: ({ children }) => {
    return <div>{children}</div>;
  },
}));

describe("containers/App", () => {
  it("deve renderizar a pagina dentro do Layout", () => {
    const MockComponent = ({ title }) => <p>Pokemon: {title}</p>;

    render(
      <AppContainer
        Component={MockComponent}
        pageProps={{ title: "pikachu" }}
      />,
    );

    expect(screen.getByText("Pokemon: pikachu")).toBeInTheDocument();
  });
});
