const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let users = [];

app.post("/signup", (req, res) => {
  const { username, password } = req.body;

  const userExists = users.find(
    (user) => user.username === username
  );

  if (userExists) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  users.push({
    username,
    password,
    balance: 1000,
  });

  res.json({
    message: "Signup successful",
  });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (u) =>
      u.username === username &&
      u.password === password
  );

  if (!user) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  res.json(user);
});

app.post("/deposit", (req, res) => {
  const { username, amount } = req.body;

  const user = users.find(
    (u) => u.username === username
  );

  user.balance += Number(amount);

  res.json({
    balance: user.balance,
  });
});

app.post("/withdraw", (req, res) => {
  const { username, amount } = req.body;

  const user = users.find(
    (u) => u.username === username
  );

  if (user.balance < amount) {
    return res.status(400).json({
      message: "Insufficient balance",
    });
  }

  user.balance -= Number(amount);

  res.json({
    balance: user.balance,
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});