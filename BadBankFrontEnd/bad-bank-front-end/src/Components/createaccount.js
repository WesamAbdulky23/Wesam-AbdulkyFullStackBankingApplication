import React from "react";
import Card from "./Card";
import host from "../Utils/host";
import SignedInUser from "./signedInUser";
import UserContext from "../usercontext";
import NavBar from "./navbar";

function CreateAccount() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");

  return (
    <>
      <Card
        bgcolor="primary"
        header="Create Account"
        status={status}
        body={
          show ? (
            <CreateForm setShow={setShow} />
          ) : (
            <CreateMsg setShow={setShow} />
          )
        }
      />
    </>
  );
}

function CreateMsg(props) {
  return (
    <>
      <h5>Success</h5>
      <button
        type="submit"
        className="btn btn-light"
        onClick={() => props.setShow(true)}
      >
        Add another account
      </button>
    </>
  );
}

function CreateForm(props) {
  const [isDisabled, setIsDisabled] = React.useState(true);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const ctx = React.useContext(UserContext);

  React.useEffect(() => {
    const isValidEmail = (email) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const isValidAmount = (amount) => {
      return amount > 0;
    };

    if (isValidEmail(email)) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [email]);

  function handle() {
    console.log(name, email, password);
    const url = `${host}/account/create/${name}/${email}/false/${password}/user`;
    fetch(url)
      .then(async (res) => {
        var data = await res.json();

        console.log(data);

        ctx.user = {
          name: data.name,
          email: data.email,
          image: data.photoURL,
          role: data.role,
        };

        window.location.href = "/#";
        console.log(data);

        props.setShow(false);
      })
      .catch((err) => {
        props.setStatus("Account creation failed");
        console.log("err:", err);
      });
  }

  return (
    <>
      Name
      <br />
      <input
        type="input"
        className="form-control"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
      />
      <br />
      Email address
      <br />
      <input
        type="input"
        className="form-control"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
      />
      <br />
      Password
      <br />
      <input
        type="password"
        className="form-control"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
      />
      <br />
      <button
        type="submit"
        className="btn btn-light"
        onClick={handle}
        disabled={isDisabled}
      >
        Create Account
      </button>
    </>
  );
}

export default CreateAccount;
