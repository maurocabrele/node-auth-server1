import { logIn } from "./logIn";
import { userSchema } from "./roles/schemas/user/user_schema";
import { signUp } from "./signUp";

const express = require("express");
const cors = require("cors"); 
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv/config");
const app = express();
app.use(cors());
app.use(express.json());

const api = process.env.API_URL ?? "";
const clusterUrl = process.env.CLUSTER_URL ?? "";
const username = encodeURIComponent("super-admin");
const password = encodeURIComponent("Coco12345|");
const uri = `mongodb+srv://${username}:${password}@${clusterUrl}/?retryWrites=true&w=majority`;

// Create roles
const roles = [
  {
    role: "admin",
    db: "appTest",
    privileges: ["all"],
  },
  {
    role: "user",
    db: "appTest",
    privileges: [
      {
        resource: { db: "appTest", collection: "users" },
        actions: ["find", "update", "insert", "remove"],
      },
    ],
  },
];

// Create a MongoClient
const client = new MongoClient(uri, {
  // serverApi: {
  //   version: ServerApiVersion.v1,
  //   strict: true,
  //   deprecationErrors: true,
  // },
});
const connectMongoDb = async () => {
  try {
    // Connect the client to the server
    await client.connect();

    // Create test db
    const testDb = client.db("appTest");
    // Create collection users
    // if (testDb.collection("users")===undefined) {
    //   console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
    //  testDb.createCollection("users", { validator: userSchema,  });
    //  const usersDb=testDb.collection("users")
    //  usersDb.createIndex(  {email: 1} , { unique: true } )
    //  }

    console.log(`main => connectMongoDb CONNECTED `);
  } catch (error) {}
};
connectMongoDb();

app.post("/signup", async (req: any, res: any) => {
  const newUser = req.body;
  try {
    const result = await signUp({ client: client, user: newUser });
    if (result["acknowledged"]) {
      res.status(200).send(result);
    } else {
      res.status(500).send(result);
    }
  } catch (error) {
    res.status(401).send(error);
  }
});
app.post("/login", async (req: any, res: any) => {
  const user = req.body;

  try {
    const result = await logIn({ client: client, user: user });
    res.send(result).status(204);
  } catch (error) {
    console.log(`AddUsser Error: ${error}`);
  }
});

let PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is up and running on ${PORT}`);
});
