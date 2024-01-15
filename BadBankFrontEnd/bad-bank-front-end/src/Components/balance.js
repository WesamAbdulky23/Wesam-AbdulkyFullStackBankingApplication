import React from "react";
import UserContext from "../usercontext";
import AdminBalance from "./adminBalance";
import UserBalance from "./userBalance";

const Balance = () => {
  const ctx = React.useContext(UserContext);

  React.useEffect(() => {
    if (!ctx.user) {
      window.location.href = "/#/login";
    }
  }, []);

  return (
    <>
      {ctx.user?.role === "admin" && <AdminBalance />}
      {ctx.user?.role === "user" && <UserBalance />}
    </>
  );
};

export default Balance;
