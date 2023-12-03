// TutoringPage1.js

import React, { useState } from "react";
import { useFormikContext, Field, ErrorMessage } from "formik";
import "../../App.css";

function Page1() {
  const { errors, touched, values, setFieldError, setFieldValue } =
    useFormikContext();

  // State for image management
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState("");

  // Handle image change
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const newImageName = `${values.firstName}.${values.lastName}`;
      setImageName(newImageName); // Update the image name state
      setImage(URL.createObjectURL(e.target.files[0]));
      setFieldValue(
        "photo",
        new Blob([e.target.files[0]], { type: "image/png" }),
        newImageName
      );
      setFieldError("photo", ""); // Clear any previous error
    } else {
      setFieldError("photo", "Profile photo is required");
    }
  };

  return (
    <div>
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
        <Field type="email" id="email" name="email" className="formik-input" />
        <ErrorMessage name="email" component="div" className="error-message" />
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

      {/* Image upload section */}
      <div style={{ marginRight: "600px" }}>
        <label htmlFor="photo" className="animated-text file-input-text">
          Upload Photo:
        </label>
        <input
          type="file"
          id="photo"
          name="photo"
          accept="image/*"
          className="file-input"
          onChange={handleImageChange}
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
        <ErrorMessage name="photo" component="div" className="error-message" />
      </div>
    </div>
  );
}

export default Page1;
