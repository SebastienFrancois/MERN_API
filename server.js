const express = require("express");
const connect = require('./connect');
const WilderModel = require("./models/Wilder");
const app = express();

// Database connection
connect();

// Middleware
app.use(express.urlencoded({ extended : true }));
app.use(express.json());


// app.get("/", (req, res) => {
//   res.send("hello world");
//   WilderModel.init().then(() => {
//     const firstWilder = new WilderModel({
//       name: "First Wilder",
//       city: "San Francisco",
//       skills: [
//         { title: "HTML", votes: 10 },
//         { title: "React", votes: 5 },
//       ],
//     });
//     firstWilder
//       .save()
//       .then((result) => {
//         console.log("success:", result);
//       })
//       .catch((err) => {
//         console.log("error:", err);
//       });
//   });
// });

app.listen(3000, () => console.log("Server started on 3000"));
