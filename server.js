//require("rootpath")();
const express = require("express");
const app = express();
require("dotenv").config();
const config = require("./config.json");
// const cookieParser = require("cookie-parser");
const cors = require("cors");
const errorHandler = require("./_helpers/error-handler");
// const db = require("./_helpers/db");
// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(
  express.urlencoded({ extended: true })
); /* bodyParser.urlencoded() is deprecated */

// app.use(cookieParser());

const APIRoutes = require("./routes/api.route");

// allow cors requests from any origin and with credentials

// var corsOptions = {
//   origin: "http://localhost:8081"
// };
// app.use(cors(corsOptions));

app.use(
  cors({
    origin: (origin, callback) => callback(null, true),
    credentials: true,
  })
);

// api routes
const api = config.API_URL;
app.use(`${api}/`, APIRoutes);

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Restro Application." });
});

// swagger docs route
//app.use("/api-docs", require("_helpers/swagger"));

// global error handler
app.use(errorHandler);

// start server
const port =
  process.env.NODE_ENV === "production" ? process.env.PORT || 80 : 4000;
app.listen(port, () => console.log("Server listening on port " + port));
