const express = require("express");
const connect = require("./connect");
const WilderModel = require("./models/Wilder");
const WilderControl = require("./controllers/WilderControl");
const app = express();

// Database connection
connect();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.post("/api/wilder/create", WilderControl.create);
app.get("/api/wilder/read", WilderControl.retrieve);
app.put("/api/wilder/update", WilderControl.update);
app.delete("/api/wilder/:id/delete", WilderControl.delete);

app.listen(3000, () => console.log("Server started on 3000"));
