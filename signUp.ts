export const signUp = async ({
  client,
  user,
}: {
  client: any;
  user: any;
}): Promise<boolean> => {
  try {
    const usersCollection = client.db("appTest").collection("users");
    const res = await usersCollection.insertOne(user);
    return res;
  } catch (error) {
    console.log(`ERROR SIGNUP: ${error}`);
    return false;
  }
};
