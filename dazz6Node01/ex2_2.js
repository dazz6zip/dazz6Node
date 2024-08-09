const { odd, even } = require("./ex2_1.js");

function checkFunc(num) {
  if (num % 2) {
    return odd;
  }
  return even;
}

module.exports = checkFunc;
