const express = require("express");
const connect = require("./utils/connect");
const morgan = require("morgan");
const WilderRouter = require('./src/wilder/wilder.router');
// const WilderModel = require("./models/Wilder");
// const WilderControl = require("./controllers/WilderControl");

const app = express();

// Database connection
connect();

const log = (req, res, next) => {
  console.log("You've just logged in !");
  next();
};
// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(log);
app.use(morgan("dev"));


// Routes
app.use('/api/wilder', WilderRouter);
app.get("/", (req, res) => res.send({ message : "Hello World"}));

app.listen(5000, () => console.log("Server started on 5000"));
