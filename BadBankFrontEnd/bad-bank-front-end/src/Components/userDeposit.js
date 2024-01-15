import React from "react";
import Card from "./Card";
import host from "../Utils/host";
import UserContext from "../usercontext";
function Deposit() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");

  return (
    <Card
      bgcolor="warning"
      header="Deposit"
      status={status}
      body={
        show ? (
          <DepositForm setShow={setShow} setStatus={setStatus} />
        ) : (
          <DepositMsg setShow={setShow} setStatus={setStatus} />
        )
      }
    />
  );
}

function DepositMsg(props) {
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
        Deposit again
      </button>
    </>
  );
}

function DepositForm(props) {
  const ctx = React.useContext(UserContext);

  const [isDisabled, setIsDisabled] = React.useState(true);

  const [amount, setAmount] = React.useState("");

  React.useEffect(() => {
    const isValidAmount = (amount) => {
      return amount > 0;
    };

    if (isValidAmount(parseFloat(amount))) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [amount]);

  function handle() {
    fetch(`${host}/account/update/${ctx.user.email}/${amount}`)
      .then((response) => response.text())
      .then((text) => {
        try {
          const data = JSON.parse(text);

          if (data.errorMessage) {
            props.setStatus(data.errorMessage);

            return;
          }

          props.setStatus(`Your current balance is: ${data.value.balance}`);
          props.setShow(false);
          console.log("JSON:", data);
        } catch (err) {
          props.setStatus("Deposit failed");
          console.log("err:", text);
        }
      });
  }

  return (
    <>
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
        Deposit
      </button>
    </>
  );
}

export default Deposit;
