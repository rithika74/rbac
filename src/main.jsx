import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Context from "./services/Context.jsx";
import {  HashRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <HashRouter basename="/rbac/">
    <Context>
      <App />
    </Context>
  </HashRouter>
);
