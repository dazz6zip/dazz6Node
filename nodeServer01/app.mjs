import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import gogekRouter from "./routes/gogek.mjs";
import jikwonRouter from "./routes/jikwon.mjs";

/* express 객체 생성 */
const app = express();

/* cors 미들웨어 추가 */
app.use(cors());
// cors 해킹에서 벗어남 (동일 출처 정책 에러 해결)

/* json 파싱 미들웨어 추가 */
app.use(express.json());
// 클라이언트가 json 데이터를 요청(post)으로 보낼 때
// 예) {"name" : "tom", "age" : 30} 를 자동으로 파싱해 req.body 객체를 만듦
// req.body.name 또는 req.body.age로 접근 가능

/* 기존 포트가 있으면 기존 포트 사용, 없으면 3000번 포트 사용 */
app.set("port", process.env.PORT || 3000);

/* 현재 파일(app.mjs)의 경로 부여 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* 정적 파일 제공 폴더 정의 */
app.use(express.static(path.join(__dirname, "public")));

// app.get("/", (req, res) => {
//   res.send("🧸");
// });

/* 더이상의 요청이 없을 경우 */
app.use("/", jikwonRouter);

/* gogek 요청이 있을 경우 */
app.use("/gogek", gogekRouter);

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트로 서버 서비스 중...\n");
});
