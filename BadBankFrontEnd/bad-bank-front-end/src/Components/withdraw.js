import React from "react";
import UserContext from "../usercontext";
import AdminWithdraw from "./adminWithdraw";
import UserWithdraw from "./userWithdraw";

const Withdraw = () => {
  const ctx = React.useContext(UserContext);

  React.useEffect(() => {
    if (!ctx.user) {
      window.location.href = "/#/login";
    }
  }, []);

  return (
    <>
      {ctx.user?.role === "admin" && <AdminWithdraw />}
      {ctx.user?.role === "user" && <UserWithdraw />}
    </>
  );
};

export default Withdraw;
