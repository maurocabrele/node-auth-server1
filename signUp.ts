export const signUp = async ({
  client,
  user,
}: {
  client: any;
  user: any;
}): Promise<any> => {
  try {
    const usersCollection = client.db("appTest").collection("users");
    const res = await usersCollection.insertOne(user);
    console.log(`SUCCESS SIGNUP: ${ JSON.stringify(res)}`);
    return res;
  } catch (error) {
    
    console.log(`ERROR SIGNUP: ${ JSON.stringify(error)}`);
    return error;
  }
};
