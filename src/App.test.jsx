import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import add from "./StringCalculator";

jest.mock("./StringCalculator");

describe("App Component String Calculator Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mock calls between tests
  });

  test("should return 0 for an empty string input", () => {
    add.mockImplementation(() => 0);

    render(<App />);

    const inputElement = screen.getByPlaceholderText(/e.g., 1,2 or \/\/;/i);
    const buttonElement = screen.getByText(/Calculate/i);

    fireEvent.change(inputElement, { target: { value: "" } });
    fireEvent.click(buttonElement);

    const resultElement = screen.getByText(/Result: 0/i);
    expect(resultElement).toBeInTheDocument();
  });

  test("should return the number itself when one number is provided", () => {
    add.mockImplementation(() => 1);

    render(<App />);

    const inputElement = screen.getByPlaceholderText(/e.g., 1,2 or \/\/;/i);
    const buttonElement = screen.getByText(/Calculate/i);

    fireEvent.change(inputElement, { target: { value: "1" } });
    fireEvent.click(buttonElement);

    const resultElement = screen.getByText(/Result: 1/i);
    expect(resultElement).toBeInTheDocument();
  });

  test("should return the sum of two numbers", () => {
    add.mockImplementation(() => 6);

    render(<App />);

    const inputElement = screen.getByPlaceholderText(/e.g., 1,2 or \/\/;/i);
    const buttonElement = screen.getByText(/Calculate/i);

    fireEvent.change(inputElement, { target: { value: "1,5" } });
    fireEvent.click(buttonElement);

    const resultElement = screen.getByText(/Result: 6/i);
    expect(resultElement).toBeInTheDocument();
  });

  test("should handle new lines between numbers", () => {
    add.mockImplementation(() => 6);

    render(<App />);

    const inputElement = screen.getByPlaceholderText(/e.g., 1,2 or \/\/;/i);
    const buttonElement = screen.getByText(/Calculate/i);

    fireEvent.change(inputElement, { target: { value: "1\n2,3" } });
    fireEvent.click(buttonElement);

    const resultElement = screen.getByText(/Result: 6/i);
    expect(resultElement).toBeInTheDocument();
  });

  test("should support custom delimiters", () => {
    add.mockImplementation(() => 3);

    render(<App />);

    const inputElement = screen.getByPlaceholderText(/e.g., 1,2 or \/\/;/i);
    const buttonElement = screen.getByText(/Calculate/i);

    fireEvent.change(inputElement, { target: { value: "//;\n1;2" } });
    fireEvent.click(buttonElement);

    const resultElement = screen.getByText(/Result: 3/i);
    expect(resultElement).toBeInTheDocument();
  });

  test("should throw an error when negative numbers are passed", () => {
    add.mockImplementation(() => {
      throw new Error("Negative numbers not allowed: -2");
    });

    render(<App />);

    const inputElement = screen.getByPlaceholderText(/e.g., 1,2 or \/\/;/i);
    const buttonElement = screen.getByText(/Calculate/i);

    fireEvent.change(inputElement, { target: { value: "1,-2,3" } });
    fireEvent.click(buttonElement);

    const errorElement = screen.getByText(/Negative numbers not allowed: -2/i);
    expect(errorElement).toBeInTheDocument();
  });
});
