import { useState, useEffect } from "react";
import Navigation from "./components/nav";
import Routes from "./Routes";
import SelectWalletModal from "./components/selectWalletModal";
import { useAccount, useConnect, useEnsName } from "wagmi";
function App() {
  const { address, isConnected } = useAccount();

  const [showModal, setShowModal] = useState(false);

  return (
    <div className="App">
      <>
        <SelectWalletModal showModal={showModal} setShowModal={setShowModal} />
      </>
      <>
        <Navigation account={address} setShowModal={setShowModal} />
      </>
      <>
        <Routes />
      </>
    </div>
  );
}

export default App;
