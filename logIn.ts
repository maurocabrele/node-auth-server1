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
    const _user = await usersCollection.findOne(user);

    if (_user._id) {
      const data = {
        time: Date(),
        user: _user,
      };
      token = jwt.sign({ data }, process.env.JWT_KEY, {
        expiresIn: process.env.JWT_EXPIRACY,
      });
      console.log(`SUCCESS LOGIN: ${token}`);
    }
    return token;
  } catch (error) {
    console.log(`ERROR SIGNUP: ${error}`);
    return (token = JSON.stringify(error));
  }
};
