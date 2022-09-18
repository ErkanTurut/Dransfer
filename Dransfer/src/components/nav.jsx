import { Link } from "react-router-dom";

import {
  useAccount,
  useConnect,
  useEnsName,
  useDisconnect,
  useBalance,
} from "wagmi";

const Navigation = (props) => {
  const { setShowModal } = props;
  const { address, isConnected } = useAccount();

  const { disconnect } = useDisconnect();
  return (
    <nav
      className="navbar navbar-dark navbar-expand-md fixed-top navbar-shrink py-1"
      id="mainNav"
      style={{
        color: "var(--bs-blue)",
        opacity: 1,
        backdropFilter: "opacity(1) blur(7px) brightness(46%)",
        background: "rgba(45, 44, 56, 0.51)",
      }}
    >
      <div className="container">
        <a className="navbar-brand d-flex align-items-center" href="/">
          <span className="bs-icon-md bs-icon-rounded bs-icon-white d-flex me-2 bs-icon">
            <img src="src/assets/img/capypasta.svg" style={{ width: "32px" }} />
          </span>
          <span className="d-none d-print-inline d-sm-none d-md-inline d-lg-inline d-xl-inline d-xxl-inline">
            Dransfer
          </span>
        </a>
        <div>
          {address && isConnected ? (
            <button
              className="btn btn-outline-success btn-sm text-nowrap d-inline d-print-none d-sm-inline d-md-none d-lg-none d-xl-none d-xxl-none"
              type="button"
              style={{ borderRadius: "10px", marginRight: "10px" }}
              onClick={() => disconnect()}
            >
              {address.slice(0, 5) + "..." + address.slice(38, 42)}
            </button>
          ) : (
            <button
              className="btn btn-primary btn-sm text-nowrap shadow d-inline d-print-none d-sm-inline d-md-none d-lg-none d-xl-none d-xxl-none"
              type="button"
              onClick={() => setShowModal(true)}
              style={{ borderRadius: "10px", marginRight: "10px" }}
            >
              Connect wallet
            </button>
          )}
          <button
            data-bs-toggle="collapse"
            className="navbar-toggler"
            data-bs-target="#navcol-1"
            aria-controls="#navcol-1"
            style={{ borderRadius: "10px" }}
          >
            <span className="visually-hidden">Toggle navigation</span>
            <span className="navbar-toggler-icon" />
          </button>
        </div>
        <div className="collapse navbar-collapse" id="navcol-1">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="services.html">
                Services
              </a>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/transfers">
                Transfers
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="pricing.html">
                Pricing
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="contacts.html">
                Contacts
              </a>
            </li>
          </ul>
          {address && isConnected ? (
            <button
              className="btn btn-outline-success btn-sm text-nowrap d-none d-print-inline d-sm-none d-md-inline d-lg-inline d-xl-inline d-xxl-inline"
              type="button"
              style={{ borderRadius: "10px" }}
              onClick={() => disconnect()}
            >
              {address.slice(0, 5) + "..." + address.slice(38, 42)}
            </button>
          ) : (
            <button
              className="btn btn-primary btn-sm text-nowrap shadow d-none d-print-inline d-sm-none d-md-inline d-lg-inline d-xl-inline d-xxl-inline"
              type="button"
              // data-bs-target="#modal-1"
              // data-bs-toggle="modal"
              onClick={() => setShowModal(true)}
              style={{ borderRadius: "10px" }}
            >
              Connect wallet
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
