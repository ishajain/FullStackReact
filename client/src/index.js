import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "materialize-css/dist/css/materialize.min.css";
import App from "./components/App";
import { store } from "./store";

import axios from 'axios'
window.axios = axios

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
