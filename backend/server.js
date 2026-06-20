const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.log("MongoDB Error:", err);
});

// Schema
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    balance: Number
});
const User = require("./models/User");

// SIGNUP
app.post("/signup", async (req, res) => {
    const { username, password, balance } = req.body;

    const user = new User({ username, password, balance });
    await user.save();

    res.json({ message: "User created" });
});

// LOGIN
app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username, password });

    if (!user) {
        return res.json({ user: null });
    }

    res.json({ user });
});

// DEPOSIT
app.post("/deposit", async (req, res) => {
    const { username, amount } = req.body;

    const user = await User.findOne({ username });

    user.balance += amount;
    await user.save();

    res.json({ balance: user.balance });
});

// WITHDRAW
app.post("/withdraw", async (req, res) => {
    const { username, amount } = req.body;

    const user = await User.findOne({ username });

    if (amount > user.balance) {
        return res.json({ error: "Insufficient balance" });
    }

    user.balance -= amount;
    await user.save();

    res.json({ balance: user.balance });
});
app.get("/", (req, res) => {
    res.send("Backend Running");
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});