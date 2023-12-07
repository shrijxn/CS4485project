// TutoringPage1.js

import React, { useState, useEffect } from "react";
import { useFormikContext, Field, ErrorMessage } from "formik";
import "../../App.css";

function Page1() {
  const { errors, touched, values, setFieldError, setFieldValue } =
    useFormikContext();

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
    const handlePhotoSelect = (photoName) => {
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
                          onClick={() => handlePhotoSelect(photo)}
                      />
                  ))}
              </div>
              {/* Display error message if photo is not selected */}
              {touched.photo && errors.photo && (
                  <div className="error-message">{errors.photo}</div>
              )}
          </div>
      </div>
  );
}

export default Page1;
