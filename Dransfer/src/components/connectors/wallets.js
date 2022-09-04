import { chain } from "wagmi";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

const connectors = [
  new MetaMaskConnector({
    chains: [chain.mainnet],
    options: {
      shimChainChangedDisconnect: false,
    },
  }),
  new CoinbaseWalletConnector({
    chains: [chain.mainnet],
    options: {
      appName: "Dransfer",
      jsonRpcUrl:
        "https://mainnet.infura.io/v3/e55d782ca3414ac496c79cfc29b8f84c",
    },
  }),
  new WalletConnectConnector({
    chains: [chain.mainnet],
    options: {
      qrcode: true,
    },
  }),
  new InjectedConnector({
    chains: [chain.mainnet],
    options: {
      shimChainChangedDisconnect: true,
    },
  }),
];

export default connectors;
