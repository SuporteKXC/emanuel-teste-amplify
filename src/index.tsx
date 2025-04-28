import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import HTTPSredirect from "react-https-redirect";
import "./ws";
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <HTTPSredirect>
      <App />
    </HTTPSredirect>
  </React.StrictMode>,
  document.getElementById("root")
);
