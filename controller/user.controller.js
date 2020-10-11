import express from "express";
import passport from "passport";
import { validationResult } from "express-validator";
import { registerValidation, loginValidation } from "../store/utils";
import { User } from "../database/models/index";
import UserService from "../services/UserService";

const userController = express.Router();
const userService = new UserService();

/**
 * GET/
 * retrieve and display all Users in the User Model
 */
userController.get(
  "/",
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
userController.post("/register", registerValidation, async (req, res, next) => {
  const errorsAfterValidation = validationResult(req);
  if (!errorsAfterValidation.isEmpty())
    return res.status(400).json(errorsAfterValidation.mapped());
  try {
    const { email, password } = req.body;
    const newUser = await userService.Register(email, password);
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
userController.post("/login", loginValidation, async (req, res, next) => {
  const errorsAfterValidation = validationResult(req);
  if (!errorsAfterValidation.isEmpty())
    return res.status(400).json(errorsAfterValidation.mapped());
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && user.email) {
      const userToReturn = await userService.Authenticate(user, password);
      return userToReturn
        ? res.status(200).send(userToReturn)
        : res.status(403).send("Password Incorrect");
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    next(error);
  }
});

export default userController;
