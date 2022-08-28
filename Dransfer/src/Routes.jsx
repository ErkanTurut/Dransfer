import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes as Switch,
} from "react-router-dom";

import Home from "./components/Home";

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
          <Switch>
            <Route exact path="/" element={<Home />} />
          </Switch>
        </Router>
      )}
    </>
  );
}

export default Routes;
