import { render } from "@testing-library/react";

const mockAppContainer = jest.fn(() => <section>App container</section>);

jest.mock("../containers/App", () => ({
  __esModule: true,
  default: (props) => {
    mockAppContainer(props);

    return <section>App container</section>;
  },
}));

const MyApp = require("../pages/_app").default;

describe("pages/_app", () => {
  beforeEach(() => {
    mockAppContainer.mockClear();
  });

  it("apenas encaminha a pagina e as props para o container", () => {
    function MockPage() {
      return <p>Conteudo</p>;
    }

    const pageProps = { title: "PokeNext" };

    render(<MyApp Component={MockPage} pageProps={pageProps} />);

    expect(mockAppContainer).toHaveBeenCalledWith({
      Component: MockPage,
      pageProps,
    });
  });
});
