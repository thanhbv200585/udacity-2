import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import { store } from "../store";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import NewQuestion from "./NewQuestion";

describe("NewQuestion", () => {
  it("is expected to button is disabled if just one text area has an input.", () => {
    render(
      <Provider store={store}>
        <Router>
          <NewQuestion />
        </Router>
      </Provider>
    );

    expect(
      screen.getByPlaceholderText("Enter option one ...")
    ).toBeInTheDocument();

    const optionOne = screen.getByPlaceholderText("Enter option one ...");
    const submitButton = screen.getByRole("button", { name: "Submit" });

    fireEvent.change(optionOne, { target: { value: "Option one text" } });
    expect(submitButton).toBeDisabled();
  });

  it("is expected to button is enabled if both text areas have input.", () => {
    render(
      <Provider store={store}>
        <Router>
          <NewQuestion />
        </Router>
      </Provider>
    );

    expect(
      screen.getByPlaceholderText("Enter option one ...")
    ).toBeInTheDocument();

    const optionOne = screen.getByPlaceholderText("Enter option one ...");
    const optionTwo = screen.getByPlaceholderText("Enter option two ...");
    const submitButton = screen.getByRole("button", { name: "Submit" });

    fireEvent.change(optionOne, { target: { value: "Option one text" } });
    fireEvent.change(optionTwo, { target: { value: "Option two text" } });
    expect(submitButton).toBeEnabled();
  });
});
