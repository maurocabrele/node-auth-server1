import { Collection, Db, MongoClient } from "mongodb";

const client = require("mongodb").MongoClient;
export async function dbConnect(): Promise<Db> {
  const clusterUrl = process.env.CLUSTER_URL ?? "";
  const username = encodeURIComponent(process.env.USER_NAME ?? "");
  const password = encodeURIComponent(process.env.USER_PASSWORD ?? "");
  const url = `mongodb+srv://${username}:${password}@${clusterUrl}/?retryWrites=true&w=majority`;
  return await client
    .connect(url)
    .then((res: MongoClient) => res.db("appTest"));
}
