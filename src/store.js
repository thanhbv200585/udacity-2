import reducer from "./reducers";
import { createStore } from "redux";
import middleware from "./middleware";

const store = createStore(reducer, middleware);

export { store };
