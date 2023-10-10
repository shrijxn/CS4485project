// TutorLogin.js

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom'; 
import '../App.css';

function TutorLogin() {
  console.log("Rendering Login Component....");
  const navigate = useNavigate(); // Initialize useNavigate
  
  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string()
        .matches(/^[^@]+@[^@]+\.[a-zA-Z]{3}$/, 'Invalid email format') // Regex to match the desired email format
        .required('Email is required'),
    password: Yup.string()
        .required('Password is required')
        .min(8, 'Password should be at least 8 characters')
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'Password must contain at least one letter and one number') // Regex for the password condition
  });

  const handleLogin = (values) => {
     // You can perform login logic here
     console.log('Form data submitted:', values);
    navigate('/TutorDashboard'); // Navigate to the tutor page after successful signup
  };

  return (
    <div>
        <h2>Tutor Login</h2>
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
        >
            <Form>
                <div>
                    <label htmlFor="email">Email: </label>
                    <Field type="email" id="email" name="email" />
                    <ErrorMessage name="email" component="div" className="error-message" />
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <Field type="password" id="password" name="password" /> {/* Changed type to password for security */}
                    <ErrorMessage name="password" component="div" className="error-message" />
                </div>
                <button type="submit">Login</button>
            </Form>
        </Formik>
    </div>
);
}

export default TutorLogin;
