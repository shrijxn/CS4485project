// StudentSignup.js

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import "../App.css";

function StudentSignup() {
  console.log("Rendering Signup Component....");
  const navigate = useNavigate();

  const initialValues = {
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .matches(/^[^@]+@[^@]+\.[a-zA-Z]{3}$/, "Invalid email format")
      .required("Email is required"),
    phone: Yup.string().matches(
      /^\d{10}$/,
      "Phone number must be exactly 10 digits"
    ),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password should be at least 8 characters")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "Password must contain at least one letter and one number"
      ),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf(
        [Yup.ref("password"), null],
        "Password confirmation does not match"
      ),
  });

  const handleLogin = (values) => {
    console.log("Form data submitted:", values);
    if (
      values.firstName !== "" &&
      values.lastName !== "" &&
      values.email !== "" &&
      values.password !== ""
    ) {
      // DEBUGGING
      const requestBody = JSON.stringify(values);
      console.log("POST Request Body:", requestBody);
      fetch("http://localhost:5000/api/signupstudent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((response) => response.text())
        .then((data) => {
          if (data !== "Valid") {
            alert(data);
          }
        });
      navigate("/StudentDashboard");
    }
  };

  return (
    <div>
      <h2 className="header-animated-text">Student Sign up</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        <Form>
          <div>
            <label htmlFor="firstName" className="animated-text">
              First Name{" "}
            </label>
            <Field
              type="text"
              id="firstName"
              name="firstName"
              className="formik-input"
            />
            <ErrorMessage
              name="firstName"
              component="div"
              className="error-message"
            />
          </div>
          <div>
            <label htmlFor="middleName" className="animated-text">
              Middle Name (Optional){" "}
            </label>
            <Field
              type="text"
              id="middleName"
              name="middleName"
              className="formik-input"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="animated-text">
              Last Name{" "}
            </label>
            <Field
              type="text"
              id="lastName"
              name="lastName"
              className="formik-input"
            />
            <ErrorMessage
              name="lastName"
              component="div"
              className="error-message"
            />
          </div>
          <div>
            <label htmlFor="email" className="animated-text">
              Email{" "}
            </label>
            <Field
              type="email"
              id="email"
              name="email"
              className="formik-input"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="error-message"
            />
          </div>
          <div>
            <label htmlFor="phone" className="animated-text">
              Phone (Optional){" "}
            </label>
            <Field
              type="text"
              id="phone"
              name="phone"
              className="formik-input"
            />
            <ErrorMessage
              name="phone"
              component="div"
              className="error-message"
            />
          </div>
          <div>
            <label htmlFor="password" className="animated-text">
              Password{" "}
            </label>
            <Field
              type="password"
              id="password"
              name="password"
              className="formik-input"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="error-message"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="animated-text">
              Confirm Password{" "}
            </label>
            <Field
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="formik-input"
            />
            <ErrorMessage
              name="confirmPassword"
              component="div"
              className="error-message"
            />
          </div>
          <button type="submit" className="next-button-student">
            Sign up
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default StudentSignup;
