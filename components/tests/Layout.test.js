import Layout from "../Layout";

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

jest.mock("../Navbar", () => {
  return function Navbar() {
    return <nav>Navbar Mock</nav>;
  };
});

jest.mock("../Footer", () => {
  return function Footer() {
    return <footer>Footer Mock</footer>;
  };
});

jest.mock("next/head", () => {
  return function Head({ children }) {
    return <>{children}</>;
  };
});

describe("Layout", () => {
  it("deve renderizar o Navbar e o Footer", () => {
    render(
      <Layout>
        <div>Teste</div>
      </Layout>,
    );
    expect(screen.getByText("Navbar Mock")).toBeInTheDocument();
    expect(screen.getByText("Footer Mock")).toBeInTheDocument();
    expect(screen.getByText("Teste")).toBeInTheDocument();
  });
});
