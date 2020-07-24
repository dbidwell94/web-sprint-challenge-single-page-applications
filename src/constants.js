import * as yup from "yup";

export const allowedPizzaSizes = [6, 12, 18, 24, 30];

export const ORDER_SCHEMA = yup.object().shape({
  name: yup
    .string()
    .required("This field is required")
    .min(2, "Your name must be at least 2 characters long"),
  address: yup.string().required("This field is required"),
  pizzaSize: yup
    .number()
    .required("This field is required")
    .oneOf(allowedPizzaSizes),
  toppings: yup.object().shape({
    sausage: yup.boolean(),
    ham: yup.boolean(),
    pineapple: yup.boolean(),
    pepperoni: yup.boolean(),
  }),
  specialInstructions: yup
    .string()
    .max(255, "You are only allowed 255 characters in this field"),
});

export const SUBMIT_URL = "https://reqres.in/api/users";
