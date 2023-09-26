import { MongoClient } from "mongodb";
import { userSchema } from "./roles/schemas/user/user_schema";
require("dotenv/config");
export const connectMongoDb = async ()  => {
  const clusterUrl = process.env.CLUSTER_URL ?? "";
  const username = encodeURIComponent("super-admin");
  const password = encodeURIComponent("Coco12345|");
  const uri = `mongodb+srv://${username}:${password}@${clusterUrl}/?retryWrites=true&w=majority`;
  // Create a MongoClient
  const mongoClient = new MongoClient(uri, {});
  // Connect the client to the server
  const client = await mongoClient.connect().then((res)=>res);
  console.log(`main => connectMongoDb CONNECTED `);
//   const usersDb = client.db("appTest", { checkKeys: true });
//   usersDb.createCollection("users", {
//     validator: userSchema,
//   });
  return client;
};
