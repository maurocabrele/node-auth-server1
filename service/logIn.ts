import { Collection, WithId } from "mongodb";
import { User } from "../models/userModel";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

export const logIn = async ({
  usersDb,
  user,
}: {
  usersDb: Collection<User>;
  user: WithId<User>;
}): Promise<any> => {
  var response = { error: "User not found!" };

  try {
    const _userDb = await usersDb.findOne<User>({ email: user.email });
    if (_userDb?.firstName) {
      response = { error: "Email or password wrong" };
      const verification: boolean = bcrypt.compareSync(
        user.password,
        _userDb?.password
      );

      if (verification) {
        const data = {
          time: Date(),
          user: _userDb.email,
        };
        response = jwt.sign({ data }, process.env.JWT_KEY, {
          expiresIn: process.env.JWT_EXPIRACY,
        });

        const refreshtoken = jwt.sign({ data }, process.env.JWT_KEY, {
          expiresIn: process.env.REFRESH_JWT_EXPIRACY,
        });

        (async () => {
          await usersDb.updateOne(
            {
              email: _userDb.email,
            },
            {
              $set: { jwt: response, refreshjwt: refreshtoken },
            }
          ).then(()=>{console.log(`await usersDb.updateOne`)});
        })();
      }
    }
    return response;
  } catch (error) {
    return response;
  }
};
