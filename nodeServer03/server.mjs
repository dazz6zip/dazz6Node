import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import pool from "./db.mjs";

/* 현재 파일(app.mjs)의 경로 부여 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* express 객체 생성 */
const app = express();

/* cors 미들웨어 추가 */
app.use(cors());

/* json 파싱 미들웨어 추가 */
app.use(express.json());

/* 기존 포트가 있으면 기존 포트 사용, 없으면 3000번 포트 사용 */
app.set("port", process.env.PORT || 3000);

/* 정적 데이터를 불러오기 위한 지정 */
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send("🍥");
  // 요청 예정 : /sangdata, /sangdata/2
});

// 전체 자료 읽기
app.get("/sangdata", async (req, res) => {
  try {
    // MariadDB 커넥션 풀에서 DB 와 연결하는 비동기 함수
    const conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM sangdata");
    conn.release(); // 연결 해제
    console.log(rows);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 개별 자료 읽기
app.get("/sangdata/:code", async (req, res) => {
  const { code } = req.params;
  let sql = "SELECT * FROM sangdata WHERE code = ?";
  try {
    // MariadDB 커넥션 풀에서 DB 와 연결하는 비동기 함수
    const conn = await pool.getConnection();
    const rows = await conn.query(sql, [code]);

    conn.release(); // 연결 해제

    if (rows.length === 0) {
      return res.status(404).json({ error: "DATA NOT FOUNT" });
    }

    console.log(rows);
    res.json(rows[0]);
    // 해당하는 자료가 한 개라서 row[0] 으로 조회함
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 자료 추가
app.post("/sangdata", async (req, res) => {
  const { code, sang, su, dan } = req.body;
  let sql = "INSERT INTO sangdata(code, sang, su, dan) VALUES (?, ?, ?, ?)";
  try {
    const conn = await pool.getConnection();
    await conn.query(sql, [code, sang, su, dan]);

    conn.release(); // 연결 해제
    res.status(201).json({ code, sang, su, dan });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 자료 수정
app.put("/sangdata/:code", async (req, res) => {
  const { code } = req.params;
  const { sang, su, dan } = req.body;
  let sql = "UPDATE sangdata SET sang = ?, su = ?, dan = ? WHERE code = ?";
  try {
    const conn = await pool.getConnection();
    const result = await conn.query(sql, [sang, su, dan, code]);

    conn.release(); // 연결 해제

    if (result.affectedRows === 0) {
      // 수정이 없을 경우
      return res.status(404).json({ error: "UPDATE DATA NOT FOUNT" });
    }

    res.status(201).json({ code, sang, su, dan });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 자료 삭제
app.delete("/sangdata/:code", async (req, res) => {
  const { code } = req.params;
  let sql = "DELETE FROM sangdata WHERE code = ?";
  try {
    const conn = await pool.getConnection();
    const result = await conn.query(sql, code);

    conn.release(); // 연결 해제

    if (result.affectedRows === 0) {
      // 수정이 없을 경우
      return res.status(404).json({ error: "DELETE DATA NOT FOUNT" });
    }

    res.json({ message: "DELETE SUCCESS" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트로 서버 서비스 중...\n");
});
