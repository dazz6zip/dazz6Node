// express module
// 웹 서버를 생성하는 것과 관련된 기능을 담당하는 프레임워크
// 웹 애플리케이션을 만들기 위한 각종 메소드와 미들웨어 등이 내장되어
// HTTP 모듈만 사용해서 서버를 구성하는 것도 가능하지만, 이 경우엔 코드의 가독성과 확장성이 떨어지는데
// 이를 개선하기 위해 사용하는 것이 바로 Express 모듈이다
// 추가적으로 nodemon 모듈을 사용하여 서버 재시작 없이 코드를 자동 반영 할 수 있다
// npm install --save-dev nodemon
// package.json에 nodemon 등록

import express from "express";
import path from "path";

// 현재 모듈의 파일과 디렉토리 경로 설정시 사용
import { fileURLToPath } from "url";

// -------------------------------------------
// cors 문제 해결용 import
import cors from "cors";
const app = express();
// cors 문제 해결용 app.use(cors())
app.use(cors());

app.set("port", process.env.PORT || 3000);
// 환경변수 PORT가 존재하면 그 값을 사용하고, 존재하지 않으면 3000을 사용

// 현재 폴더를 지정 : __dirname을 ECM(ECMAScript Module)환경에서 사용
const __filename = fileURLToPath(import.meta.url); // 현재 실행 중인 파일 경로
const __dirname = path.dirname(__filename); // 현재 실행 중인 폴더 경로

// -------------------------------------------
// app.get(요청, 라우팅 처리)
app.get("/", (req, res) => {
  res.send("<b style='color: tomato'>~(=^‥^)ノ🍅</b>");
});

app.get("/java", (req, res) => {
  res.send("<b style='color: yellowgreen'>~(=^‥^)ノ☘️</b>");
});

app.get("/node", (req, res) => {
  res.send(
    "<a href='https://cafe.daum.net/flowlife' ><b style='color: hotpink'>~(=^‥^)ノ🍥</b></a>"
  );
});

app.get("/abc", (req, res) => {
  res.sendFile(path.join(__dirname, "abc.html")); // 현재 폴더의 abc.html 호출
});

app.get("/json", (req, res) => {
  res.send({ 이름: "폼폼푸린" });
});

// URL 경로에 정보가 담긴 경우 추출
// ex) http://localhost:3000/sanrio/pompompurin/4
// 참고 : 요청명?변수=값 형태인 경우 req.query로 받음
app.get("/user/:company/:character", (req, res) => {
  const { company, character } = req.params;
  res.send(`${company}의 ${character} 🧸`);
});

// http://localhost:3000/user/winter
app.get("/user/:season", (req, res) => {
  const { season } = req.params;
  if (season === "summer") {
    res.json({ season: "🎐" });
  } else if (season === "winter") {
    res.json({ season: "🎄" });
  } else {
    res.json({ season: "☘️" });
  }
});

app.get("/test", (req, res) => {
  res.sendFile(path.join(__dirname, "test.html")); // 현재 폴더의 abc.html 호출
});

// console.log("SERVER SERVICE...");
// app.listen(3000);

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트로 서비스 중...");
});
