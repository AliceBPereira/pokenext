import '@testing-library/jest-dom';

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props) => {
    return <img {...props} />;
  },
}));

jest.mock("next/link", () => {
  const React = require("react");

  return function Link({ children, href }) {
    return React.cloneElement(children, { href });
  };
});