import express from "express";
import User from "./user.model.js";
import bcrypt from "bcrypt";
import _ from "lodash";

const usersRouter = express.Router();

usersRouter.post("/signup", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return res
      .status(400)
      .send(`Un utilisateur avec l'email ${req.body.email} existe déjà.`);
  }
  const newUser = new User(req.body);
  newUser.password = await bcrypt.hash(req.body.password, 10);
  await newUser.save();
  return res.status(201).send(_.pick(newUser, ["name", "email"]));
});

usersRouter.post("/auth", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).send(`Email ou mot de passe incorrect.`);
  }
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(404).send(`Email ou mot de passe incorrect.`);
  }
  const token = user.generateAuthToken();
  return res.send({ acces_token: token });
});

export default usersRouter;
