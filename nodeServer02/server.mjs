import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

/* express 객체 생성 */
const app = express();

/* 현재 파일(app.mjs)의 경로 부여 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* cors 미들웨어 추가 */
app.use(cors());

/* json 파싱 미들웨어 추가 */
app.use(express.json());

/* 정적 데이터를 불러오기 위한 지정 */
app.use(express.static(path.join(__dirname, "public")));

let datas = [
  { id: 1, name: "폼폼푸린", position: "멋쟁이" },
  { id: 2, name: "쿠로미", position: "바보" },
];

let nextid = 3; // 새로운 직원이 추가될 때 id 증가용

app.get("/", (req, res) => {
  res.send("🍅<br/>/emp<br/>/emp/1<br/>/abc.html");
});

// 전체 자료 읽기
app.get("/emp", (req, res) => {
  res.json(datas);
});

// 개별 자료 읽기
app.get("/emp/:id", (req, res) => {
  const emp = datas.find((e) => e.id === parseInt(req.params.id, 10));
  if (!emp) {
    return res.status(404).send("해당 자료 없음");
  }
  res.json(emp);
});

// 자료 추가
app.post("/emp", (req, res) => {
  const newEmp = {
    id: nextid++,
    name: req.body.name,
    position: req.body.position,
  };
  datas.push(newEmp);
  res.status(201).json(newEmp);
});

// 자료 수정
app.put("/emp/:id", (req, res) => {
  console.log(req.body);
  const emp = datas.find((e) => e.id === parseInt(req.params.id, 10));
  if (!emp) {
    return res.status(404).send("해당 자료 없음");
  }

  // 새 데이터가 있으면 덮어씌우고, 없으면 기존 자료 유지
  emp.name = req.body.name || emp.name;
  emp.position = req.body.position || emp.position;

  res.json(emp);
});

// 자료 삭제
app.delete("/emp/:id", (req, res) => {
  // console.log(req.params.id);

  const empIndex = datas.findIndex(
    (emp) => emp.id === parseInt(req.params.id),
    10
  );
  if (empIndex === -1) {
    return res.status(404).send("해당 자료 없음");
  }

  const delEmp = datas.splice(empIndex, 1);

  res.json(delEmp);
});

/* 기존 포트가 있으면 기존 포트 사용, 없으면 3000번 포트 사용 */
app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트로 서버 서비스 중...\n");
});
