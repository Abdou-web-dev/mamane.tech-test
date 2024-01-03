import { object, string, z } from "zod";
import { isValidCardNumber } from "../utils/helpers";

// Define the schema using Zod
export const schema = object({
  email: string().email(),
  name: string(),
  address: string(),
  cardNumber: string().refine((value) => isValidCardNumber(value), {
    message: "Invalid credit card number",
  }),
  cvc: string().refine((value) => value.length === 3, {
    message: "CVC must be 3 digits",
  }),
  expirationDate: z.object({
    month: z.string(),
    year: z.string(),
    // month: z.date(),
    // year: z.date(),
  }),
});

export const emailSchema = object({
  email: string().email(),
});

// to make the code more maintainable and less error-prone in case of typos or changes to field names.
// Constants or Enums
export const FieldNames = {
  EMAIL: "email",
  NAME: "name",
  ADDRESS: "address",
  CARD_NUMBER: "cardNumber",
  CVC: "cvc",
  MONTH: "month",
  YEAR: "year",
};
