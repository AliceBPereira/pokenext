import { render } from "@testing-library/react";

const mockAboutContainer = jest.fn(() => <div>About container</div>);

jest.mock("../containers/About", () => ({
  __esModule: true,
  default: () => {
    mockAboutContainer();

    return <div>About container</div>;
  },
}));

const AboutPage = require("../pages/about").default;

describe("pages/about", () => {
  beforeEach(() => {
    mockAboutContainer.mockClear();
  });

  it("deve apenas delegar a renderizacao para o container", () => {
    render(<AboutPage />);

    expect(mockAboutContainer).toHaveBeenCalledTimes(1);
  });
});
