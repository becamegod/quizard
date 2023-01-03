import moment from "moment/moment";

export default {
  timeDifference: (previous) => {
    return moment.utc(previous).local().startOf("seconds").fromNow();
  }
};
