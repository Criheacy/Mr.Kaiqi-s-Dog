import moment from "moment";

export const config = {
  // unknown date (today as default)
  startTime: moment("22:00:00", "HH:mm:ss"),
  endTime: moment("23:20:00", "HH:mm:ss"),
  step: moment.duration(2, "minute"), // MUST more than 1 second

  blockSize: 12,
  blockGap: 3,
  fontSize: 12,
  blockCornerRadius: 2,

  gridLineScale: 100,
  gridLineFontSize: 12,
};
