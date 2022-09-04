import React, { useEffect } from "react";
import Modal from "react-bootstrap/Modal";

import { useAccount, useConnect, useEnsName } from "wagmi";
const SelectWalletModal = (props) => {
  const { showModal, setShowModal } = props;

  const { connectors, connect } = useConnect();

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
      <div className="modal-content">
        <div className="modal-header d-xl-flex align-items-start">
          <div style={{ paddingRight: "0px" }}>
            <h4 className="modal-title fw-bold text-dark">Connect wallet</h4>
            <p className="text-muted" style={{ marginBottom: "0px" }}>
              Choose how you want to connect. There are several wallet
              providers.
            </p>
          </div>
          <button
            type="button"
            className="btn-close"
            onClick={() => setShowModal(false)}
          />
        </div>
        <div className="modal-body">
          <div className="container">
            <div className="row">
              <div
                className="col-md-6 d-flex flex-column mb-2"
                style={{ gap: "0.5em" }}
              >
                <button
                  className="btn btn-light btn-sm d-flex align-items-center justify-content-xl-start"
                  type="button"
                  style={{
                    borderRadius: "5px",
                    width: "100%",
                    padding: "10px",
                  }}
                  onClick={() => {
                    connect({ connector: connectors[0] });
                    setShowModal(false);
                  }}
                >
                  <img
                    src="src/assets/img/wallets/metamask.svg"
                    width="auto"
                    height="16px"
                  />
                  <span className="mx-auto">Metamask</span>
                </button>
                <button
                  className="btn btn-light btn-sm text-start d-flex align-items-center"
                  type="button"
                  style={{
                    borderRadius: "5px",
                    width: "100%",
                    padding: "10px",
                  }}
                  onClick={() => {
                    connect({ connector: connectors[1] });
                    setShowModal(false);
                  }}
                >
                  <img
                    src="src/assets/img/wallets/coinbase_wallet_appicon.svg"
                    width="auto"
                    height="16px"
                    style={{ borderRadius: "5px" }}
                  />
                  <span className="mx-auto">Coinbase Wallet</span>
                </button>
              </div>
              <div
                className="col-md-6 d-flex flex-column"
                style={{ gap: "0.5em" }}
              >
                <button
                  className="btn btn-light btn-sm d-flex align-items-center"
                  type="button"
                  style={{
                    borderRadius: "5px",
                    width: "100%",
                    padding: "10px",
                  }}
                  onClick={() => {
                    connect({ connector: connectors[2] });
                    setShowModal(false);
                  }}
                >
                  <img
                    src="src/assets/img/wallets/walletconnect_logo.svg"
                    width="auto"
                    height="16px"
                    style={{ borderRadius: "5px" }}
                  />
                  <span className="mx-auto">Wallet Connect</span>
                </button>
                <button
                  className="btn btn-light btn-sm text-start d-flex align-items-center"
                  type="button"
                  style={{
                    borderRadius: "5px",
                    width: "100%",
                    padding: "10px",
                  }}
                  onClick={() => {
                    console.log("TODO: add support for fortmatic");
                    setShowModal(false);
                    setProvider("fortmatic");
                  }}
                >
                  <img
                    src="src/assets/img/wallets/Fortmatic-icon.svg"
                    width="auto"
                    height="16px"
                    style={{ borderRadius: "5px" }}
                  />
                  <span className="mx-auto">Fortmatic</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer text-muted d-sm-flex justify-content-start">
          <p>Terms and conditions blablabla</p>
        </div>
      </div>
    </Modal>
  );
};

export default SelectWalletModal;
