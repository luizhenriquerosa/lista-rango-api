import moment from "moment";

const validMinTimeDifference = (value, context) => {
  if (value.start && value.end) {
    const start = moment(value.start, "HH:mm");
    const end = moment(value.end, "HH:mm");

    return (
      end.diff(start, "minutes") >=
      Number(process.env.MIN_TIME_DIFFERENCE_MINUTES)
    );
  }
};

export default validMinTimeDifference;
