import { Timestamp } from "firebase/firestore";

/** Firebase Dates */
export function fsDateToJsDate(fsDate) {
  const { seconds, nanoseconds } = fsDate;
  return new Timestamp(seconds, nanoseconds).toDate();
}
