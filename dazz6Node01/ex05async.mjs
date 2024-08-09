// fs 모듈은 비동기 처리가 기본
// 결과를 순서대로 출력되도록 하려면 promise 객체 사용

import { promises as fs } from "fs";

console.log("시작");

fs.readFile("./ex03write.txt")
  .then((data) => {
    console.log("1번 ", data.toString());
    return fs.readFile("./ex03write.txt");
  })
  .then((data) => {
    console.log("2번 ", data.toString());
    return fs.readFile("./ex03write.txt");
  })
  .then((data) => {
    console.log("3번 ", data.toString());
    return fs.readFile("./ex03write.txt");
  })
  .catch((err) => {
    console.log("ERROR : " + err);
  });

console.log("끝");
