import React, { useState, useEffect, useContext } from "react";
import { useUser } from "../UserContext";

function TutorCalendar() {
    const [appointments, setAppointments] = useState([]);
    const { user } = useUser();

    useEffect(() => {
        if (user?.email) {
            fetch("http://localhost:5000/api/getTutorAppointments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: user.email }),
            })
                .then((response) => response.json())
                .then((data) => {
                    setAppointments(data);
                })
                .catch((error) => {
                    console.error("Error fetching appointments:", error);
                });
        }
    }, [user?.email]);

    return (
        <div style={{ marginRight: "650px" }}>
            <h2 className="header-animated-text">Tutor's Calendar</h2>
            <h2 className="header2-animated-text" style={{ textDecoration: "none" }}>
                Appointments:
            </h2>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Student</th>
                        <th>Subject</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((appointment, index) => (
                        <tr key={index}>
                            <td>{appointment.date}</td>
                            <td>{appointment.time}</td>
                            <td>{`${appointment.studentFirstName} ${appointment.studentLastName}`}</td>
                            <td>{appointment.subject}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TutorCalendar;
