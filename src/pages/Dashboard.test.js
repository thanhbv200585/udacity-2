import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Dashboard from "./Dashboard";
import { store } from "../store";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import { handleInitialData } from "../actions/shared";

describe("Dashboard", () => {
  it("Is expected to load the new and answered polls.", async () => {
    await store.dispatch(setAuthedUser("mtsamis"));
    await store.dispatch(handleInitialData());
    const view = render(
      <Provider store={store}>
        <Router>
          <Dashboard />
        </Router>
      </Provider>
    );
    expect(view).toMatchSnapshot();
  });
});
