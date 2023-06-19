import * as yup from "yup";

export const CREATE_FLIGHT_VALIDATION_SCHEMA = yup.object({
  date: yup.date().required(),
  departure: yup.string().required(),
  destination: yup.string().required(),
  seats: yup.number().typeError("Seats number is required!").min(1).required(),
  price: yup.number().typeError("Price is required!").min(1).required(),
  freeSeats: yup.number().required(),
});
