// TutorSignup.js

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function TutorSignup() {
    console.log("Rendering Signup Component....");
    const navigate = useNavigate();

    const initialValues = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        password: '',
        confirmPassword: '',
        criminalRecord: '',
    };

    const validationSchema = Yup.object({
        firstName: Yup.string().required('First Name is required'),
        lastName: Yup.string().required('Last Name is required'),
        email: Yup.string()
            .matches(/^[^@]+@[^@]+\.[a-zA-Z]{3}$/, 'Invalid email format') 
            .required('Email is required'),
        phone: Yup.string()
            .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
        street: Yup.string().required('Street is required'),
        city: Yup.string().required('City is required'),
        state: Yup.string().required('State is required'),
        zip: Yup.string()
            .required('Zip code is required')
            .matches(/^\d{5}$/, 'Zip code must be exactly 5 digits'),
        password: Yup.string()
            .required('Password is required')
            .min(8, 'Password should be at least 8 characters')
            .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'Password must contain at least one letter and one number'),
        confirmPassword: Yup.string()
            .required('Confirm Password is required')
            .oneOf([Yup.ref('password'), null], 'Password confirmation does not match'),
        criminalRecord: Yup.string().required('Please select an option'),
    });

    const handleSubmit = (values) => {
        // You can perform signup logic here
        console.log('Form data submitted:', values);
        navigate('/TutorDashboard'); // Navigate to the tutor page after successful signup
    };

    return (
        <div>
            <h2>Tutor Sign up</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form>
                    <div>
                        <label htmlFor="firstName">First Name: </label>
                        <Field type="text" id="firstName" name="firstName" />
                        <ErrorMessage name="firstName" component="div" className="error-message" />
                    </div>
                    <div>
                        <label htmlFor="lastName">Last Name: </label>
                        <Field type="text" id="lastName" name="lastName" />
                        <ErrorMessage name="lastName" component="div" className="error-message" />
                    </div>
                    <div>
                        <label htmlFor="email">Email: </label>
                        <Field type="email" id="email" name="email" />
                        <ErrorMessage name="email" component="div" className="error-message" />
                    </div>
                    <div>
                        <label htmlFor="phone">Phone (Optional): </label>
                        <Field type="text" id="phone" name="phone" />
                        <ErrorMessage name="phone" component="div" className="error-message" />
                    </div>
                    <div>
                        <label htmlFor="street">Street: </label>
                        <Field type="text" id="street" name="street" />
                        <ErrorMessage name="street" component="div" className="error-message" />
                    </div>
                    <div>
                        <label htmlFor="city">City: </label>
                        <Field type="text" id="city" name="city" />
                        <ErrorMessage name="city" component="div" className="error-message" />
                    </div>
                    <div>
                        <label htmlFor="state">State: </label>
                        <Field type="text" id="state" name="state" />
                        <ErrorMessage name="state" component="div" className="error-message" />
                    </div>
                    <div>
                        <label htmlFor="zip">Zip Code: </label>
                        <Field type="text" id="zip" name="zip" />
                        <ErrorMessage name="zip" component="div" className="error-message" />
                    </div>
                    <div>
                        <label htmlFor="password">Password: </label>
                        <Field type="password" id="password" name="password" />
                        <ErrorMessage name="password" component="div" className="error-message" />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword">Confirm Password: </label>
                        <Field type="password" id="confirmPassword" name="confirmPassword" />
                        <ErrorMessage name="confirmPassword" component="div" className="error-message" />
                    </div>
                    <div>
                        <label>Do you have a criminal record?</label>
                        <Field type="radio" name="criminalRecord" value="yes" id="yes" />
                        <label htmlFor="yes">Yes</label>
                        <Field type="radio" name="criminalRecord" value="no" id="no" />
                        <label htmlFor="no">No</label>
                        <ErrorMessage name="criminalRecord" component="div" className="error-message" />
                    </div>
                    <button type="submit">Sign up</button>
                </Form>
            </Formik>
        </div>
    );
}

export default TutorSignup;
