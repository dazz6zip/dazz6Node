// 이벤트 처리 : events 모듈 사용
// EventEmitter 객체를 사용해 이벤트와 이벤트 핸들러를 연결해 동기적으로 호출

import { EventEmitter } from "events";

const myEvent = new EventEmitter(); // 이벤트 객체 생성

myEvent.addListener("event1", () => {
  console.log("이벤트 1");
});

myEvent.on("event2", () => {
  // addListener()와 같은 의미
  console.log("이벤트 2");
});

myEvent.on("event2", () => {
  // addListener()와 같은 의미
  console.log("이벤트 2 추가");
});

myEvent.once("event3", () => {
  // once : 1회 수행
  console.log("이벤트 3");
});

myEvent.emit("event1");
myEvent.emit("event2");
myEvent.emit("event3");
myEvent.emit("event3");
myEvent.emit("event1");

console.log("------------------------------------------------------");
myEvent.on("event4", () => {
  // once : 1회 수행
  console.log("이벤트 4");
});
myEvent.removeAllListeners("event4");
myEvent.emit("event4");

const listener = () => {
  console.log("이벤트 5");
};

myEvent.on("event5", listener);
myEvent.emit("event5");
myEvent.off("event5", listener);
myEvent.emit("event5");
console.log(myEvent.listenerCount("event1"));

console.log("--- 매개변수 전달 ---");
class MyEmitter extends EventEmitter {}

const met = new MyEmitter();
met.on("ev", () => {
  console.log("이벤트 처리");
});
met.emit("ev");

const met2 = new MyEmitter();
met2.on("ev", (a, b) => {
  console.log("이벤트 처리 : ", a, " ", b);
});
met2.emit("ev", "야", "호");
