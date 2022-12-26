import React, { useEffect } from "react";

import Routes from "./Routes";

import { useSignMessage, useAccount } from "wagmi";
import { verifyMessage } from "ethers/lib/utils";

function App() {
  const { isConnected } = useAccount();
  const { data, error, isLoading, signMessage } = useSignMessage({
    message: "Hello World",
    onSuccess(data, variables) {
      // Verify signature when sign message succeeds
      const address = verifyMessage(variables.message, data);
      console.log(address);
    },
  });

  return (
    <div className="App">
      <>
        <Routes />
      </>
    </div>
  );
}

export default App;
