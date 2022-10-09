import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes as Switch,
} from "react-router-dom";

import Home from "./components/Home";
import Transfers from "./components/Transfers";
import Navigation from "./components/nav";

import { ToastContainer } from "react-toastify";

function Routes() {
  const [isLoading, setIsLoading] = useState(true);

  window.addEventListener("load", (event) => {
    setIsLoading(false);
  });
  return (
    <>
      {isLoading ? (
        console.log("Loading...")
      ) : (
        <Router>
          <Navigation />
          <ToastContainer
            position="bottom-left"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            draggable
            pauseOnHover
          />
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
