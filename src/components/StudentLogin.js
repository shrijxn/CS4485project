
// StudentLogin.js

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom'; 

function StudentLogin() {
  console.log("Rendering Login Component....");////////////////
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = (values) => {
    const { email, password } = values;

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-z]{3,}$/; // Corrected the regex to include all valid domains
    if (!emailRegex.test(email)) {
      alert('Email format is not valid');
      return;
    }

    // Validate password length
    if (password.length < 8) {
      alert('Password must be at least 8 characters');
      return;
    }

    // Navigate to StudentPage Component if login is successful
    navigate('/StudentDashboard'); 
  };

  return (
    <div>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={handleLogin}
      >
        <Form>
          <div>
            <label htmlFor="email">Email: </label>
            <Field type="email" id="email" name="email" />
            <ErrorMessage name="email" component="div" />
          </div>
          <div>
            <label htmlFor="password">Password: </label>
            <Field type="password" id="password" name="password" />
            <ErrorMessage name="password" component="div" />
          </div>
          <button type="submit">Login</button>
        </Form>
      </Formik>
    </div>
  );
}

export default StudentLogin;