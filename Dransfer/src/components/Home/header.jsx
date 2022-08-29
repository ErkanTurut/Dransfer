import { useState, useEffect, useCallback } from "react";
import {
  fileSize,
  removeFile,
  fileType,
  totalSize,
} from "./FileZone/catchFile";
import ipfsAdd from "../upload/ipfs";

import useToggle from "../../Hooks/useToggle";

import HeroCTA from "./FileZone/heroCTA";
import FileHandler from "./FileZone/fileHandler";
import Settings from "./FileZone/settings";
import Send from "./FileZone/send";

const Header = () => {
  const [files, setFiles] = useState([]);
  const [errorFiles, setErrorFiles] = useState([]);
  const [handleNextClick, setHandleNextClick] = useToggle(false);
  const [handleWalletCheck, setHandleWalletCheck] = useState(false);
  const [isSendings, setIsSendings] = useToggle(false);

  return (
    <header className="bg-dark py-5">
      <div className="container py-3">
        <div className="row py-5">
          <HeroCTA />

          <div className="col-md-6 text-center mb-4">
            <div className="row d-flex justify-content-center">
              <div
                className="col-lg-9 col-xl-8 col-xxl-7"
                style={{ paddingLeft: "12px", paddingRight: "12px" }}
              >
                <div
                  className="card mb-0"
                  style={{ overflow: "hidden", borderRadius: "10px" }}
                >
                  <div className="card-body p-sm-3">
                    {isSendings ? (
                      <Send files={files} />
                    ) : handleNextClick ? (
                      //settings component
                      <Settings
                        files={files}
                        setHandleWalletCheck={setHandleWalletCheck}
                        handleWalletCheck={handleWalletCheck}
                        setHandleNextClick={setHandleNextClick}
                        setIsSendings={setIsSendings}
                      />
                    ) : (
                      //file cacth component
                      <FileHandler
                        files={files}
                        setFiles={setFiles}
                        errorFiles={errorFiles}
                        setErrorFiles={setErrorFiles}
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
