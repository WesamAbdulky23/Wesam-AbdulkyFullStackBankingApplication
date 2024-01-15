var express = require("express");
var app = express();
var cors = require("cors");
var dal = require("./dal.js");
const corsOptions = require("./corsOptions.js");

app.use(cors(corsOptions));
app.use(express.json());

// create user account
app.get(
  "/account/create/:name/:email/:isOAuth/:password/:role/:photoURL?",
  function (req, res) {
    // check if account exists
    dal.find(req.params.email).then((users) => {
      // if user exists, return error message
      if (users.length > 0) {
        console.log("User already in exists");
        res.send("User already in exists");
      } else {
        // else create user
        dal
          .create(
            req.params.name,
            req.params.email,
            req.params.isOAuth,
            req.params.password,
            req.params.photoURL,
            req.params.role
          )
          .then((user) => {
            console.log(user);
            res.send(user);
          });
      }
    });
  }
);

// login user
app.get("/account/login/:email/:password", function (req, res) {
  dal.find(req.params.email).then((user) => {
    // if user exists, check password
    if (user.length > 0) {
      if (user[0].isOAuth == "true") {
        res.send({ errorMessage: "Sign in using Google instead." });
      } else if (user[0].password === req.params.password) {
        res.send(user[0]);
      } else {
        res.send({ errorMessage: "Login failed: wrong password" });
      }
    } else {
      res.send({ errorMessage: "Login failed: user not found" });
    }
  });
});

// find user account
app.get("/account/find/:email", function (req, res) {
  dal.find(req.params.email).then((user) => {
    console.log(user);
    res.send(user);
  });
});

// find one user by email - alternative to find
app.get("/account/findOne/:email", function (req, res) {
  dal.findOne(req.params.email).then((user) => {
    console.log(user);
    res.send(user);
  });
});
app.get("/account/deleteUser/:email", function (req, res) {
  dal.deleteUser(req.params.email).then((data) => {
    console.log(data);
    res.send(data);
  });
});

// update - deposit/withdraw amount
app.get("/account/update/:email/:amount", function (req, res) {
  var amount = Number(req.params.amount);

  if (amount < 0) {
    let balance = 0;

    dal.findOne(req.params.email).then((data) => {
      balance = data.balance;

      if (balance + amount < 0) {
        res.send({
          errorMessage: `You don't have enough funds. Your balance is ${balance}.`,
        });
      } else {
        dal.update(req.params.email, amount).then((response) => {
          console.log(response);
          res.send(response);
        });
      }
    });
  } else {
    dal.update(req.params.email, amount).then((response) => {
      console.log(response);
      res.send(response);
    });
  }
});

// all accounts
app.get("/account/all", function (req, res) {
  dal.all().then((docs) => {
    console.log(docs);
    res.send(docs);
  });
});

var port = "3000";
app.listen(process.env.PORT || 3000, "0.0.0.0", () => {
  console.log("Server is running.");
});
console.log("Running on port: " + port);
