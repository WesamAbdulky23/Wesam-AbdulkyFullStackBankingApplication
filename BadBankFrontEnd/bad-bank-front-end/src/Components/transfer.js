import React from "react";
import Card from "./Card";
import host from "../Utils/host";

function Transfer() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");

  return (
    <Card
      bgcolor="info"
      header="Transfer"
      status={status}
      body={
        show ? (
          <TransferForm setShow={setShow} setStatus={setStatus} />
        ) : (
          <TransferMsg setShow={setShow} setStatus={setStatus} />
        )
      }
    />
  );
}

function TransferMsg(props) {
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
        Make another transfer
      </button>
    </>
  );
}

function TransferForm(props) {
  const [isDisabled, setIsDisabled] = React.useState(true);
  const [sourceEmail, setSourceEmail] = React.useState("");
  const [destinationEmail, setDestinationEmail] = React.useState("");
  const [amount, setAmount] = React.useState("");

  React.useEffect(() => {
    const isValidEmail = (email) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const isValidAmount = (amount) => {
      return amount > 0;
    };

    if (
      isValidEmail(sourceEmail) &&
      isValidEmail(destinationEmail) &&
      isValidAmount(parseFloat(amount))
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [sourceEmail, destinationEmail, amount]);

  function handleTransfer() {
    fetch(`${host}/account/update/${sourceEmail}/${destinationEmail}/${amount}`)
      .then((response) => response.text())
      .then((text) => {
        try {
          const data = JSON.parse(text);

          if (data.errorMessage) {
            props.setStatus(data.errorMessage);
            return;
          }

          props.setStatus(
            `Transfer successful: ${amount} from ${sourceEmail} to ${destinationEmail}`
          );
          props.setShow(false);
        } catch (err) {
          props.setStatus("Transfer failed");
          console.log("err:", text);
        }
      });
  }

  return (
    <>
      Source Email
      <br />
      <input
        type="email"
        className="form-control"
        placeholder="Enter source email"
        value={sourceEmail}
        onChange={(e) => setSourceEmail(e.currentTarget.value)}
      />
      <br />
      Destination Email
      <br />
      <input
        type="email"
        className="form-control"
        placeholder="Enter destination email"
        value={destinationEmail}
        onChange={(e) => setDestinationEmail(e.currentTarget.value)}
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
        onClick={handleTransfer}
        disabled={isDisabled}
      >
        Transfer
      </button>
    </>
  );
}

export default Transfer;
