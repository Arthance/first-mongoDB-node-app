import express from "express";
import cors from "cors";
import contactsRouter from "./contacts.router.js";
import usersRouter from "./users.router.js";

const PORT = process.env.PORT || 3000;

export default function loader(app) {
  app.use(express.json());
  app.use(cors());
  app.use("/api/contacts", contactsRouter);
  app.use("/api/users", usersRouter);
  app.listen(PORT, () => {
    console.log(`Le serveur a démarré sur le port ${PORT} 🚀`);
  });
}
