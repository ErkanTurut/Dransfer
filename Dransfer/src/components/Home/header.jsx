import React, { useState } from "react";

import useToggle from "../../Hooks/useToggle";

import HeroCTA from "./heroCTA";
import Dropzone from "./FileZone/Dropzone";
import Settings from "./FileZone/settings";
//import DransferStorage from "../../artifacts/contracts/Dransfer.sol/DransferStorage.json";

const Header = (props) => {
  const [files, setFiles] = useState([]);
  const [handleNextClick, setHandleNextClick] = useToggle(false);
  const [fileSettings, setFileSettings] = useState({
    title: "",
    message: "",
    storeInWalletCheck: false,
  });

  return (
    <header className="bg-dark py-5">
      <div className="container py-3">
        <div className="row py-5">
          <HeroCTA />
          <div className="col-md-6 text-center mb-4">
            <div className="row d-flex justify-content-center">
              <div
                className="col-sm-11 col-md-11 col-lg-9 col-xl-8 col-xxl-7"
                style={{ paddingLeft: "12px", paddingRight: "12px" }}
              >
                <div
                  className="card mb-0"
                  style={{ overflow: "hidden", borderRadius: "10px" }}
                >
                  <div className="card-body p-sm-3">
                    {handleNextClick ? (
                      //settings component
                      <Settings
                        files={files}
                        setHandleNextClick={setHandleNextClick}
                        setFileSettings={setFileSettings}
                        fileSettings={fileSettings}
                      />
                    ) : (
                      //file cacth component
                      <Dropzone
                        files={files}
                        setFiles={setFiles}
                        setHandleNextClick={setHandleNextClick}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
