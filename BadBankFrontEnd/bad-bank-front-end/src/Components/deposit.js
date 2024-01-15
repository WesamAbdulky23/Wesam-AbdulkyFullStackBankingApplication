import React from "react";
import UserContext from "../usercontext";
import AdminDeposit from "./adminDeposit";
import UserDeposit from "./userDeposit";

const Deposit = () => {
  const ctx = React.useContext(UserContext);

  React.useEffect(() => {
    if (!ctx.user) {
      window.location.href = "/#/login";
    }
  }, []);

  return (
    <>
      {ctx.user?.role === "admin" && <AdminDeposit />}
      {ctx.user?.role === "user" && <UserDeposit />}
    </>
  );
};

export default Deposit;
