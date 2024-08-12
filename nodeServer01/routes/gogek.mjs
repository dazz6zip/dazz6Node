import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("routes/gogek.mjs");
});

export default router;
