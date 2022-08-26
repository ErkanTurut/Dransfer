import { useState, useEffect } from "react";
import reactLogo from "./assets/capybara.svg";
import "./App.css";
import Navigation from "./components/nav";
import Header from "./components/header";
import Dropzone from "./components/upload/getFile";

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
      <>
        <Header />
      </>
      <div>
        <img src={reactLogo} className="logo react" alt="React logo" />
      </div>

      <>
        <Dropzone />
      </>
      <div>
        <p>
          <code>Dransfer by KAM</code>
        </p>
      </div>
    </div>
  );
}

export default App;
