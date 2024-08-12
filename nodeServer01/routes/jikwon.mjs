import { Router } from "express";
import path from "path";
import { fileURLToPath } from "url";

const router = Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get("/", (req, res) => {
  //   res.send("routes/jikwon.mjs");
  res.sendFile(path.join(__dirname, "../public/abc.html"));
});

const employees = [
  { id: 1, name: "유비" },
  { id: 2, name: "관우" },
  { id: 3, name: "장비" },
];

router.get("/employees", (req, res) => {
  res.json(employees);
});

router.post("/employees", (req, res) => {
  const newEmployee = req.body;
  if (!newEmployee || !newEmployee.name) {
    return res.status(400).json({ error: "Wrong" });
  }

  employees.push(newEmployee);
  res.status(201).json(newEmployee);
  // status 201 => created 요청은 성공
  // post 요청 후 새로운 resourse가 생성되었을 때 사용
});

export default router;
