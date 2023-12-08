// StudentMySchedule.js

import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { createTheme } from "@mui/system";
import BookImage from "../logo/add.png";
import CancelImage from "../logo/remove.png";
import { useUser } from "../UserContext";
import Select from 'react-select';


const initialTimeSlots = [
    { value: "12am-1am", label: "12am-1am" },
    { value: "1am-2am", label: "1am-2am" },
    { value: "2am-3am", label: "2am-3am" },
    { value: "3am-4am", label: "3am-4am" },
    { value: "4am-5am", label: "4am-5am" },
    { value: "5am-6am", label: "5am-6am" },
    { value: "6am-7am", label: "6am-7am" },
    { value: "7am-8am", label: "7am-8am" },
    { value: "8am-9am", label: "8am-9am" },
    { value: "9am-10am", label: "9am-10am" },
    { value: "10am-11am", label: "10am-11am" },
    { value: "11am-12pm", label: "11am-12pm" },
    { value: "12pm-1pm", label: "12pm-1pm" },
    { value: "1pm-2pm", label: "1pm-2pm" },
    { value: "2pm-3pm", label: "2pm-3pm" },
    { value: "3pm-4pm", label: "3pm-4pm" },
    { value: "4pm-5pm", label: "4pm-5pm" },
    { value: "5pm-6pm", label: "5pm-6pm" },
    { value: "6pm-7pm", label: "6pm-7pm" },
    { value: "7pm-8pm", label: "7pm-8pm" },
    { value: "8pm-9pm", label: "8pm-9pm" },
    { value: "9pm-10pm", label: "9pm-10pm" },
    { value: "10pm-11pm", label: "10pm-11pm" },
    { value: "11pm-12am", label: "11pm-12am" },
];

const defaultTheme = createTheme({
    palette: {
        primary: {
            main: "#c7b94c",
        },
        secondary: {
            main: "#afc782",
        },
    },
});

