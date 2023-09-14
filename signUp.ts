export const signUp = ({ client, user }: { client: any; user: any }) => {
  try {
    const usersDb = client.db("authentication");
    const usersCollection = usersDb.collection("users");

    const res = usersCollection.insertOne(user);

    return res;
  } catch (error) {
    console.log(`ERROR connectMongoDb: ${error}`);
  }
};
