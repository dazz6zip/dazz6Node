const { odd, even } = require("./ex2_1");
const checkFunc = require("./ex2_2");

function checkString(str) {
  if (str.length % 2) {
    return odd;
  }
  return even;
}

console.log(checkFunc(3));
console.log(checkFunc(4));
console.log(checkString("dazz6"));
console.log(checkString("pompompurin"));
