import { signUp } from "./signUp";

const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv/config");
const app = express();
app.use(cors());
app.use(express.json());

const api: string = process.env.API_URL ?? "";
const clusterUrl: string = process.env.CLUSTER_URL ?? "";
const username = encodeURIComponent("super-admin");
const password = encodeURIComponent("Coco12345|");
const uri = `mongodb+srv://${username}:${password}@${clusterUrl}/?retryWrites=true&w=majority`;

// Create a MongoClient
const client = new MongoClient(uri);
const connectMongoDb = async () => {
  try {
    // Connect the client to the server
    client.connect();
    // Send a ping to confirm a successful connection
    client.db("admin").command({ ping: 1 });
  } catch (error) {}
};

const main = () => {
  try {
    connectMongoDb();
  } catch (error) {
    console.log(`main => connectMongoDb: ${error}`);
  } finally {
    // await client.close();
  }
};
//Run the main function
main();
app.post("/register", (req: any, res: any) => {
  const newUser = req.body;
  try {
    const result = signUp({ client: client, user: newUser });
    res.send(result).status(204);
  } catch (error) {
    console.log(`AddUsser Error: ${error}`);
  }
});
app.get("/login", (req: any, res: any) => {
  res.json({ message: "User logged" });
});
app.post("/user/generateToken", (req: any, res: any) => {
  // Validate User Here
  // Then generate JWT Token
  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  let data = {
    time: Date(),
    userId: 1,
  };
  const token = jwt.sign(data, jwtSecretKey);
  res.send({ message: token });
});
let PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is up and running on ${PORT}`);
});
