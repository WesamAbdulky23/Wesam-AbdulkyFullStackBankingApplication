import React from "react";
import host from "../Utils/host";
import UserContext from "../usercontext";

function AllData() {
  const ctx = React.useContext(UserContext);
  const [data, setData] = React.useState();

  const fetchAllUsers = async () => {
    fetch(`${host}/account/all`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });
  };

  React.useEffect(() => {
    // fetch all accounts from API
    if (ctx.user == null) {
      window.location.href = "/#/login";

      return;
    }

    fetchAllUsers();
  }, []);

  const deleteUser = (email) => {
    fetch(`${host}/account/deleteUser/${email}`)
      .then((response) => response.json())
      .then((data) => {
        // Update the state to remove the user from the table
        console.log(data);
        fetchAllUsers();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div class="container">
      {ctx.user?.role !== "admin" && (
        <h1>You are unauthorized to view this page.</h1>
      )}
      {ctx.user?.role === "admin" && (
        <div class="card mt-5">
          <div class="card-header">All Data</div>
          <div class="card-body">
            <h5 class="card-title">User Table</h5>
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Password</th>
                  <th scope="col">Account #</th>
                  <th scope="col">Balance</th>
                  <th scope="col">Deposits</th>
                  <th scope="col">Withdrawals</th>
                  <th scope="col">Role</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((user) => (
                  <tr>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.password}</td>
                    <td>{user._id}</td>
                    <td>{user.balance}</td>
                    <td>{JSON.stringify(user.deposits)}</td>
                    <td>{JSON.stringify(user.withdrawals)}</td>
                    <td>{user.role}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteUser(user.email)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllData;
