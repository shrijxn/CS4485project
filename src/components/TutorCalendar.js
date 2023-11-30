// TutorCalendar.js

import React from "react";

function TutorCalendar() {
  // Sample Appointment List
  const appointments = [
    {
      date: "2023-11-30",
      timeSlot: "1pm-2pm",
      student: "Student_1",
      subject: "Math",
    },
    {
      date: "2023-11-29",
      timeSlot: "12am-1am",
      student: "Student_3",
      subject: "Spanish",
    },
    {
      date: "2023-12-06",
      timeSlot: "3pm-4pm",
      student: "Student_4",
      subject: "History",
    },
  ];

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
              <td>{appointment.timeSlot}</td>
              <td>{appointment.student}</td>
              <td>{appointment.subject}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TutorCalendar;
