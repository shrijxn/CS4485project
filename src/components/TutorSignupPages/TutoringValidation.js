// TutoringValidation.js

import * as Yup from "yup";

export const Page1Validation = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string()
    .matches(/^[^@]+@[^@]+\.[a-zA-Z]{3}$/, "Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password should be at least 8 characters")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "Password must contain at least one letter and one number"
    ),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), null], "Password confirmation does not match"),
   photo: Yup.string().required("Profile photo is required"),
});

export const Page2Validation = Yup.object({
  phone: Yup.string().matches(
    /^\d{10}$/,
    "Phone number must be exactly 10 digits"
  ),
  street: Yup.string().required("Street is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  zip: Yup.string()
    .required("Zip code is required")
    .matches(/^\d{5}$/, "Zip code must be exactly 5 digits"),
  criminalRecord: Yup.string().required("Please select an option"),
});

export const Page3Validation = Yup.object({
  subjects: Yup.array()
    .of(
      Yup.object().shape({
        label: Yup.string().required(),
        value: Yup.string().required(),
      })
    )
    .min(1, "At least one subject is required")
    .required("Subjects are required"),
  availableHours: Yup.array()
    .of(
      Yup.object().shape({
        label: Yup.string().required(),
        value: Yup.string().required(),
      })
    )
    .required("Available hours are required")
    .min(1, "At least one time slot is required"),
  aboutMe: Yup.string()
    .min(75, "Minimum 75 characters required")
    .required("About me is required"),
});
