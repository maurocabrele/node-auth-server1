export const signUp =async ({ client, user }: { client: any; user: any }):Promise<boolean> => {
  try {
    const usersDb = client.db("appTest");
    const usersCollection = usersDb.collection("users");
    const res = await usersCollection.insertOne(user); 
    return res.acknowledged;
  } catch (error) {
    console.log(`ERROR SIGNUP: ${error}`);
    return false;
  }
};
