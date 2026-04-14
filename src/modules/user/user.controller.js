import { Router } from "express";
import axios from "axios";
import User from "../../DB/models/user.model.js";

const userRouter = Router();

userRouter.post("/", async (req, res) => {
  const { f_name, l_name, email, password, skills } = req.body;
  // const user = new User(req.body);
  // await user.save();

  const user = await User.create(req.body);
  res.json({ user });
});

userRouter.get("/", async (req, res) => {
  const users = await User.find({
    email: "omniaa39@gmail.com",
  })
    // .limit(10)
    // .skip(0)
    .select("-password");
  res.json({ users });
});

userRouter.put("/:id", async (req, res) => {
  const id = req.params.id;
  console.log({ id });
  const { f_name, l_name, age } = req.body;

  const user = await User.findByIdAndUpdate(
    id,
    { f_name, l_name, age },
    {
      new: true, // updated version
      runValidators: true,
    },
  );

  res.json({ user });
});

userRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  console.log({ id });

  const user = await User.findByIdAndUpdate(
    id,
    { deleted_at: Date.now() },
    {
      new: true, // updated version
      runValidators: true,
    },
  );

  res.json({ user });
});

export default userRouter;
