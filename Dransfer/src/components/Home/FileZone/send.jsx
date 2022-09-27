import React, { useEffect, useState } from "react";

const Send = (props) => {
  const { storeInWalletCheck, isSent, progress, hash } = props;

  return (
    <div
      className="d-flex flex-column flex-grow-1 justify-content-center align-items-center align-items-lg-center"
      style={{ gap: "10px" }}
    >
      <img
        className="img-fluid"
        src="./src/assets/img/capypasta_white.svg"
        loading="auto"
        style={{ padding: "0px", paddingBottom: "0px", marginBottom: "15px" }}
        width={150}
      />
      {isSent ? (
        <div style={{ width: "100%" }}>
          <p className="text-center" style={{ marginBottom: "10px" }}>
            Here is your link !&nbsp;
            <a className="link-secondary" href="/">
              Again
            </a>
            <br />
          </p>
          <div className="d-flex">
            <input
              className="form-control"
              type="text"
              defaultValue={`https://dransfer.infura-ipfs.io/ipfs/${hash}`}
              readOnly
              style={{ borderRadius: "10px", color: "var(--bs-dark)" }}
            />
            <button
              className="btn btn-success btn-sm"
              type="button"
              style={{ borderRadius: "10px", marginLeft: "10px" }}
              onClick={() => {
                navigator.clipboard.writeText(
                  `https://dransfer.infura-ipfs.io/ipfs/${hash}`
                );
              }}
            >
              Copy
            </button>
          </div>
        </div>
      ) : (
        <div style={{ width: "100%" }}>
          <p style={{ marginBottom: "0px", textAlign: "left" }}>
            To the moon...
          </p>
          <div
            className="progress"
            style={{
              width: "100%",
              height: "35px",
              borderRadius: "5px",
              fontWeight: "bold",
            }}
          >
            <div
              className="progress-bar progress-bar-striped progress-bar-animated"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
              style={{ width: `${progress}%` }}
            >
              {progress}%
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Send;
