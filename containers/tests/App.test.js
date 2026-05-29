import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import App from "../App";

jest.mock("../../components/Layout", () => ({
  __esModule: true,
  default: ({ children }) => <main>{children}</main>,
}));

describe("containers/App", () => {
  it("deve renderizar a pagina dentro do Layout", () => {
    function MockPage() {
      return <p>Conteudo</p>;
    }

    const { container } = render(<App Component={MockPage} pageProps={{}} />);

    expect(screen.getByText("Conteudo")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
