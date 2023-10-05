import { dbConnect } from "../service/dbAppTest";
import { logIn } from "../logIn";
import { User } from "../models/userModel";
import { signUp } from "../signUp";

const router = require("express").Router();

router.post("/login", (req: any, res: any) =>
  dbConnect().then((db) =>
    logIn({ usersDb: db.collection<User>("users"), user: req.body }).then(
      (value) =>
        typeof value === "string"
          ? res.status(200).send(value)
          : res.status(500).send(value)
    )
  )
);

router.post("/signup", (req: any, res: any) =>
  dbConnect().then((db) =>
    signUp({ usersDb: db.collection<User>("users"), user: req.body })
  )
);

module.exports = router;
