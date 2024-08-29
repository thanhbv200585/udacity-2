import { render, screen } from "@testing-library/react";
import Nav from "./Nav";
import { store } from "../store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { setAuthedUser } from "../actions/authedUser";
import { receiveUsers } from "../actions/users";

describe("Nav Component Tests", () => {
  it("should render the Nav component", () => {
    const { container } = render(
      <Provider store={store}>
        <Router>
          <Nav />
        </Router>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it("should display user's name and avatar when authenticated", async () => {
    const mockUser = {
      mtsamis: {
        id: "mtsamis",
        name: "Mike Tsamis",
        avatarURL: "https://www.shutterstock.com/image-vector/young-smiling-man-adam-avatar-600w-2107967969.jpg",
      },
    };

    await store.dispatch(receiveUsers(mockUser));
    await store.dispatch(setAuthedUser("mtsamis"));
    
    render(
      <Provider store={store}>
        <Router>
          <Nav />
        </Router>
      </Provider>
    );

    expect(screen.getByText("Mike Tsamis")).toBeInTheDocument();
    expect(screen.getByAltText("Mike Tsamis's avatar")).toBeInTheDocument();
  });
});
