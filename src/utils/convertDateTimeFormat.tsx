import moment from "moment";

export const convertDateTimeFormate = (dateTime: string) => {
  const dateTimeString = dateTime;
  const formattedDateTime = moment(dateTimeString).format(
    "hh:mm A, DD/MM/YYYY"
  );

  return formattedDateTime;
};
