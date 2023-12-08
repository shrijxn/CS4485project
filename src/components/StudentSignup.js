// StudentSignup.js

import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { useUser } from '../UserContext';

function StudentSignup() {
  const { setUser } = useUser();
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const [imageError, setImageError] = useState("");
    const navigate = useNavigate();

    // State for predefined profile pictures
    const [profilePictures, setProfilePictures] = useState([]);
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    // Load profile pictures from the public folder
    useEffect(() => {
        setProfilePictures([
            'city.jpg',
            'meadow.jpg',
            'mountains.jpg',
            'ship.jpg',
            'skiing.jpg'
        ]);
    }, []);

    // Handle photo selection
    const handlePhotoSelect = (photoName, setFieldValue) => {
        console.log("Selected photo:", photoName); // Debugging log
        setFieldValue('photo', photoName);
        setSelectedPhoto(photoName); // Update the selected photo state
    };

    // Style for the images
    const imageStyle = (photo) => ({
        width: '100px',
        height: 'auto',
        cursor: 'pointer',
        margin: '5px',
        border: selectedPhoto === photo ? '2px solid blue' : '1px solid gray'
    });

  const initialValues = {
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    photo: "",
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
      photo: Yup.string().required("Profile photo is required"),
  });

  const handleLogin = (values, { setSubmitting }) => {
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
      fetch("https://slaaks-ca0a6bd25a1e.herokuapp.com/api/signupstudent", {
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
        {({ isSubmitting, setFieldValue, values, errors, touched}) => (
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
            {/*The rest of the forms*/}

            {/* Profile picture selection section */}
          <div style={{ textAlign: 'left' }}>
              <label className="animated-text">Please select a profile photo:</label>
              <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                  {profilePictures.map((photo) => (
                      <img
                          key={photo}
                          src={`/ProfilePictures/${photo}`}
                          alt={photo}
                          style={imageStyle(photo)}
                          onClick={() => handlePhotoSelect(photo, setFieldValue)}
                      />
                  ))}
              </div>
              {/* Display error message if photo is not selected */}
              {touched.photo && errors.photo && (
                  <div className="error-message">{errors.photo}</div>
              )}
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
