import { registerUser, loginUser } from "../services/authService.js";

export const signup = async (req, res) => {
  try {
    const user = await registerUser(req.body);
    return res.status(201).json(user);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const user = await loginUser(req.body);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
