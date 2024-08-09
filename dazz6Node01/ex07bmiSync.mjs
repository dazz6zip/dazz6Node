// BMI 동기 방식으로 처리
// readline-sync 모듈 설치 필요

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const readlineSync = require("readline-sync");

// 터미널 인코딩 작업(windows용)
if (process.platform === "win32") {
  require("child_process").execSync("chcp 65001"); // UTF-8
}

console.log("( •̀ ω •́ )✧ BMI 계산기 시작");

// BMI 판정 기준 함수
const getBmiCategory = (bmi) => {
  if (bmi < 18.5) {
    return "저체중";
  }
  if (bmi >= 18.5 && bmi < 23) {
    return "정상";
  }
  if (bmi >= 23 && bmi < 25) {
    return "비만전단계";
  }
  if (bmi >= 25 && bmi < 30) {
    return "1단계 비만";
  }
  if (bmi >= 30 && bmi < 35) {
    return "2단계 비만";
  }
  return "3단계 비만";
};

console.log("1. 키 입력 받기 ");
const height = readlineSync.question("키 : ");
console.log(`입력한 키 : ${height}`);

console.log("2. 몸무게 입력 받기 ");
const weight = readlineSync.question("몸무게 : ");
console.log(`입력한 몸무게 : ${weight}`);

const heightMeters = parseFloat(height) / 100;
const weightKg = parseFloat(weight);
const bmi = weightKg / (heightMeters * heightMeters);
const category = getBmiCategory(bmi);

console.log(`BMI 지수 : ${bmi.toFixed(2)}, ${category}`);
console.log("비동기 처리 완료");
