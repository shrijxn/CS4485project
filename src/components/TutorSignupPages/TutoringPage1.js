// TutoringPage1.js

import React from "react";
import { useFormikContext, Field, ErrorMessage } from "formik";

function Page1() {
  const { errors, touched } = useFormikContext();

  return (
    <div>
      <div>
        <label htmlFor="firstName">First Name: </label>
        <Field type="text" id="firstName" name="firstName" />
        <ErrorMessage
          name="firstName"
          component="div"
          className="error-message"
        />
      </div>
      <div>
        <label htmlFor="middleName">Middle Name (Optional): </label>
        <Field type="text" id="middleName" name="middleName" />
      </div>
      <div>
        <label htmlFor="lastName">Last Name: </label>
        <Field type="text" id="lastName" name="lastName" />
        <ErrorMessage
          name="lastName"
          component="div"
          className="error-message"
        />
      </div>
      <div>
        <label htmlFor="email">Email: </label>
        <Field type="email" id="email" name="email" />
        <ErrorMessage name="email" component="div" className="error-message" />
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <Field type="password" id="password" name="password" />
        <ErrorMessage
          name="password"
          component="div"
          className="error-message"
        />
      </div>
      <div>
        <label htmlFor="confirmPassword">Re-enter Password: </label>
        <Field type="password" id="confirmPassword" name="confirmPassword" />
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
