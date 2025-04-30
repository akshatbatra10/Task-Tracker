import bcrypt from "bcrypt";

import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

export const registerUser = async (data) => {
  const { name, email, password, country } = data;

  const existingUser = await User.findOne({ email });

  if (existingUser) throw new Error("User already exists");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    country,
  });

  const token = generateToken(user._id);

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    token,
  };
};

export const loginUser = async (data) => {
  const { email, password } = data;

  const user = await User.findOne({ email });

  if (!user) throw new Error("Invalid Credentials");

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) throw new Error("Invalid Credentials");

  const token = generateToken(user._id);

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    token,
  };
};
