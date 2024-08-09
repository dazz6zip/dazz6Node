// readline 모듈의 question 메소드는 콜백 함수를 사용해 비동기적으로 입력 처리
import readline from "readline";

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

// 키보드 입력을 위한 readline 인터페이스 생성
// input 스트림에서 데이터를 읽고, output 스트림으로 데이터를 쓸 수 있게 함
const rdata = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("비동기 입력 시작");

// 키 입력
rdata.question("키(cm) : ", (height) => {
  // 몸무게 입력
  rdata.question("몸무게(kg) : ", (weight) => {
    console.log(`입력한 몸무게 : ${weight}`);

    // cm 단위를 m 단위로 변환
    const heightMeters = parseFloat(height) / 100;

    const weightKg = parseFloat(weight);

    // BMI 계산
    const bmi = weightKg / (heightMeters * heightMeters);
    const category = getBmiCategory(bmi);

    console.log(`BMI 지수 : ${bmi.toFixed(2)}, ${category}`);
    rdata.close();
  });
});

console.log("비동기 처리");
