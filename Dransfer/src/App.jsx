import { useState, useEffect } from "react";
import Navigation from "./components/nav";
import Routes from "./Routes";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useWeb3React } from "@web3-react/core";

//import getWeb3 from "./getWeb3.js";
import { ethers } from "ethers";

const infuraKey = import.meta.env.VITE_INFURA_KEY;

function App() {
  const { activate, deactivate } = useWeb3React();
  const { active, chainId, account } = useWeb3React();

  const CoinbaseWallet = new WalletLinkConnector({
    url: `https://mainnet.infura.io/v3/${infuraKey}`,
    appName: "Web3-react Demo",
    supportedChainIds: [1, 3, 4, 5, 42],
  });

  const WalletConnect = new WalletConnectConnector({
    rpcUrl: `https://mainnet.infura.io/v3/${infuraKey}`,
    bridge: "https://bridge.walletconnect.org",
    qrcode: true,
  });

  const Injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42],
  });

  return (
    <div className="App">
      <>
        <Navigation Injected={Injected} activate={activate} account={account} />
      </>

      <>
        <Routes />
      </>
      <button
        onClick={() => {
          activate(Injected);
        }}
      >
        Metamask
      </button>
    </div>
  );
}

export default App;
