import React from "react";
import Card from "./Card";
import host from "../Utils/host";

function AdminBalance() {
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
  const [isDisabled, setIsDisabled] = React.useState(true);
  const [email, setEmail] = React.useState("");
  React.useEffect(() => {
    const isValidEmail = (email) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    if (isValidEmail(email)) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [email]);

  function handle() {
    fetch(`${host}/account/findOne/${email}`)
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
      Email
      <br />
      <input
        type="input"
        className="form-control"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
      />
      <br />
      <button
        type="submit"
        className="btn btn-light"
        onClick={handle}
        disabled={isDisabled}
      >
        Check Balance
      </button>
    </>
  );
}

export default AdminBalance;
