import { dbConnect } from "../service/dbAppTest"; 
import { User } from "../models/userModel"; 
import { logIn } from "../service/logIn";
import { signUp } from "../service/signUp";

const router = require("express").Router();

router.post("/login", (req: any, res: any) =>
  dbConnect().then((db) =>
    logIn({ usersDb: db.collection<User>("users"), user: req.body }).then(
      (value: any) =>
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
