// 동기와 비동기 메소드
// setTimeout 등은 비동기 처리
// fs 모듈의 경우에도 그런 메소드를 다수 가지고 있음
// fs 모듈은 기본적으로 비동기 처리

import { readFile } from "fs";

readFile("./ex03write.txt", (err, data) => {
  if (err) {
    throw err;
  }
  console.log("1번 " + data.toString());
});

readFile("./ex03write.txt", (err, data) => {
  if (err) {
    throw err;
  }
  console.log("2번 " + data.toString());
});

readFile("./ex03write.txt", (err, data) => {
  if (err) {
    throw err;
  }
  console.log("3번 " + data.toString());
});

console.log();
