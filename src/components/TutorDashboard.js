// TutorDashboard.js

import React from "react";
import * as Icon from "react-bootstrap-icons";
import { Link } from "react-router-dom";

function TutorDashboard() {
  return (
    <div>
      <h2 className="header-animated-text" style={{ marginRight: "450px" }}>
        Tutor Dashboard
      </h2>
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
