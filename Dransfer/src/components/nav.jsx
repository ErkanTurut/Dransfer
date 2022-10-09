import { Link } from "react-router-dom";
import React from "react";

import { ConnectButton } from "@rainbow-me/rainbowkit";

const Navigation = (props) => {
  return (
    <nav
      className="navbar navbar-dark navbar-expand-md fixed-top navbar-shrink py-2"
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
          <span
            className="bs-icon-md bs-icon-rounded bs-icon-white shadow-none d-flex justify-content-center align-items-center me-2 bs-icon"
            style={{ padding: "4px", borderRadius: "10px" }}
          >
            <img
              src="src/assets/img/capypasta.svg"
              style={{ height: "40px" }}
            />
          </span>
          <span className="d-none d-print-inline d-sm-none d-md-inline d-lg-inline d-xl-inline d-xxl-inline">
            Dransfer
          </span>
        </a>
        <div className="d-flex justify-content-end align-items-center">
          <div
            className="d-inline d-print-none d-sm-inline d-md-none d-lg-none d-xl-none d-xxl-none"
            style={{ marginRight: "10px" }}
          >
            <ConnectButton />
          </div>

          <button
            data-bs-toggle="collapse"
            className="navbar-toggler"
            data-bs-target="#navcol-1"
            aria-controls="#navcol-1"
            style={{
              borderRadius: "10px",
              paddingTop: "3px",
              paddingBottom: "3px",
              paddingLeft: "6px",
              paddingRight: "6px",
            }}
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
          <div className="d-none d-print-inline d-sm-none d-md-inline d-lg-inline d-xl-inline d-xxl-inline">
            <ConnectButton />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
