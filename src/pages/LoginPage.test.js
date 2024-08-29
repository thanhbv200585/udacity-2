import { render, fireEvent, screen } from "@testing-library/react";
import LoginPage from "./LoginPage";
import "@testing-library/jest-dom";
import { store } from "../store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { receiveUsers } from "../actions/users";

describe("LoginPage", () => {
  it("is expected to render the component", () => {
    const view = render(
      <Provider store={store}>
        <Router>
          <LoginPage />
        </Router>
      </Provider>
    );
    expect(view).toMatchSnapshot();
  });

  it("Is expected to show an error message if a wrong password is typed in the password input field.", async () => {
    const users = {
      mtsamis: {
        id: "mtsamis",
        password: "xyz123",
        name: "Mike Tsamis",
        avatarURL:
          "https://www.shutterstock.com/image-vector/young-smiling-man-adam-avatar-600w-2107967969.jpg",
      },
    };
    await store.dispatch(receiveUsers(users));
    render(
      <Provider store={store}>
        <Router>
          <LoginPage />
        </Router>
      </Provider>
    );

    const usernameInput = screen.getByPlaceholderText("Enter username");
    fireEvent.change(usernameInput, { target: { value: "mtsamis" } });
    const passInput = screen.getByPlaceholderText("Enter password");
    fireEvent.change(passInput, { target: { value: "notpassword" } });
    const submitButton = screen.getByRole("button", { name: "Login" });

    fireEvent.click(submitButton);
    expect(
      screen.getByText("Username or Password incorrect!")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  });
});
