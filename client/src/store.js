import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";

const middleware = [thunk];
export const createStoreWithMiddleware = applyMiddleware(...middleware)(
  createStore
);

export const store = createStoreWithMiddleware(
  reducers,
  {},
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
