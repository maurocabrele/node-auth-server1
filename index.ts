import { signUp } from "./signUp";

require("dotenv/config");
const routes = require("./routes/routes");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/", routes); 

let PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is up and running on ${PORT}`);
});
