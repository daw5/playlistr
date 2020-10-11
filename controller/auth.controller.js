import express from "express";
import passport from "passport";
import { AuthService } from "../services/index";
import { validationResult } from "express-validator";
import { registerValidation, loginValidation } from "../store/validators";
import { User } from "../database/models/index";

const authController = express.Router();
const authService = new AuthService();

/**
 * GET/
 * retrieve and display all Users in the User Model
 */
authController.get(
  "/test",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.find({}, (err, result) => {
      res.status(200).json({
        data: result,
      });
    });
  }
);

/**
 * POST/
 * Register a user
 */
authController.post("/register", registerValidation, async (req, res, next) => {
  const errorsAfterValidation = validationResult(req);
  if (!errorsAfterValidation.isEmpty())
    return res.status(400).json(errorsAfterValidation.mapped());
  try {
    const { email, password } = req.body;
    const newUser = await authService.Register(email, password);
    return newUser
      ? res.status(200).json(newUser)
      : res.status(403).send("User exists already");
  } catch (error) {
    next(error);
  }
});

/**
 * POST/
 * Login a user
 */
authController.post("/login", loginValidation, async (req, res, next) => {
  const errorsAfterValidation = validationResult(req);
  if (!errorsAfterValidation.isEmpty())
    return res.status(400).json(errorsAfterValidation.mapped());
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && user.email) {
      const userToReturn = await authService.Authenticate(user, password);
      return userToReturn
        ? res.status(200).send(userToReturn)
        : res.status(403).send("Authentication failed");
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    next(error);
  }
});

export default authController;
