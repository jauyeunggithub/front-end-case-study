import { render, screen } from "@testing-library/react";
import App from "../App";

test("renders no result found when there are no results", () => {
  render(<App />);
  const noResults = screen.queryByText(/No Results Found/i);
  expect(noResults).toBeInTheDocument();
});
