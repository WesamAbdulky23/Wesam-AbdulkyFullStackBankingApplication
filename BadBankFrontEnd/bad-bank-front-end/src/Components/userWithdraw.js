import React from "react";
import Card from "./Card";
import host from "../Utils/host";
import UserContext from "../usercontext";

function UserWithdraw() {
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

  const [amount, setAmount] = React.useState("");
  const ctx = React.useContext(UserContext);

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
    fetch(`${host}/account/update/${ctx.user.email}/-${amount}`)
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

export default UserWithdraw;
