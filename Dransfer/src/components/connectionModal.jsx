import React from "react";

import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useWeb3React } from "@web3-react/core";

const infuraKey = import.meta.env.VITE_INFURA_KEY;

const ConnectionModal = (props) => {
  const { activate, deactivate } = useWeb3React();

  const CoinbaseWallet = new WalletLinkConnector({
    url: `https://mainnet.infura.io/v3/${infuraKey}`,
    appName: "Web3-react Demo",
    supportedChainIds: [1, 3, 4, 5, 42],
  });

  const WalletConnect = new WalletConnectConnector({
    rpcUrl: `https://mainnet.infura.io/v3/${infuraKey}`,
    bridge: "https://bridge.walletconnect.org",
    qrcode: true,
  });

  const Injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42, 137],
  });
  return (
    <div
      className="modal fade"
      role="dialog"
      tabIndex={-1}
      id="modal-1"
      style={{ backdropFilter: "blur(5px)" }}
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
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
              data-bs-dismiss="modal"
              aria-label="Close"
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
                      activate(Injected);
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
          <div className="modal-footer text-muted d-sm-flex justify-content-sm-start">
            <p>Terms and conditions blablabla</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectionModal;
