import express from "express";
// import { Types } from "mongoose";
import mongoose from "mongoose";
import auth from "./auth.js";
import Contact from "./contact.model.js";

const contactsRouter = express.Router();

// GET ALL
contactsRouter.get("/", async (_, res) => {
  // POUR AFFINER LE RÉSULTAT => .select()
  const contacts = await Contact.find().select("name phone email owner");
  // const contacts = await Contact.find();
  return res.send(contacts);
});

// CREATE
contactsRouter.post("/", auth, async (req, res) => {
  const contact = new Contact(req.body);
  contact.owner = req.user._id;
  await contact.save();
  return res.send(contact);
});

// GET BY ID
contactsRouter.get("/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.sendStatus(404);
  }
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    return res
      .status(404)
      .send(`Le contact avec l'id ${req.params.id} n'existe pas.`);
  }
  return res.send(contact);
});

// UPDATE
contactsRouter.patch("/:id", auth, async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.sendStatus(404);
  }
  // if (!Types.ObjectId.isValid(req.params.id)) {
  //   return res.sendStatus(404);
  // }
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    return res
      .status(404)
      .send(`Le contact avec l'id ${req.params.id} n'existe pas.`);
  }
  // Avec cette approche pas besoin de findById avant
  // const updatedContact = await Contact.findByIdAndUpdate(
  //   req.params.id,
  //   req.body,
  //   { new: true }
  // );
  // return res.send(updatedContact);

  // En réutilisant le résultat de findById
  for (let attr in req.body) {
    contact[attr] = req.body[attr];
  }
  await contact.save();
  return res.send(contact);
});
contactsRouter.delete("/:id", auth, async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.sendStatus(404);
  }
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    return res
      .status(404)
      .send(`Le contact avec l'id ${req.params.id} n'existe pas.`);
  }
  // _id => clé id dans mongoDB
  await Contact.deleteOne({ _id: req.params.id });
  return res.send("Contact supprimé avec succès !");
});

export default contactsRouter;
