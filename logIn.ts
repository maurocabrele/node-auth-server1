const jwt = require("jsonwebtoken");
export const logIn = async ({
  client,
  user,
}: {
  client: any;
  user: any;
}): Promise<String> => {
  try {
    const usersDb = client.db("appTest");
    const usersCollection = usersDb.collection("users");
    const res = await usersCollection.findOne(user);
    console.log(`LOGIN: ${res}`);
    // if (res.acknowledged) {
    //   let jwtSecretKey = process.env.JWT_SECRET_KEY;
    //   let data = {
    //     time: Date(),
    //     userId: 1,
    //   };
    //   const token = jwt.sign(data, jwtSecretKey);
    // }
    return "res";
  } catch (error) {
    console.log(`ERROR SIGNUP: ${error}`);
    return "false";
  }
};
