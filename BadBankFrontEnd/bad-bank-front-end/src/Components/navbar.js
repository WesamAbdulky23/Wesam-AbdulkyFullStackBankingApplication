import React from "react";
import UserContext from "../usercontext";
import SignedInUser from "./signedInUser";

function NavBar() {
  const ctx = React.useContext(UserContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">
        BadBank
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          {!ctx.user && (
            <li className="nav-item">
              <a className="nav-link" href="#/CreateAccount/">
                Create Account
              </a>
            </li>
          )}
          {!ctx.user && (
            <li className="nav-item">
              <a className="nav-link" href="#/login/">
                Sign In
              </a>
            </li>
          )}
          {ctx.user && (
            <div className="d-flex">
              <li className="nav-item">
                <a className="nav-link" href="#/deposit/">
                  Deposit
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#/withdraw/">
                  Withdraw
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#/balance/">
                  Balance
                </a>
              </li>
              {ctx.user.role === "admin" && (
                <li className="nav-item">
                  <a className="nav-link" href="#/alldata/">
                    AllData
                  </a>
                </li>
              )}
            </div>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
