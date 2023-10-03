const jwt = require("jsonwebtoken");
export const logIn = async ({
  client,
  user,
}: {
  client: any;
  user: any;
}): Promise<String | Object> => {
  let token = "";

  try {
    const usersDb = client.db("appTest");
    const usersCollection = usersDb.collection("users");
    const _user = await usersCollection.findOne(user);

    if (_user.email === user.email && _user.password === user.password) {
      const data = {
        time: Date(),
        user: _user,
      };
      token = jwt.sign({ data }, process.env.JWT_KEY, { expiresIn: "1h" });

      const refreshtoken = jwt.sign({ data }, process.env.JWT_KEY, {
        expiresIn: "24h",
      });
      await usersCollection.updateOne(
        { email: _user.email },
        {
          $set: { jwt: token, refreshjwt: refreshtoken },
        }
      );
    }
    return token;
  } catch (error) {
    console.log(`ERROR SIGNUP: ${error}`);
    return Object(error);
  }
};
