import express from "express";
import session from "express-session"; // 세션
import bodyParser from "body-parser"; // 요청 본문 파싱
import path from "path"; // 경로 조작
import { fileURLToPath } from "url"; // url을 파일 경로로 변경

// 파일 요청시 기본으로 있어야 함
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// express 모듈 객체 생성
const app = express();
const PORT = 3000;

// bodyParser.urlencoded() 미들웨어 설정
// 주로 전송된 form data를 파싱
app.use(bodyParser.urlencoded({ extended: true }));

// session 미들웨어 설정
app.use(
  session({
    secret: "secret-key", // 세션 암호화를 위한 비밀 키
    resave: false, // true : 세션이 수정되지 않은 경우에도 세션을 다시 설정
    saveUninitialized: true, // 초기화되지 않은 저장 여부
    cookie: { maxAge: 30 * 60 * 1000 }, // 세션 유효 시간 (30분)
  })
);

// template 엔진 설정
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const auth = { id: "kor", password: "111" };

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "login.html"));
});

app.post("/login", (req, res) => {
  const { id, password } = req.body;

  if (id === auth.id && password === auth.password) {
    req.session.user = id;
    // express session 모듈을 사용하여 세션에 사용자 아이디 저장

    res.redirect("/main");
    // 로그인 성공시 메인 페이지로 redirection
  } else {
    res.send("로그인 실패 <br/><a href='/'>다시 로그인</a>");
  }
});

app.get("/main", (req, res) => {
  // 사용자가 로그인한 경우 main.ejs 호출
  if (req.session.user) {
    res.render("main", { sessionID: req.sessionID });
  } else {
    res.send("접근 권한 없음 <br/><a href='/'>로그인</a>");
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect("/main");
    }
  });

  res.clearCookie("connect.sid"); // 세션 쿠키 삭제
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`SERVER SERVICE... ~ http://localhost:${PORT}\n`);
});
