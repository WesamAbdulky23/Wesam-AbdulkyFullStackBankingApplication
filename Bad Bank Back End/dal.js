const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";
let db = null;

// connect to mongo
MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
  console.log("Connected successfully to db server");

  // connect to myproject database
  db = client.db("myproject");
});

// create user account
function create(name, email, isOAuth, password, photoURL = null, role) {
  return new Promise((resolve, reject) => {
    const collection = db.collection("users");
    const doc = {
      name,
      email,
      password,
      isOAuth,
      balance: 0,
      photoURL: photoURL,
      withdrawals: [],
      deposits: [],
      role,
    };
    collection.insertOne(doc, { w: 1 }, function (err, result) {
      err ? reject(err) : resolve(doc);
    });
  });
}

// find user account
function find(email) {
  return new Promise((resolve, reject) => {
    const customers = db
      .collection("users")
      .find({ email: email })
      .toArray(function (err, docs) {
        err ? reject(err) : resolve(docs);
      });
  });
}

// find user account
function findOne(email) {
  return new Promise((resolve, reject) => {
    const customers = db
      .collection("users")
      .findOne({ email: email })
      .then((doc) => resolve(doc))
      .catch((err) => reject(err));
  });
}

// update - deposit/withdraw amount
function update(email, amount) {
  return new Promise((resolve, reject) => {
    if (amount >= 0) {
      const customers = db.collection("users").findOneAndUpdate(
        { email: email },
        {
          $inc: { balance: amount },
          $push: { deposits: amount },
        },
        { returnOriginal: false },
        function (err, documents) {
          err ? reject(err) : resolve(documents);
        }
      );
    } else {
      const customers = db.collection("users").findOneAndUpdate(
        { email: email },
        {
          $inc: { balance: amount },
          $push: { withdrawals: -amount },
        },
        { returnOriginal: false },
        function (err, documents) {
          err ? reject(err) : resolve(documents);
        }
      );
    }
  });
}

// delete
function deleteUser(email) {
  return new Promise((resolve, reject) => {
    const customers = db
      .collection("users")
      .findOneAndDelete({ email: email }, function (err, documents) {
        err ? reject(err) : resolve(documents);
      });
  });
}

// all users
function all() {
  return new Promise((resolve, reject) => {
    const customers = db
      .collection("users")
      .find({})
      .toArray(function (err, docs) {
        err ? reject(err) : resolve(docs);
      });
  });
}

module.exports = { create, findOne, find, update, all, deleteUser };
