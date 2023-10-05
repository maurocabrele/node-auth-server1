import { Collection, WithId } from "mongodb";
import { User } from "./models/userModel";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

export const logIn = async ({
  usersDb,
  user,
}: {
  usersDb: Collection<User>;
  user: WithId<User>;
}): Promise<String | Map<string, string>> => {
  let response;

  try {
    const _user: User | null = await usersDb.findOne({ email: user.email });

    if (_user) {
      const result = await bcrypt.compare(user.password, _user?.password);
      if (result) {
        const data = {
          time: Date(),
          user: _user.email,
        };
        response = jwt.sign({ data }, process.env.JWT_KEY, {
          expiresIn: process.env.JWT_EXPIRACY,
        });
        const refreshtoken = jwt.sign(data, process.env.JWT_KEY, {
          expiresIn: process.env.REFRESH_JWT_EXPIRACY,
        });
        await usersDb.updateOne(
          {
            email: _user.email,
          },
          {
            $set: { jwt: response, refreshjwt: refreshtoken },
          }
        );
      } else {
        response = { error: "Email or password wrong" };
      }
    }
    return response;
  } catch (error: any) {
    throw Error(error);
  }
};
