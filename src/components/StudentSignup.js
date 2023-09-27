// StudentSignup.js

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

function StudentSignup() {
  console.log("Rendering Signup Component....");
  const navigate = useNavigate();

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    phone: Yup.string(),
  });

  const handleSubmit = (values) => {
    // You can perform signup logic here
    console.log('Form data submitted:', values);
    navigate('/student'); // Navigate to the student page after successful signup
  };

  return (
    <div>
      <h2>Sign up</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div>
            <label htmlFor="firstName">First Name: </label>
            <Field type="text" id="firstName" name="firstName" />
            <ErrorMessage name="firstName" component="div" />
          </div>
          <div>
            <label htmlFor="lastName">Last Name: </label>
            <Field type="text" id="lastName" name="lastName" />
            <ErrorMessage name="lastName" component="div" />
          </div>
          <div>
            <label htmlFor="email">Email: </label>
            <Field type="email" id="email" name="email" />
            <ErrorMessage name="email" component="div" />
          </div>
          <div>
            <label htmlFor="phone">Phone (Optional): </label>
            <Field type="text" id="phone" name="phone" />
            <ErrorMessage name="phone" component="div" />
          </div>
          <button type="submit">Sign up</button>
        </Form>
      </Formik>
    </div>
  );
}

export default StudentSignup;
