import express from "express";
import Contact from "./contact.model.js";

const contactsRouter = express.Router();

contactsRouter.get("/", async (_, res) => {
  // POUR AFFINER LE RÉSULTAT => .select()
  const contacts = await Contact.find().select("name phone email");
  // const contacts = await Contact.find();
  return res.send(contacts);
});
contactsRouter.post("/", async (req, res) => {
  const contact = new Contact(req.body);
  await contact.save();
  return res.send(contact);
});
contactsRouter.get("/:ids", async (req, res) => {});
contactsRouter.patch("/:id", async (req, res) => {});
contactsRouter.delete("/:id", async (req, res) => {});

export default contactsRouter;
