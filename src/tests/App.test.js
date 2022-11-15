import { render, screen } from "@testing-library/react";
import App from "../App";

test("renders result", () => {
  render(<App />);
  const result = screen.queryByText(/Results/i);
  expect(result).toBeInTheDocument();
});
