import React from "react";
import ReactDOM from "react-dom";
import model from "./store/model/init";
import modelActions from "./store/model/actions";
import { initialActions } from "./lib/store";

import App from "./App";

initialActions(model, modelActions);

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);
