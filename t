import { useState } from "react";
import logo from "./logo.svg";
import maintenance from "./maintenance.png";
import "./App.css";

import getWeb3 from "./components/getWeb3";

function App() {
  //const [account, setAccount] = useState(null);
  return (
    <div className="App">
      <header className="App-header">
        <img src={maintenance} className="App-logo" alt="logo" />
        <p>Vite + React + Hardhat</p>
        <p>
          <code>Decentralized app developped by KAM.</code>
          `account : ${account}`
        </p>
        <button
          onClick={async () => {
            console.log("ok");
            const web3 = await getWeb3();
            const accounts = await web3.eth.getAccounts();
            //const networkId = await web3.eth.net.getId();
            setAccount(accounts[0]);
          }}
        ></button>
      </header>
    </div>
  );
}

export default App;
