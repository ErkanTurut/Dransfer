import { chain } from "wagmi";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

const connectors = [
  new MetaMaskConnector({
    chains: [chain.hardhat],
    options: {
      shimChainChangedDisconnect: false,
    },
  }),
  new CoinbaseWalletConnector({
    chains: [chain.hardhat],
    options: {
      appName: "Dransfer",
      jsonRpcUrl:
        "https://mainnet.infura.io/v3/e55d782ca3414ac496c79cfc29b8f84c",
      desc: "Dransfer",
    },
  }),
  new WalletConnectConnector({
    chains: [chain.hardhat],
    options: {
      qrcode: true,
    },
  }),
  new InjectedConnector({
    chains: [chain.hardhat],
    options: {
      shimChainChangedDisconnect: true,
    },
  }),
];

export default connectors;
