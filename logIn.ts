const jwt = require("jsonwebtoken");
export const logIn = async ({
  client,
  user,
}: {
  client: any;
  user: any;
}): Promise<String> => {
  let token = "";
  
  try {
    const usersDb = client.db("appTest");
    const usersCollection = usersDb.collection("users");
    const res = await usersCollection.findOne(user);
  
    if (res._id) {
      let jwtSecretKey = 'token';
      let data = {
        time: Date(),
        userId: res._id,
      };
      token = jwt.sign(data, jwtSecretKey); 
    }
    return token;
  } catch (error) {
    console.log(`ERROR SIGNUP: ${error}`);
    return (token = JSON.stringify(error));
  }
};
