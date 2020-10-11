import express from "express";
import jwt from "jsonwebtoken";
import passport from "passport";
import { validationResult } from "express-validator";
import { config } from "../store/config";
import { registerValidation, loginValidation } from "../store/utils";
import { User } from "../database/models/index";

const bcrypt = require("bcrypt");
const userController = express.Router();

async function createUser(email, password) {
  password = bcrypt.hashSync(password, 10);
  const user = new User({ email, password });
  const result = await user.save();
  return result;
}

function getUserData(user, email) {
  const token = jwt.sign({ email }, config.passport.secret, {
    expiresIn: 10000000,
  });
  const userToReturn = { ...user.toJSON(), ...{ token } };
  delete userToReturn.password;
  return userToReturn;
}

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
  if (!errorsAfterValidation.isEmpty()) {
    res.status(400).json({
      code: 400,
      errors: errorsAfterValidation.mapped(),
    });
  } else {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        await createUser(email, password);
        const newUser = await User.findOne({ email });
        const userToReturn = getUserData(newUser, email);
        res.status(200).json(userToReturn);
      } else {
        res.status(403).send("User exists already");
      }
    } catch (error) {
      next(error);
    }
  }
});

/**
 * POST/
 * Login a user
 */
userController.post("/login", loginValidation, async (req, res, next) => {
  const errorsAfterValidation = validationResult(req);
  if (!errorsAfterValidation.isEmpty()) {
    res.status(400).json({
      code: 400,
      errors: errorsAfterValidation.mapped(),
    });
  } else {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (user && user.email) {
        const isPasswordMatched = user.comparePassword(password);
        if (isPasswordMatched) {
          const userToReturn = getUserData(user, email);
          res.status(200).json(userToReturn);
        } else {
          res.status(403).send("Password incorrect");
        }
      } else {
        res.status(404).send("User not found");
      }
    } catch (error) {
      next(error);
    }
  }
});

export default userController;
