import { WithId } from "mongodb";
import { User } from "../../models/userModel";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

export const userVerification = ({
  dbUser,
  inputUser,
}: {
  dbUser: User | null;
  inputUser: User;
}): any => {
  let response = { error: "User not found!" };
  if (dbUser?.email) {
    let a = false;
    (async () => {
      a = await bcrypt.compare(dbUser.password, inputUser.password);
    })();
    response = { error: "Email or password wrong" };
    console.log(`LogIn before return THEN:  ${a}`);

    if (a) {
      const data = {
        time: Date(),
        user: dbUser.email,
      };
      response = jwt.sign({ data }, process.env.JWT_KEY, {
        expiresIn: process.env.JWT_EXPIRACY,
      });

      const refreshtoken = jwt.sign({ data }, process.env.JWT_KEY, {
        expiresIn: process.env.REFRESH_JWT_EXPIRACY,
      });
    }
  }
  return response;
};
