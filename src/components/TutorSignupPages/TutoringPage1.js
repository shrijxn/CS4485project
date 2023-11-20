// TutoringPage1.js

import React from "react";
import { useFormikContext, Field, ErrorMessage } from "formik";
import "../../App.css";

function Page1() {
  const { errors, touched } = useFormikContext();

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
    </div>
  );
}

export default Page1;
