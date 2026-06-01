import Footer from "../Footer";
import { render } from "@testing-library/react";

describe("Footer", () => {
  it("deve renderizar corretamente", () => {
    const { container } = render(<Footer />);

    expect(container).toMatchSnapshot();
  });
});
