import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

import "./assets/css/bootstrap.min.css";
import "./assets/css/style.css";

function getLibrary(provider) {
  return new Web3Provider(provider);
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <App />
    </Web3ReactProvider>
  </React.StrictMode>
);
