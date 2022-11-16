import { fireEvent, render, screen } from "@testing-library/react";
import SearchForm from "./components/SearchForm";

test("call onSearch when input values are valid", () => {
  const onSearch = jest.fn();
  render(<SearchForm onSearch={onSearch} />);
  const keywordInput = screen.queryByPlaceholderText(/Keyword/i);
  fireEvent.change(keywordInput, { target: { value: "abc" } });

  const button = screen.getByText(/Search/i);
  expect(button).toBeInTheDocument();
  button.click();
  expect(onSearch).toHaveBeenCalled();
});
