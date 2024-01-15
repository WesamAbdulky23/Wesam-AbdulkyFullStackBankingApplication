import React from "react";
import UserContext from "../usercontext";

function SignedInUser() {
  const ctx = React.useContext(UserContext);

  return (
    <>
      {ctx.user && (
        <div style={{ position: "fixed", right: "10px", top: "10px" }}>
          {ctx.user.image && (
            <img
              src={ctx.user.image}
              alt="profile"
              style={{
                height: "30px",
                width: "30px",
                borderRadius: "100px",
                marginRight: "5px",
              }}
            ></img>
          )}
          {ctx.user?.email}
          <button
            className="btn btn-primary ml-2"
            onClick={() => {
              ctx.user = null;
              window.location.href = "/#";
              window.location.reload();
            }}
          >
            Sign Out
          </button>
        </div>
      )}
    </>
  );
}

export default SignedInUser;
