// TutorDashboard.js

import React from "react";
import * as Icon from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { useUser } from "../UserContext";

function TutorDashboard() {
    const { user } = useUser(); // Retrieve user data
  return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginRight: '450px', marginLeft: '20px' }}>
              <h2 className="header-animated-text">Tutor Dashboard</h2>
              <div style={{ textAlign: 'right' }}>
                  <p>Welcome, {user?.email}</p> {/* Display the user's email */}
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
