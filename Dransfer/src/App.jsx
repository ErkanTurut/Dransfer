import { useState, useEffect, useRef } from "react";
import Navigation from "./components/nav";
import Routes from "./Routes";
import SelectWalletModal from "./components/selectWalletModal";
import { useAccount, useSignMessage } from "wagmi";
import { verifyMessage, hashMessage } from "ethers/lib/utils";

function App() {
  const { address, isConnected } = useAccount();
  const [showModal, setShowModal] = useState(false);
  const recoveredAddress = useRef(null);
  const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage({
    message: hashMessage("test"),
    onSuccess(data, variables) {
      // Verify signature when sign message succeeds
      const address = verifyMessage(variables.message, data);
      recoveredAddress.current = address;
      console.log("first ", data);
      console.log("first ", variables);
    },
  });

  console.log("second data ", data);
  console.log("recoveredAddress ", recoveredAddress.current);
  return (
    <div className="App">
      <>
        <SelectWalletModal showModal={showModal} setShowModal={setShowModal} />
      </>
      <>
        <Navigation setShowModal={setShowModal} />
      </>
      <>
        <Routes />
        <button onClick={() => signMessage()}>sign</button>
      </>
    </div>
  );
}

export default App;
