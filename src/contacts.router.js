import express from "express";
// import { Types } from "mongoose";
import Types from "mongoose";
import Contact from "./contact.model.js";

const contactsRouter = express.Router();

// GET ALL
contactsRouter.get("/", async (_, res) => {
  // POUR AFFINER LE RÉSULTAT => .select()
  const contacts = await Contact.find().select("name phone email");
  // const contacts = await Contact.find();
  return res.send(contacts);
});

// CREATE
contactsRouter.post("/", async (req, res) => {
  const contact = new Contact(req.body);
  await contact.save();
  return res.send(contact);
});

// GET BY ID
contactsRouter.get("/:id", async (req, res) => {
  if (!Types.isValidObjectId(req.params.id)) {
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
contactsRouter.patch("/:id", async (req, res) => {
  if (!Types.isValidObjectId(req.params.id)) {
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
contactsRouter.delete("/:id", async (req, res) => {});

export default contactsRouter;
