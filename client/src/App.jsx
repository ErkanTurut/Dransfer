import { useState } from "react";
import logo from "./logo.svg";
import maintenance from "./maintenance.png";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <img src={maintenance} className="App-logo" alt="logo" />
        <p>Vite + React + Hardhat</p>
        <p>
          <code>Decentralized app developped by KAM.</code>
        </p>
      </header>
    </div>
  );
}

export default App;
