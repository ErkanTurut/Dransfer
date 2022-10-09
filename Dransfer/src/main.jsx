import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { WagmiConfig, createClient, chain, configureChains } from "wagmi";
import { infuraProvider } from "wagmi/providers/infura";

import {
  RainbowKitProvider,
  connectorsForWallets,
  lightTheme,
} from "@rainbow-me/rainbowkit";

import {
  metaMaskWallet,
  walletConnectWallet,
  injectedWallet,
  ledgerWallet,
  coinbaseWallet,
  rainbowWallet,
} from "@rainbow-me/rainbowkit/wallets";

import "./assets/css/bootstrap.min.css";
import "./assets/css/style.compiled.css";
import "react-toastify/dist/ReactToastify.css";
import "@rainbow-me/rainbowkit/styles.css";

const { provider, webSocketProvider, chains } = configureChains(
  [chain.polygon],
  [infuraProvider({ apiKey: import.meta.env.VITE_INFURA_KEY })]
);

const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [
      metaMaskWallet({ chains }),
      coinbaseWallet({
        chains,
        options: {
          appName: "Dransfer",
          jsonRpcUrl:
            "https://mainnet.infura.io/v3/e55d782ca3414ac496c79cfc29b8f84c",
          desc: "Dransfer",
        },
      }),
      walletConnectWallet({
        chains,
      }),
      injectedWallet({ chains }),
      ledgerWallet({ chains }),
      rainbowWallet({ chains }),
    ],
  },
]);

const client = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WagmiConfig client={client}>
      <RainbowKitProvider theme={lightTheme()} chains={chains}>
        <App />
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>
);
