// 예외 처리 : node에서 에러 처리 매우 중요
// node는 한 개의 스레드를 사용할 수 있기 때문에 소중히 다뤄야 함
// try ~ catch 구문 활용

import readline from "readline";
import { EventEmitter } from "events";

const myEvent = new EventEmitter();
const inout = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const divide = (a, b) => {
  if (b === 0) {
    throw new Error("0으로 나눌 수 없습니다.");
    // try ~ catch를 사용해서 예외를 처리해 주지 않고 그냥 throw 함
  }
  return a / b;
};

inout.question("첫 번째 숫자 입력 : ", (num1) => {
  inout.question("두 번째 숫자 입력 : ", (num2) => {
    try {
      const a = parseFloat(num1);
      const b = parseFloat(num2);

      if (isNaN(a) || isNaN(b)) {
        throw new Error("숫자를 입력해 주세요.");
      }
      const result = divide(a, b).toFixed(2);
      console.log(`${a} / ${b} = ${result}`);
    } catch (error) {
      console.error("ERROR : " + error.message);
    } finally {
      inout.close();
    }
  });
});
