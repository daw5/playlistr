import express from "express";
import passport from "passport";
import { AuthService, UserService } from "../services/index";
import { validationResult } from "express-validator";
import { registerValidation, loginValidation } from "../store/validators";

require("dotenv").config();

const authController = express.Router();
const authService = new AuthService();
const userService = new UserService();

authController.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    try {
      res.status(200).send(req.user);
    } catch {
      next(error);
    }
  }
);

authController.get("/verify-account/:userId/:code", async (req, res, next) => {
  try {
    const { userId, code } = req.params;
    const accountVerified = await authService.confirmAccountVerification(
      userId,
      code
    );
    return accountVerified
      ? res.status(200).json("Account has been verified")
      : res.status(403).send("Account Verification Failed");
  } catch (error) {
    next(error);
  }
});

authController.post("/register", registerValidation, async (req, res, next) => {
  const errorsAfterValidation = validationResult(req);
  if (!errorsAfterValidation.isEmpty())
    return res.status(400).json(errorsAfterValidation.mapped());
  try {
    const { email, password } = req.body;
    const newUser = await authService.register(email, password);
    return newUser
      ? res.status(200).json("Verification link sent")
      : res.status(403).send("User exists already");
  } catch (error) {
    next(error);
  }
});

authController.post("/login", loginValidation, async (req, res, next) => {
  const errorsAfterValidation = validationResult(req);
  if (!errorsAfterValidation.isEmpty())
    return res.status(400).json(errorsAfterValidation.mapped());
  try {
    const { email, password } = req.body;
    const user = await userService.findUserByEmail(email);
    if (user && user.email) {
      const token = await authService.authenticate(user, password);
      if (token) {
        res.cookie("token", token, {
          httpOnly: true,
          secure: process.env.ENV === "Prod" ? true : false,
        });
        res.status(200).send(user);
      } else {
        res.status(403).send("Authentication failed");
      }
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    next(error);
  }
});

export default authController;
