const express = require("express");
const dotenv = require("dotenv");


dotenv.config();

const app = express();
const PORT = 5000; 


app.use(express.json());

// Routing
app.use("/auth", require("./auth.js"))

app.get("/", (req, res) => {
  res.send("Welcome to the Simple Node.js and Express App!");
});

app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});