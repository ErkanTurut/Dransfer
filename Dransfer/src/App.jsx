import { useState } from "react";
import reactLogo from "./assets/Talking_ben.webp";
import "./App.css";
import Navigation from "./components/navbar";

//import getWeb3 from "./getWeb3.js";
import { ethers } from "ethers";

function App() {
  const [account, setAccount] = useState(null);

  const web3Handler = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(accounts[0]);
    // Get provider from Metamask
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // Set signer
    const signer = provider.getSigner();

    window.ethereum.on("chainChanged", (chainId) => {
      window.location.reload();
    });

    window.ethereum.on("accountsChanged", async function (accounts) {
      setAccount(accounts[0]);
      await web3Handler();
    });
  };

  return (
    <div className="App">
      <>
        <Navigation web3Handler={web3Handler} account={account} />
      </>

      <div>
        <a href="#">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <p>
          Account : {account} <br />
          <code>Dransfer by KAM</code>
        </p>
      </div>
    </div>
  );
}

export default App;