function StudentMySchedule() {
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedStudent, setSelectedStudent] = useState("");
    const [selectedSubject, setSelectedSubject] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [appointments, setAppointments] = useState([]);
    const [isBookButtonActive, setIsBookButtonActive] = useState(false);
    const [isCancelButtonActive, setIsCancelButtonActive] = useState(false);
    const [fetchedAppointments, setFetchedAppointments] = useState([]); // WAS APPOINTMENTS AND SETAPPOINTMENTS
    const { user } = useUser();

    useEffect(() => {
        if (user?.email) {
            fetch("http://localhost:5000/api/getStudentAppointments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: user.email }),
            })
                .then((response) => response.json())
                .then((data) => {
                    setFetchedAppointments(data);
                })
                .catch((error) => {
                    console.error("Error fetching appointments:", error);
                });
        }
    }, [user?.email]);

    const [tutors, setTutors] = useState([]);
    const [selectedTutor, setSelectedTutor] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/api/tutorlistwithsubjects")
            .then(response => response.json())
            .then(data => {
                setTutors(data);
            })
            .catch(error => {
                console.error("Error fetching tutors:", error);
            });
    }, []);

    const tutorOptions = tutors.map(tutor => ({
        value: tutor.email,
        label: `${tutor.firstName} ${tutor.lastName} (${tutor.subjects.join(', ')})`
    }));


    const bookAppointment = () => {
        if (isBookButtonActive && selectedTutor) {
            fetch("http://localhost:5000/api/addappointment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    tutorEmail: selectedTutor.email,
                    studentEmail: user.email,
                    date: selectedDate,
                    time: selectedTime,
                    subject: selectedSubject
                }),
            })
                .then(response => response.json())
                .then(data => {
                    // Display message based on the response
                    alert(data.message);
                    if (data.message === 'Success') {
                    }
                })
                .catch(error => {
                    console.error("Error booking appointment:", error);
                });
        }
    };



    useEffect(() => {
        setIsBookButtonActive(
            selectedDate && selectedStudent && selectedSubject && selectedTime
        );
    }, [selectedDate, selectedStudent, selectedSubject, selectedTime]);

    useEffect(() => {
        setIsCancelButtonActive(
            appointments.some((appointment) => appointment.selectedForCancellation)
        );
    }, [appointments]);

    const cancelAppointment = () => {
        if (isCancelButtonActive) {
            const remainingAppointments = appointments.filter(
                (appointment) => !appointment.selectedForCancellation
            );
            setAppointments(remainingAppointments);
        }
    };

    const handleSelectForCancellation = (index) => {
        setAppointments(
            appointments.map((appointment, i) => {
                if (i === index) {
                    return {
                        ...appointment,
                        selectedForCancellation: !appointment.selectedForCancellation,
                    };
                }
                return appointment;
            })
        );
    };




    const customSelectStyles = {
        control: (provided) => ({
            ...provided,
            backgroundColor: '#c7b94c',
            color: 'black',
            borderColor: '#c7b94c',
            '&:hover': { borderColor: '#c7b94c' }
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? '#c7b94c' : 'black',
            color: 'white',
            '&:hover': { backgroundColor: '#c7b94c', color: 'black' },
        }),
        singleValue: (provided) => ({
            ...provided,
            color: 'black', // black text color for selected value
        }),
        // Add other style adjustments if needed
    };



    const buttonStyle = (isActive) => ({
        color: isActive ? "white" : "gray",
        borderColor: isActive ? "white" : "gray",
        mb: 1,
        "&:hover": isActive && {
            backgroundColor: defaultTheme.palette.secondary.main,
            borderColor: defaultTheme.palette.secondary.main,
        },
        "&.Mui-disabled": {
            color: "gray",
            borderColor: "gray",
        },
    });

    return (
        <div>
            <div style={{ marginRight: "650px" }}>
                <h2
                    className="header2-animated-text"
                    style={{ textDecoration: "none" }}
                >
                    Book Appointments:
                </h2>
            </div>
            <div className="calendar">
                <input
                    type="date"
                    onChange={(e) => setSelectedDate(e.target.value)}
                    value={selectedDate}
                />
            </div>

            <div className="drop-down-list">
                <Select
                    options={tutorOptions}
                    onChange={selectedOption => {
                        const tutor = tutors.find(t => t.email === selectedOption.value);
                        setSelectedTutor(tutor);
                        setSelectedStudent(selectedOption.label); // Setting the selected student to the label of the selected option.
                        setSelectedSubject(''); // Resetting selected subject.
                        setSelectedTime(''); // Resetting selected time.
                    }}
                    styles={customSelectStyles}
                    placeholder="Select Tutor"
                />
            </div>



            <div className="drop-down-list">
                <select
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    value={selectedSubject}
                    disabled={!selectedTutor}
                >
                    <option value="">Select Subject</option>
                    {selectedTutor && selectedTutor.subjects.map((subject, index) => (
                        <option key={index} value={subject}>
                            {subject}
                        </option>
                    ))}
                </select>
            </div>


            <div className="drop-down-list">
                <select
                    onChange={(e) => setSelectedTime(e.target.value)}
                    value={selectedTime}
                    disabled={!selectedTutor}
                >
                    <option value="">Select Time Slot</option>
                    {selectedTutor && selectedTutor.availableHours.map((time, index) => (
                        <option key={index} value={time}>
                            {time}
                        </option>
                    ))}
                </select>
            </div>





            <div className="buttons2">
                <Button
                    startIcon={
                        <img
                            src={BookImage}
                            alt="Book"
                            style={{ width: "30px", height: "25px" }}
                        />
                    }
                    variant="outlined"
                    onClick={bookAppointment}
                    disabled={!isBookButtonActive}
                    sx={buttonStyle(isBookButtonActive)}
                >
                    Book
                </Button>
                <Button
                    endIcon={
                        <img
                            src={CancelImage}
                            alt="Cancel"
                            style={{ width: "20px", height: "20px" }}
                        />
                    }
                    variant="outlined"
                    onClick={cancelAppointment}
                    disabled={!isCancelButtonActive}
                    sx={buttonStyle(isCancelButtonActive)}
                >
                    Cancel
                </Button>
            </div>



            <div style={{ marginRight: "650px" }}>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Tutor</th>
                            <th>Subject</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((appointment, index) => (
                            <tr key={index}>
                                <td>
                                    <input
                                        type="checkbox"
                                        onChange={() => handleSelectForCancellation(index)}
                                        checked={appointment.selectedForCancellation}
                                    />
                                </td>
                                <td>{appointment.date}</td>
                                <td>{appointment.time}</td>
                                <td>{appointment.student}</td>
                                <td>{appointment.subject}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div style={{ marginRight: "650px", marginTop: "20px" }}>
                <h2 className="header2-animated-text" style={{ textDecoration: "none" }}>
                    Existing Appointments:
                </h2>
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Tutor</th>
                            <th>Subject</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fetchedAppointments.map((appointment, index) => (
                            <tr key={index}>
                                <td>{appointment.date}</td>
                                <td>{appointment.time}</td>
                                <td>{`${appointment.tutorFirstName} ${appointment.tutorLastName}`}</td>
                                <td>{appointment.subject}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default StudentMySchedule;
