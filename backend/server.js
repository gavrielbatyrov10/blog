const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");


dotenv.config();

const app = express();
const PORT = 5000; 

app.use(cors());

app.use(express.json());

// Routing

app.use("/auth", require("./auth.js"))
app.use("/blog", require("./post.js"))

app.get("/", (req, res) => {
  res.send("Welcome to the Simple Node.js and Express App!");
});

app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});