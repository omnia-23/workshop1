import User from "../../DB/models/user.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../../utils/token.js";

export const registerService = async (data) => {
  const exists = await User.findOne({ email: data.email });
  if (exists) throw new Error("Email already exists");
  data.password = await bcrypt.hash(data.password, 10);
  const user = await User.create(data);

  const token = generateToken({ id: user._id });
  return { user, token };
};

export const loginService = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  console.log({ user });
  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Invalid credentials");

  const token = generateToken({ id: user._id });
  return { user, token };
};
