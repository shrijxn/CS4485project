// TutorCalendar.js

import React, { useState, useEffect } from "react";

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

function TutorCalendar() {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [isBookButtonActive, setIsBookButtonActive] = useState(false);
  const [isCancelButtonActive, setIsCancelButtonActive] = useState(false);

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

  const bookAppointment = () => {
    if (isBookButtonActive) {
      const newAppointment = {
        date: selectedDate,
        student: selectedStudent,
        subject: selectedSubject,
        time: selectedTime,
        selectedForCancellation: false,
      };
      setAppointments([...appointments, newAppointment]);
      setSelectedDate("");
      setSelectedStudent("");
      setSelectedSubject("");
      setSelectedTime("");
    }
  };

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

  const getTimeSlotStatus = (timeValue, date) => {
    const appointmentForSlot = appointments.find(
      (appointment) =>
        appointment.time === timeValue && appointment.date === date
    );
    return appointmentForSlot
      ? { active: false, label: ` (booked)` }
      : { active: true, label: "" };
  };

  return (
    <div className="tutor-calendar">
      <div className="calendar">
        <input
          type="date"
          onChange={(e) => setSelectedDate(e.target.value)}
          value={selectedDate}
        />
      </div>

      <div className="student-list">
        <select
          onChange={(e) => setSelectedStudent(e.target.value)}
          value={selectedStudent}
        >
          <option value="">Select Student</option>
          {[...Array(10).keys()].map((i) => (
            <option key={i} value={`Student_${i + 1}`}>{`Student_${
              i + 1
            }`}</option>
          ))}
        </select>
      </div>

      <div className="subject-list">
        <select
          onChange={(e) => setSelectedSubject(e.target.value)}
          value={selectedSubject}
        >
          <option value="">Select Subject</option>
          {[
            "Math",
            "Chemistry",
            "Physics",
            "Biology",
            "English",
            "History",
            "Art",
            "Music",
            "Spanish",
          ].map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </div>

      <div className="time-list">
        <select
          onChange={(e) => setSelectedTime(e.target.value)}
          value={selectedTime}
        >
          <option value="">Select Time Slot</option>
          {initialTimeSlots.map((time) => {
            const { active, label } = getTimeSlotStatus(
              time.value,
              selectedDate
            );
            return (
              <option key={time.value} value={time.value} disabled={!active}>
                {`${time.label}${label}`}
              </option>
            );
          })}
        </select>
      </div>

      <div className="appointment-list">
        {appointments.map((appointment, index) => (
          <div key={index}>
            <input
              type="checkbox"
              onChange={() => handleSelectForCancellation(index)}
              checked={appointment.selectedForCancellation}
            />
            {`${appointment.date} - ${appointment.time} - ${appointment.student} - ${appointment.subject}`}
          </div>
        ))}
      </div>

      <div className="buttons">
        <button onClick={bookAppointment} disabled={!isBookButtonActive}>
          Book
        </button>
        <button onClick={cancelAppointment} disabled={!isCancelButtonActive}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default TutorCalendar;
