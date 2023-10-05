import { Collection } from "mongodb";
import { User } from "./models/userModel";

export const signUp = async ({
  usersDb,
  user,
}: {
  usersDb: Collection<User>;
  user: User;
}): Promise<any> => {
  const bcrypt = require("bcryptjs");
  const saltRounds = 1;
  const _password = await bcrypt
    .hash(user.password, process.env.SALT_ROUDS)
    .then((hash: string) => hash);
  user.password = _password;
  try { 
    const res = await usersDb.insertOne(user);
    console.log(`SUCCESS SIGNUP: ${JSON.stringify(res)}`);
    return res;
  } catch (error) {
    console.log(`ERROR SIGNUP 000: ${JSON.stringify(error)}`);
    return error;
  }
};
