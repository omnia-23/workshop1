import Joi from "joi";
import express from "express";
import * as authService from "./auth.service.js";
import { upload } from "../middleware/uploadImage.js";

router.post("/login", async (req, res) => {
  try {
    const data = await authService.loginService(req.body);
    res.status(200).json({ message: "Login success", data });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
