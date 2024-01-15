import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import Card from "./Card";
import React from "react";
import UserContext from "../usercontext";
import host from "../Utils/host";

const firebaseConfig = {
  apiKey: "AIzaSyDdakNPXsAxT-XYIL6zIT5Gx08EgvVcc8c",
  authDomain: "badbank-ff718.firebaseapp.com",
  projectId: "badbank-ff718",
  storageBucket: "badbank-ff718.appspot.com",
  messagingSenderId: "503450753452",
  appId: "1:503450753452:web:fdc8a9db43d9acd3898209",
};

function Login() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const ctx = React.useContext(UserContext);

  const handleLogin = async (email, password) => {
    fetch(`${host}/account/login/${email}/${password}`)
      .then((response) => response.text())
      .then((text) => {
        try {
          const data = JSON.parse(text);

          if (data.errorMessage) {
            setStatus(data.errorMessage);

            return;
          }

          ctx.user = {
            name: data.name,
            email: data.email,
            image: data.photoURL,
            role: data.role,
            acccountNumber: data._id,
          };

          setStatus(`You're successfully signed-in as ${data.email}`);
          setShow(false);
          console.log("JSON:", data);
          window.location.href = "/#";
        } catch (err) {
          setStatus("Log-in failed");
          console.log("err:", err);
        }
      });
  };

  function handleGoogleLogin() {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    // provider.addScope("profile");
    // provider.addScope("email");

    signInWithPopup(auth, provider)
      .then(async (result) => {
        // Handle the successful login here
        const user = result.user;

        ctx.user = {
          name: user.displayName,
          email: user.email,
          image: user.photoURL,
          role: "admin",
        };

        const url = `${host}/account/create/${user.displayName}/${
          user.email
        }/true/null/admin/${encodeURIComponent(user.photoURL)}`;

        await fetch(url);

        window.location.href = "/#";
        setStatus("Google Sign-in successful!");
        console.log("Google Sign-in successful", user);
      })
      .catch((error) => {
        // Handle errors here
        setStatus("Google Sign-in failed.");
        console.error("Google Sign-in error:", error);
      });
  }

  return (
    <Card
      bgcolor="warning"
      header="Sign In"
      status={status}
      body={
        show ? (
          <LoginForm
            setShow={setShow}
            setStatus={setStatus}
            handleLogin={handleLogin}
            handleGoogleLogin={handleGoogleLogin}
          />
        ) : (
          <LoginMsg setShow={setShow} setStatus={setStatus} />
        )
      }
    />
  );
}

function LoginForm({ setShow, setStatus, handleLogin, handleGoogleLogin }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handle = () => {
    handleLogin(email, password);
  };

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
      <div className="row m-0">
        <div className="col-4 p-0">
          <button
            disabled={!email || !password}
            type="submit"
            className="btn btn-light"
            onClick={handle}
            style={{ height: "40px" }}
          >
            Login
          </button>
        </div>
        <div className="col-2"></div>
        <div
          className="col-6 btn btn-light"
          style={{ height: "40px" }}
          onClick={handleGoogleLogin}
        >
          <img
            src="google-icon.png"
            alt="Sign in with Google"
            width={"30px"}
            style={{ marginBottom: "3px" }}
          />
          Sign in
        </div>
      </div>
    </>
  );
}

function LoginMsg(props) {
  return (
    <>
      <h5>Success</h5>
      <button
        type="submit"
        className="btn btn-light"
        onClick={() => props.setShow(true)}
      >
        Authenticate again
      </button>
    </>
  );
}

export default Login;
