// TutorSignup.js

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

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
    };

    const validationSchema = Yup.object({
        firstName: Yup.string().required('First Name is required'),
        lastName: Yup.string().required('Last Name is required'),
        email: Yup.string()
            .email('Invalid email format')
            .required('Email is required'),
        phone: Yup.string(),
        street: Yup.string().required('Street is required'),
        city: Yup.string().required('City is required'),
        state: Yup.string().required('State is required'),
        zip: Yup.string()
            .required('Zip code is required')
            .matches(/^\d{5}$/, 'Must be exactly 5 digits'),
    });

    const handleSubmit = (values) => {
        // You can perform signup logic here
        console.log('Form data submitted:', values);
        navigate('/tutor'); // Navigate to the tutor page after successful signup
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
                    <div>
                        <label htmlFor="street">Street: </label>
                        <Field type="text" id="street" name="street" />
                        <ErrorMessage name="street" component="div" />
                    </div>
                    <div>
                        <label htmlFor="city">City: </label>
                        <Field type="text" id="city" name="city" />
                        <ErrorMessage name="city" component="div" />
                    </div>
                    <div>
                        <label htmlFor="state">State: </label>
                        <Field type="text" id="state" name="state" />
                        <ErrorMessage name="state" component="div" />
                    </div>
                    <div>
                        <label htmlFor="zip">Zip Code: </label>
                        <Field type="text" id="zip" name="zip" />
                        <ErrorMessage name="zip" component="div" />
                    </div>
                    <button type="submit">Sign up</button>
                </Form>
            </Formik>
        </div>
    );
}

export default TutorSignup;
