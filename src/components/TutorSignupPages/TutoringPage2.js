import React from 'react';
import { useFormikContext, Field, ErrorMessage } from 'formik';

function Page2() {
    const { errors, touched } = useFormikContext();
    return (
        <div>
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
                <label>Do you have a criminal record?</label>
                <Field type="radio" name="criminalRecord" value="yes" id="yes" />
                <label htmlFor="yes">Yes</label>
                <Field type="radio" name="criminalRecord" value="no" id="no" />
                <label htmlFor="no">No</label>
                <ErrorMessage name="criminalRecord" component="div" className="error-message" />
            </div>
        </div>
    );
}

export default Page2;

