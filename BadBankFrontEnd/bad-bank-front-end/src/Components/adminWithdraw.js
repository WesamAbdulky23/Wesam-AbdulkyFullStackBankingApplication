import React from "react";
import Card from "./Card";
import host from "../Utils/host";

function Withdraw() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");

  return (
    <Card
      bgcolor="success"
      header="Withdraw"
      status={status}
      body={
        show ? (
          <WithdrawForm setShow={setShow} setStatus={setStatus} />
        ) : (
          <WithdrawMsg setShow={setShow} setStatus={setStatus} />
        )
      }
    />
  );
}

function WithdrawMsg(props) {
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
        Withdraw again
      </button>
    </>
  );
}

function WithdrawForm(props) {
  const [isDisabled, setIsDisabled] = React.useState(true);
  const [email, setEmail] = React.useState("");
  const [amount, setAmount] = React.useState("");

  React.useEffect(() => {
    const isValidEmail = (email) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const isValidAmount = (amount) => {
      return amount > 0;
    };

    if (isValidEmail(email) && isValidAmount(parseFloat(amount))) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [email, amount]);

  function handle() {
    fetch(`${host}/account/update/${email}/-${amount}`)
      .then((response) => response.text())
      .then((result) => {
        try {
          const data = JSON.parse(result);

          if (data.errorMessage) {
            props.setStatus(data.errorMessage);

            return;
          }

          props.setStatus(`Your current balance is: ${data.value.balance}`);
          props.setShow(false);
        } catch (err) {
          props.setStatus("Withdraw failed");
          console.log("err:", err);
        }
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
      Amount
      <br />
      <input
        type="number"
        className="form-control"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.currentTarget.value)}
      />
      <br />
      <button
        type="submit"
        className="btn btn-light"
        onClick={handle}
        disabled={isDisabled}
      >
        Withdraw
      </button>
    </>
  );
}

export default Withdraw;
