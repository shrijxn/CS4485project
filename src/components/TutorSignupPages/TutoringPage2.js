// TutoringPage2.js

import React from "react";
import { useFormikContext, Field, ErrorMessage } from "formik";
import "../../App.css";

function Page2() {
  const { errors, touched } = useFormikContext();
  return (
    <div>
      <div>
        <label htmlFor="phone" className="animated-text">
          Phone (Optional):{" "}
        </label>
        <Field type="text" id="phone" name="phone" className="formik-input" />
        <ErrorMessage name="phone" component="div" className="error-message" />
      </div>
      <div>
        <label htmlFor="street" className="animated-text">
          Street:{" "}
        </label>
        <Field type="text" id="street" name="street" className="formik-input" />
        <ErrorMessage name="street" component="div" className="error-message" />
      </div>
      <div>
        <label htmlFor="city" className="animated-text">
          City:{" "}
        </label>
        <Field type="text" id="city" name="city" className="formik-input" />
        <ErrorMessage name="city" component="div" className="error-message" />
      </div>
      <div>
        <label htmlFor="state" className="animated-text">
          State:{" "}
        </label>
        <Field type="text" id="state" name="state" className="formik-input" />
        <ErrorMessage name="state" component="div" className="error-message" />
      </div>
      <div>
        <label htmlFor="zip" className="animated-text">
          Zip Code:{" "}
        </label>
        <Field type="text" id="zip" name="zip" className="formik-input" />
        <ErrorMessage name="zip" component="div" className="error-message" />
      </div>
      <div>
        <label className="criminal-text">Do you have a criminal record?</label>
        <Field type="radio" name="criminalRecord" value="yes" id="yes" />
        <label htmlFor="yes" className="criminal-text">
          Yes
        </label>
        <Field type="radio" name="criminalRecord" value="no" id="no" />
        <label htmlFor="no" className="option-text">
          No
        </label>
        <ErrorMessage
          name="criminalRecord"
          component="div"
          className="error-message"
        />
      </div>
    </div>
  );
}

export default Page2;
