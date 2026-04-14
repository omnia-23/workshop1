import express from "express";
import cors from "cors";
import { connectDB } from "./DB/connection.js";
// import authRouter from "./modules/auth/auth.controller.js";
// import userRouter from "./modules/user/user.controller.js";

const bootstrap = async () => {
  const app = express();
  app.use(cors());
  app.use(express.json());

  await connectDB();

  app.get("/", (req, res) => {
    res.json("app running");
  });

  // app.use("/auth", authRouter);
  // app.use("/user", userRouter);

  app.use((err, req, res, next) => {
    res
      .status(err.status || 400)
      .json({ err, msg: err.message, stack: err.stack });
  });

  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
};

export default bootstrap;
