import React from "react";
import Card from "./Card";
import host from "../Utils/host";
import UserContext from "../usercontext";

function UserBalance() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");

  return (
    <Card
      bgcolor="info"
      header="Balance"
      status={status}
      body={
        show ? (
          <BalanceForm setShow={setShow} setStatus={setStatus} />
        ) : (
          <BalanceMsg setShow={setShow} setStatus={setStatus} />
        )
      }
    />
  );
}

function BalanceMsg(props) {
  return (
    <>
      <h5>Success</h5>
      <button
        type="submit"
        className="btn btn-light"
        onClick={() => {
          props.setShow(true);
          props.setStatus("");
        }}
      >
        Check balance again
      </button>
    </>
  );
}

function BalanceForm(props) {
  const ctx = React.useContext(UserContext);

  function handle() {
    fetch(`${host}/account/findOne/${ctx.user.email}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.errorMessage) {
          if (data.errorMessage === "Email not found") {
            props.setStatus("Email not found. Please try again.");
          } else {
            props.setStatus(data.errorMessage);
          }
        } else {
          props.setStatus(`Your current balance is: ${data.balance}`);
          props.setShow(false);
        }
      })
      .catch((err) => {
        props.setStatus("Email not found.");
        console.log("Error:", err);
      });
  }

  return (
    <>
      <button type="submit" className="btn btn-light" onClick={handle}>
        Check Balance
      </button>
    </>
  );
}

export default UserBalance;
