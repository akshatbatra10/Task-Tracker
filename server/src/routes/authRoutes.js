import express from "express";
import { body } from "express-validator";

import { signup, login } from "../controllers/authController.js";
import validateRequest from "../middlewares/validateRequest.js";

const authRouter = express.Router();

authRouter.post(
  "/signup",
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be greater than equal to 6 characters"),
    body("country").trim().notEmpty().withMessage("Country is required"),
  ],
  validateRequest,
  signup
);
authRouter.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Credentials"),
    body("password").notEmpty().withMessage("Invalid Credentials"),
  ],
  validateRequest,
  login
);

export default authRouter;
