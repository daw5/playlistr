require("dotenv").config();
import express from "express";

const mailingController = express.Router();

mailingController.post("/send-verification-email", (req, res) => {});

export default mailingController;
