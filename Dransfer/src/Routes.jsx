import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes as Switch,
} from "react-router-dom";

import Home from "./components/Home";
import Transfers from "./components/Transfers";
import Navigation from "./components/nav";
import SelectWalletModal from "./components/selectWalletModal";

function Routes() {
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  window.addEventListener("load", (event) => {
    setIsLoading(false);
  });
  return (
    <>
      {isLoading ? (
        console.log("Loading...")
      ) : (
        <Router>
          <SelectWalletModal
            showModal={showModal}
            setShowModal={setShowModal}
          />
          <Navigation setShowModal={setShowModal} />
          <Switch>
            <Route path="/" element={<Home />} />
            <Route path="/transfers" element={<Transfers />} />
          </Switch>
        </Router>
      )}
    </>
  );
}

export default Routes;
