import React, { useEffect, useState } from "react";
import * as Icon from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { useUser } from "../UserContext";

function TutorDashboard() {
    const { user } = useUser(); // Retrieve user data
    const [tutoringHours, setTutoringHours] = useState(0);

    useEffect(() => {
        if (user?.email) {
            fetch('http://localhost:5000/api/gettutoringhours', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: user.email }),
            })
                .then(response => response.json())
                .then(data => setTutoringHours(data.hours))
                .catch(error => console.error('Error:', error));
        }
    }, [user]);

    return (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginRight: '450px', marginLeft: '20px' }}>
                <h2 className="header-animated-text">Tutor Dashboard</h2>
                <div style={{ textAlign: 'right' }}>
                    <p style={{ color: "#c7b94c" }}>Tutoring hours: {tutoringHours}</p> {/* Display the tutoring hours */}
                </div>
            </div>
            <div className="header2-animated-text" style={{ marginRight: "450px" }}>
                Current Appointments{" "}
            </div>
            <Link to="/TutorCalendar">
                <Icon.CalendarWeek
                    size={200}
                    style={{ marginRight: "750px" }}
                    className="header-animated-text"
                />
            </Link>
        </div>
    );
}

export default TutorDashboard;
