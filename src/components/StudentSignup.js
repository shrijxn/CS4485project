// StudentSignup.js

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import "../App.css";

function StudentSignup() {
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const [imageError, setImageError] = useState("");
  const navigate = useNavigate();

  const initialValues = {
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    imageName: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email format")
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
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const handleImageChange = (e, setFieldValue, currentValues) => {
    if (e.target.files[0]) {
      const newImageName = `${currentValues.firstName}.${currentValues.lastName}`;
      setImage(URL.createObjectURL(e.target.files[0]));
      setImageName(newImageName); // Set image name based on current firstName and lastName
      setFieldValue("imageName", newImageName);
      setImageError("");
    }
  };
  const handleLogin = (values, { setSubmitting }) => {
    console.log("Form data submitted:", values);
    if (!image) {
      setImageError("Profile photo is required");
      setSubmitting(false);
      return;
    }
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

    setSubmitting(false);
  };

  return (
    <div>
      <h2 className="header-animated-text">Student Sign up</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form>
            <div>
              <label htmlFor="firstName" className="animated-text">
                First Name
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
                Confirm Password
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

            <div style={{ marginRight: "600px" }}>
              <label htmlFor="photo" className="animated-text file-input-text">
                Upload Photo
              </label>

              <input
                type="file"
                id="photo"
                name="photo"
                accept="image/*"
                className="file-input"
                onChange={(e) => handleImageChange(e, setFieldValue, values)}
              />
              <label htmlFor="photo" className="file-input-label">
                Choose File
              </label>

              {image && (
                <div style={{ marginTop: "5px", marginBottom: "5px" }}>
                  <span className="file-name">{imageName}</span>{" "}
                  <img
                    src={image}
                    alt="Preview"
                    style={{
                      width: "100px",
                      height: "auto",
                      border: "1px solid white",
                    }}
                  />
                </div>
              )}
              {imageError && <div className="error-message">{imageError}</div>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="next-button-student"
            >
              Sign up
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default StudentSignup;
