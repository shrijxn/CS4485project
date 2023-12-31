// StudentLogin.js

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { useUser } from '../UserContext';

function StudentLogin() {
  const { setUser } = useUser();
  console.log("Rendering Login Component....");
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .matches(/^[^@]+@[^@]+\.[a-zA-Z]{3}$/, "Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password should be at least 8 characters")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "Password must contain at least one letter and one number"
      ), // Regex for the password condition
  });

    const handleLogin = (values) => {

    // You can perform signup logic here
    console.log("Form data submitted:", values);
    if (
      values.email !== "" &&
      values.password !== ""
    ) {
      fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((response) => response.text())
        .then((data) => {
            if (data !== "SUCCESS") {
                alert(data);
            }
            else {
                setUser({ email: values.email });
                navigate("/StudentDashboard");
            }
        });
    }
  };

  return (
    <div>
      <h2 className="header-animated-text">Student Login</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        <Form>
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
          <button type="submit" className="next-button-student">
            Login
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default StudentLogin;
