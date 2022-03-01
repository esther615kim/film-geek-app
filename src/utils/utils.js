import { Timestamp } from "firebase/firestore";

/** General */
export function isEven(num) {
  return num % 2 === 0;
}

/** Firebase Dates */
export function fsDateToJsDate(fsDate) {
  const { seconds, nanoseconds } = fsDate;
  return new Timestamp(seconds, nanoseconds).toDate();
}
