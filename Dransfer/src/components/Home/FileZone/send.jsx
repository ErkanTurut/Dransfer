import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Send = (props) => {
  const { fileSettings, isSent, progress, hash } = props;

  return (
    <div
      className="d-flex flex-column flex-grow-1 justify-content-center align-items-center align-items-lg-center"
      style={{ gap: "10px" }}
    >
      {isSent ? (
        <div
          className="d-flex flex-column flex-grow-1 justify-content-center align-items-center align-items-lg-center"
          style={{ gap: "10px" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            width="1em"
            height="1em"
            fill="currentColor"
            className="fs-1 text-success"
            style={{ paddingBottom: "0px", marginBottom: "10px" }}
          >
            {/*! Font Awesome Free 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. */}
            <path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM371.8 211.8C382.7 200.9 382.7 183.1 371.8 172.2C360.9 161.3 343.1 161.3 332.2 172.2L224 280.4L179.8 236.2C168.9 225.3 151.1 225.3 140.2 236.2C129.3 247.1 129.3 264.9 140.2 275.8L204.2 339.8C215.1 350.7 232.9 350.7 243.8 339.8L371.8 211.8z" />
          </svg>
          <h2>Your link is ready</h2>
          <p className="text-start" style={{ marginBottom: "20px" }}>
            Your file has been distributed successfully, you can share it with
            your friends or add new versions!
          </p>
          <div className="d-flex">
            <input
              className="shadow-none form-control"
              type="text"
              defaultValue={`https://dransfer.infura-ipfs.io/ipfs/${hash}`}
              readOnly
              style={{
                borderRadius: "10px",
                color: "var(--bs-dark)",
                borderTopRightRadius: "0px",
                borderBottomRightRadius: "0px",
              }}
            />
            <button
              className="btn btn-success btn-sm shadow-none d-flex justify-content-center align-items-center"
              type="button"
              style={{
                gap: "0.5em",
                borderRadius: "10px",
                marginLeft: "0px",
                borderTopLeftRadius: "0px",
                borderBottomLeftRadius: "0px",
                paddingLeft: "15px",
                paddingRight: "15px",
              }}
              onClick={() => {
                navigator.clipboard.writeText(
                  `https://dransfer.infura-ipfs.io/ipfs/${hash}`
                );
                toast.info("Copied to clipboard!", {
                  toastId: "copy-to-clipboard",
                });
              }}
            >
              <img
                src="./src/assets/img/capypasta.svg"
                style={{
                  padding: "0px",
                  paddingBottom: "0px",
                  marginBottom: "0px",
                  height: "32px",
                }}
              />
              Copy
            </button>
          </div>
        </div>
      ) : (
        <div>
          <span
            className="spinner-grow text-success"
            role="status"
            style={{ marginBottom: "10px" }}
          />
          <h2>Almost ready</h2>
          <p className="text-start" style={{ marginBottom: "20px" }}>
            Votre fichier a été enregistré sur votre portefeuille. Vous pouvez
            le retrouver dans vos transferts.
          </p>
          <div style={{ width: "100%" }}>
            <div
              className="progress"
              style={{
                width: "100%",
                height: "46.78px",
                borderRadius: "10px",
                fontWeight: "bold",
              }}
            >
              <div
                className="progress-bar bg-primary"
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
                style={{ width: `${progress}%` }}
              >
                {progress}%
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Send;
