const express = require("express");
const app = express();
const auth = require("./routes/auth");
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(express.json());
app.use(cookieParser());
app.use(cors());
// Define your server routes and middleware here
app.get("/", (req, res) => {
  res.send("Hello, this is your server!");
});

// App Routes
app.use("/auth", auth);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const startServer = (port) => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

module.exports = {
  start: startServer,
};
