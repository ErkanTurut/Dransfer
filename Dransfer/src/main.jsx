import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { WagmiConfig, createClient, chain, configureChains } from "wagmi";
import { getDefaultProvider } from "ethers";
import { infuraProvider } from "wagmi/providers/infura";

import connectors from "./components/connectors/wallets";
import "./assets/css/bootstrap.min.css";
import "./assets/css/style.compiled.css";
import "react-toastify/dist/ReactToastify.css";

const { chains, provider, webSocketProvider } = configureChains(
  [chain.mainnet, chain.polygon],
  [infuraProvider({ apiKey: import.meta.env.VITE_INFURA_KEY })]
);

const client = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WagmiConfig client={client}>
      <App />
    </WagmiConfig>
  </React.StrictMode>
);
