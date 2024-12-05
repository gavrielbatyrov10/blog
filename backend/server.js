const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");


dotenv.config();

const app = express();
const PORT = 5000; 

app.use(cors());

app.use(express.json({ limit: "10mb" })); 
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Routing

app.use("/auth", require("./auth.js"))
app.use("/blog", require("./post.js"))

app.get("/", (req, res) => {
  res.send("Welcome to the Simple Node.js and Express App!");
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});