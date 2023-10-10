/*
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

*/


import React, { useState } from 'react';
import { Formik, useFormik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import '../App.css';

// Page components
import Page1 from './TutorSignupPages/TutoringPage1';
import Page2 from './TutorSignupPages/TutoringPage2';
import Page3 from './TutorSignupPages/TutoringPage3';

// Validation Schemas
import { Page1Validation, Page2Validation, Page3Validation } from './TutorSignupPages/TutoringValidation';

function TutorSignup() {
    const [step, setStep] = useState(1);
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
        subjects: [],
        availableHours: [],
        aboutMe: '',
    };

    const handleSubmit = (values) => {
        console.log('Form data submitted:', values);
        navigate('/TutorDashboard');
    };



    return (
        <div>
            <h2>Tutor Sign up</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={getValidationSchema(step)}
                onSubmit={handleSubmit}
                //validateOnChange={true}
                validateOnMount={false}
            >
                {({ values, isValid, validateForm, setTouched }) => (
                    <Form>
                        {step === 1 && <Page1 />}
                        {step === 2 && <Page2 />}
                        {step === 3 && <Page3 />}

                        <div className="button-container">
                            {step > 1 && (
                                <button type="button" onClick={() => setStep((s) => s - 1)}>
                                    Back
                                </button>
                            )}

                            {step < 3 ? (
                                <button
                                    type="button"
                                    onClick={() => {
                                        validateForm().then((errors) => {
                                            if (Object.keys(errors).length === 0) {
                                                // No errors: proceed to the next step
                                                setStep((s) => s + 1);
                                            } else {
                                                // There are validation errors: mark all fields as touched
                                                setTouched(
                                                    Object.keys(errors).reduce(
                                                        (acc, curr) => ({ ...acc, [curr]: true }),
                                                        {}
                                                    )
                                                );
                                            }
                                        });
                                    }}
                                    className="next-button"
                                >
                                    Next
                                </button>
                            ) : (
                                <button type="submit" className="next-button">
                                    Sign up
                                </button>
                            )}
                        </div>
                    </Form>
                )}

            </Formik>
        </div>
    );


    function getValidationSchema(step) {
        switch (step) {
            case 1: return Page1Validation;
            case 2: return Page2Validation;
            case 3: return Page3Validation;
            default: return undefined;
        }
    }
}

export default TutorSignup;