import { EventEmitter } from "events";
import readline from "readline";

const myEvent = new EventEmitter();
const inout = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const printGugudan = (dan) => {
  console.log(`\nᓚᘏᗢ 구구단 ${dan}단 출력\n`);
  for (let i = 1; i < 9; i++) {
    console.log(`${dan} * ${i} = ${dan * i}`);
  }
};

myEvent.on("multiplication", (dan) => {
  printGugudan(dan);
  inout.close();
});

// question(query, callback)
inout.question("단 입력 : ", (input) => {
  const dan = parseInt(input, 10); // 10진수 정수 변환

  if (!isNaN(dan)) {
    myEvent.emit("multiplication", dan);
  } else {
    console.log("숫자만 입력 가능합니다.");
    inout.close();
  }
});
