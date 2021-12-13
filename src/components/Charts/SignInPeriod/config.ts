import moment from "moment";

export const config = {
  // unknown date (today as default)
  startTime: moment("22:00:00", "HH:mm:ss"),
  endTime: moment("23:20:00", "HH:mm:ss"),
  step: moment.duration(2, "minute"), // MUST more than 1 second

  barSize: 12,
  barGap: 3,
  overHeight: 450,
  yScale: 0.5,
  fontSize: 12,

  gridLineScale: 100,
  gridLineFontSize: 12,
};
