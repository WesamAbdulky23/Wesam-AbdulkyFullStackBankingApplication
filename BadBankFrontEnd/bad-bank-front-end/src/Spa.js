import React from "react";
import CreateAccount from "./Components/createaccount";
import Login from "./Components/login";
import Deposit from "./Components/deposit";
import Withdraw from "./Components/withdraw";
import Balance from "./Components/balance";
import AllData from "./Components/alldata";
import Home from "./Components/home";
import NavBar from "./Components/navbar";
import { Routes, Route, HashRouter } from "react-router-dom";
import UserContext from "./usercontext";
import SignedInUser from "./Components/signedInUser";
import Transfer from "./Components/transfer";

function Spa() {
  return (
    <HashRouter>
      <div>
        <UserContext.Provider value={{}}>
          <Routes>
            <Route
              path="/"
              exact
              element={
                <>
                  <NavBar />
                  <SignedInUser />
                  <Home />
                </>
              }
            />
            <Route
              path="/CreateAccount/"
              element={
                <>
                  <NavBar />
                  <SignedInUser />
                  <CreateAccount />
                </>
              }
            />
            <Route
              path="/login/"
              element={
                <>
                  <NavBar />
                  <SignedInUser />
                  <Login />
                </>
              }
            />
            <Route
              path="/deposit/"
              element={
                <>
                  <NavBar />
                  <SignedInUser />
                  <Deposit />
                </>
              }
            />
            <Route
              path="/withdraw/"
              element={
                <>
                  <NavBar />
                  <SignedInUser />
                  <Withdraw />
                </>
              }
            />
            {/* <Route path="/transactions/" element={Transactions} /> */}
            <Route
              path="/balance/"
              element={
                <>
                  <NavBar />
                  <SignedInUser />
                  <Balance />
                </>
              }
            />
            <Route
              path="/transfer/"
              element={
                <>
                  <NavBar />
                  <SignedInUser />
                  <Transfer />
                </>
              }
            />
            <Route
              path="/alldata/"
              element={
                <>
                  <NavBar />
                  <SignedInUser />
                  <AllData />
                </>
              }
            />
          </Routes>
        </UserContext.Provider>
      </div>
    </HashRouter>
  );
}

export default Spa;
