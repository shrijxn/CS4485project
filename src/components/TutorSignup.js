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
        if (values.firstName !== "" && values.lastName !== "" && values.email !== "" && values.password !== "") {
            fetch('http://localhost:5000/api/register-tutor', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            }).then(response => response.text())
                .then(data => {
                    if (data !== 'Valid') {
                        alert(data);
                    }
                });
            navigate('/TutorDashboard');
        }
    }



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

                            {step < 4 ? (
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