import { promises as fs } from "fs";
// fs 모듈은 기본적으로 콜백 형식
// promise 형식으로 변환해 주는 방법을 주로 사용함

const ss = "파일로 저장된 문서 🔗";

fs.writeFile("./ex03write.txt", ss)
  .then(() => {
    return fs.readFile("./ex03write.txt");
  })
  .then((data) => {
    console.log(data.toString());
  })
  .catch((err) => {
    console.log("ERROR : " + err);
  });
