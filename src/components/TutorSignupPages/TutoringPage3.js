// TutoringPage3.js

import React, { useState } from 'react'; // Import useState
import { useFormikContext, Field, ErrorMessage } from 'formik';
import Select from 'react-select';

const subjects = [
    { value: 'math', label: 'Math' },
    { value: 'chemistry', label: 'Chemistry' },
    { value: 'physics', label: 'Physics' },
    { value: 'biology', label: 'Biology' },
    { value: 'english', label: 'English' },
    { value: 'history', label: 'History' },
    { value: 'art', label: 'Art' },
    { value: 'music', label: 'Music' },
    { value: 'spanish', label: 'Spanish' },
];

const times = [
    { value: '12am-1am', label: '12am-1am' },
    { value: '1am-2am', label: '1am-2am' },
    { value: '2am-3am', label: '2am-3am' },
    { value: '3am-4am', label: '3am-4am' },
    { value: '4am-5am', label: '4am-5am' },
    { value: '5am-6am', label: '5am-6am' },
    { value: '6am-7am', label: '6am-7am' },
    { value: '7am-8am', label: '7am-8am' },
    { value: '8am-9am', label: '8am-9am' },
    { value: '9am-10am', label: '9am-10am' },
    { value: '10am-11am', label: '10am-11am' },
    { value: '11am-12pm', label: '11am-12pm' },
    { value: '12pm-1pm', label: '12pm-1pm' },
    { value: '1pm-2pm', label: '1pm-2pm' },
    { value: '2pm-3pm', label: '2pm-3pm' },
    { value: '3pm-4pm', label: '3pm-4pm' },
    { value: '4pm-5pm', label: '4pm-5pm' },
    { value: '5pm-6pm', label: '5pm-6pm' },
    { value: '6pm-7pm', label: '6pm-7pm' },
    { value: '7pm-8pm', label: '7pm-8pm' },
    { value: '8pm-9pm', label: '8pm-9pm' },
    { value: '9pm-10pm', label: '9pm-10pm' },
    { value: '10pm-11pm', label: '10pm-11pm' },
    { value: '11pm-12am', label: '11pm-12am' },
];


function Page3() {
    const { errors, touched } = useFormikContext();

    const customStyles = {
        option: (provided, state) => ({
            ...provided,
            color: state.isFocused ? 'black' : 'black', 
            fontSize: '12px', 
        }),
    };

    // Define the state to manage dropdown openness
    const [isSubjectsOpen, setSubjectsOpen] = useState(false);
    const [isHoursOpen, setHoursOpen] = useState(false);

    return (
        <div>
            <div>
                <label htmlFor="subjects">Subjects: </label>
                <Field name="subjects">
                    {({ field, form }) => (
                        <Select
                            isMulti
                            name="subjects"
                            options={subjects}
                            styles={customStyles}
                            menuIsOpen={isSubjectsOpen} // Use the state to control openness
                            onMenuOpen={() => setSubjectsOpen(true)} // Open menu when it's clicked
                            onMenuClose={() => setSubjectsOpen(false)} // Close menu when it's clicked outside or option is selected
                            onChange={(options) => {
                                form.setFieldValue(field.name, options);
                                setSubjectsOpen(false); // Close menu after selection
                            }}
                        />
                    )}
                </Field>
                <ErrorMessage name="subjects" component="div" className="error-message" />
            </div>

            <div>
                <label htmlFor="availableHours">Available Hours: </label>
                <Field name="availableHours">
                    {({ field, form }) => (
                        <Select
                            isMulti
                            name="availableHours"
                            options={times}
                            styles={customStyles}
                            menuIsOpen={isHoursOpen}
                            onMenuOpen={() => setHoursOpen(true)}
                            onMenuClose={() => setHoursOpen(false)}
                            onChange={(options) => {
                                form.setFieldValue(field.name, options);
                                setHoursOpen(false);
                            }}
                        />
                    )}
                </Field>
                <ErrorMessage name="availableHours" component="div" className="error-message" />
            </div>

            <div>
                <label htmlFor="aboutMe">About Me: </label>
                <Field as="textarea" id="aboutMe" name="aboutMe" />
                <ErrorMessage name="aboutMe" component="div" className="error-message" />
            </div>
        </div>
    );
}

export default Page3;
