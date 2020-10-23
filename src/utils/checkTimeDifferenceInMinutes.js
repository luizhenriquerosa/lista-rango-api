import moment from "moment";

const checkTimeDifferenceInMinutes = (value, context) => {
  if (value.start && value.end) {
    const start = moment(value.start, "HH:mm");
    const end = moment(value.end, "HH:mm");

    return end.diff(start, "minutes") >= 15;
  }
};

export default checkTimeDifferenceInMinutes;
