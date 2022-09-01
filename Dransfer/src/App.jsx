import { useState, useEffect } from "react";
import Navigation from "./components/nav";
import Routes from "./Routes";

import { useWeb3React } from "@web3-react/core";
import ConnectionModal from "./components/connectionModal";

//import getWeb3 from "./getWeb3.js";
import { ethers } from "ethers";

function App() {
  const { active, chainId, account } = useWeb3React();
  useEffect(() => {
    console.log(chainId, account, active);
  });

  return (
    <div className="App">
      <>
        <ConnectionModal />
      </>

      <>
        <Navigation account={account} />
      </>

      <>
        <Routes />
      </>
    </div>
  );
}

export default App;
