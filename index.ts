import session from "express-session";

require("dotenv/config");
const routes = require("./routes/routes");
const express = require("express");
const cors = require("cors");
const app = express();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
app.use(cors());
app.use(express.json());
app.use(
  session({
    resave: false,
    saveUninitialized:false,
    secret: process.env.PASSWPORT_SECRET ?? "secretPassport",
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/", routes);

let PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is up and running on ${PORT}`);
});
