import { Link } from "react-router-dom";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import capybara from "../assets/capybara.svg";

const Navigation = ({ web3Handler, account }) => {
  return (
    <nav
      className="navbar navbar-dark navbar-expand-md fixed-top navbar-shrink py-3"
      id="mainNav"
      style={{
        color: "var(--bs-blue)",
        opacity: 1,
        backdropFilter: "opacity(1) blur(7px) brightness(46%)",
        background: "rgba(45,44,56,0.51)",
      }}
    >
      <div className="container">
        <a className="navbar-brand d-flex align-items-center" href="/">
          <span className="bs-icon-sm bs-icon-rounded bs-icon-white shadow d-flex me-2 bs-icon">
            <img
              src="src/assets/img/599956-200.png"
              style={{ width: "35px" }}
            />
          </span>
          <span>Dransfer</span>
        </a>
        <button
          data-bs-toggle="collapse"
          className="navbar-toggler"
          data-bs-target="#navcol-1"
        >
          <span className="visually-hidden">Toggle navigation</span>
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navcol-1">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <a className="nav-link active" href="index-app.html">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="services.html">
                Services
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="projects.html">
                Projects
              </a>
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
          {account ? (
            <button className="btn btn-outline-success btn-sm" type="button">
              {account.slice(0, 5) + "..." + account.slice(38, 42)}
            </button>
          ) : (
            <button
              className="btn btn-primary shadow btn-sm"
              role="button"
              onClick={web3Handler}
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
