// http 모듈을 이용해 웹 서버 구축 가능

// 웹 관련 모듈 import
import http from "http";

http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
    res.write("<h2>NODE SERVER</h2>");
    res.write("🍅");
    res.end("<p>~(=^‥^)ノ</p>");
  })
  .listen(8080, () => {
    console.log("Server service...");
  });
