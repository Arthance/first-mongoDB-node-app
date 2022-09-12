import express from "express";

const contactsRouter = express.Router();

contactsRouter.get("/", async (req, res) => {});
contactsRouter.post("/", async (req, res) => {});
contactsRouter.get("/:ids", async (req, res) => {});
contactsRouter.patch("/:id", async (req, res) => {});
contactsRouter.delete("/:id", async (req, res) => {});

export default contactsRouter;
