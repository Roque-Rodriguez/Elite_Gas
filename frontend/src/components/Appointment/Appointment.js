import { DateTimePicker } from "@mantine/dates";
import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import "./Appt.css";


function formatDateTime(dateTimeString) {
  const date = new Date(dateTimeString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

function Appointments() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [user, token] = useAuth();
  const [expandedAppointment, setExpandedAppointment] = useState(null);

  const [newAppointmentData, setNewAppointmentData] = useState({
    date_time: "",
    message: "",
    is_complete: false,
    is_approved: false,
    user: user.id,
    is_sales_or_cs: "is_sales", // Default value
  });

  const [editedAppointmentData, setEditedAppointmentData] = useState({
    id: null,
    date_time: "",
    message: "",
    is_complete: false,
    is_approved: false,
    user: user.id,
  });

  
  useEffect(() => {
    if (!token) {
      console.error("Bearer token not found.");
      return;
    }

    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/appointments/all/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments: ", error);
      }
    };

    fetchAppointments();
  }, [token]);

  const handleDeleteAppointment = async (id) => {
    if (!token || !(user.is_sales || user.is_cs)) {
      console.error("Unauthorized to delete an appointment.");
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:8000/api/appointments/delete/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response && response.status === 204) {
        // Remove the deleted appointment from the list
        setAppointments((prevAppointments) =>
          prevAppointments.filter((appointment) => appointment.id !== id)
        );
      } else {
        console.error(
          "Error deleting appointment. Invalid response:",
          response
        );
      }
    } catch (error) {
      console.error(`Error deleting appointment with ID: ${id}`, error);
    }
  };

  const handleEditAppointment = (appointment) => {
    setEditedAppointmentData(appointment);
    setExpandedAppointment(appointment.id); // Expand the edit field
  };

  const handleUpdateAppointment = async () => {
    if (!token || !(user.is_sales || user.is_cs)) {
      console.error("Unauthorized to update an appointment.");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:8000/api/appointments/put/${editedAppointmentData.id}/`,
        editedAppointmentData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response && response.data) {
        console.log(response.data);
        // Update the appointment list with the updated data
        setAppointments((prevAppointments) =>
          prevAppointments.map((appointment) =>
            appointment.id === editedAppointmentData.id
              ? response.data
              : appointment
          )
        );
        setEditedAppointmentData({
          id: null,
          date_time: "",
          message: "",
          is_complete: false,
          is_approved: false,
          user: user.id,
        });

        // Close the edit field by setting expandedAppointment to null
        setExpandedAppointment(null);
      } else {
        console.error("Invalid response format:", response);
      }
    } catch (error) {
      console.error(
        `Error updating appointment with ID: ${editedAppointmentData.id}`,
        error
      );
    }
  };

  const handleCreateAppointment = async () => {
    if (!token || !(user.is_sales || user.is_cs || user.is_customer)) {
      console.error("Unauthorized to create an appointment.");
      return;
    }

    const selectedDateTime = new Date(newAppointmentData.date_time);

    const isDateTimeAlreadySelected = appointments.some((appointment) => {
      const existingDateTime = new Date(appointment.date_time);
      return (
        existingDateTime.getFullYear() === selectedDateTime.getFullYear() &&
        existingDateTime.getMonth() === selectedDateTime.getMonth() &&
        existingDateTime.getDate() === selectedDateTime.getDate() &&
        existingDateTime.getHours() === selectedDateTime.getHours() &&
        existingDateTime.getMinutes() === selectedDateTime.getMinutes()
      );
    });

    if (isDateTimeAlreadySelected) {
      // Handle the case where the same date and time are already selected
      alert(
        "This date and time are already selected. Please choose another one."
      );
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/appointments/create/",
        newAppointmentData, // Include the type property
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response && response.data) {
        console.log(response.data);
        // Update the appointment list with the newly created appointment
        setAppointments((prevAppointments) => [
          ...prevAppointments,
          response.data,
        ]);
        setNewAppointmentData({
          date_time: "",
          message: "",
          is_complete: false,
          is_approved: false,
          user: user.id,
          is_sales_or_cs: "", // Reset the type
        });
      } else {
        console.error("Invalid response format:", response);
      }
    } catch (error) {
      console.error("Error creating appointment:", error);
    }
  };

  return (
    <div>
      <h2>Appointments</h2>

      <form>
        <label>Date and Time:</label>
        <DateTimePicker
          dropdownType="modal"
          label="Pick date and time"
          placeholder="Pick date and time"
          maxWidth={400}
          mx="auto"
          value={newAppointmentData.date_time}
          onChange={(value) =>
            setNewAppointmentData({
              ...newAppointmentData,
              date_time: value,
            })
          }
          inputFormat="YYYY-MM-DD HH:mm"
        />
        <label>Appointment Type:</label>
        <select
          value={newAppointmentData.is_sales_or_cs}
          onChange={(e) =>
            setNewAppointmentData({
              ...newAppointmentData,
              is_sales_or_cs: e.target.value,
            })
          }
        >
          <option value="is_sales">Sales</option>
          <option value="is_cs">Customer Service</option>
        </select>

        <label>Message:</label>
        <input
          type="text"
          value={newAppointmentData.message}
          onChange={(e) =>
            setNewAppointmentData({
              ...newAppointmentData,
              message: e.target.value,
            })
          }
        />
        <button type="button" onClick={handleCreateAppointment}>
          Create Appointment
        </button>
      </form>

      <div className="appointments-list">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className={`appointment-item ${
              expandedAppointment === appointment.id ? "expanded" : ""
            }`}
          >
            <h3>Date and Time: {formatDateTime(appointment.date_time)}</h3>
            <p>Message: {appointment.message}</p>
            <p>Type: {appointment.type}</p>{" "}
            {/* Display the appointment type here */}
            <p>Is Complete: {appointment.is_complete ? "Yes" : "No"}</p>
            <p>Is Approved: {appointment.is_approved ? "Yes" : "No"}</p>
            {user.is_sales || user.is_cs ? (
              <div>
                <button onClick={() => handleDeleteAppointment(appointment.id)}>
                  Delete
                </button>
                <button onClick={() => handleEditAppointment(appointment)}>
                  Edit
                </button>
              </div>
            ) : null}
            {expandedAppointment === appointment.id && (
              <div
                onClick={(e) => {
                  // Prevent the click event from propagating to the parent div
                  e.stopPropagation();
                }}
              >
                <h3>Edit Appointment</h3>
                <input
                  type="text"
                  name="date_time"
                  value={editedAppointmentData.date_time}
                  onChange={(e) =>
                    setEditedAppointmentData({
                      ...editedAppointmentData,
                      date_time: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  name="message"
                  value={editedAppointmentData.message}
                  onChange={(e) =>
                    setEditedAppointmentData({
                      ...editedAppointmentData,
                      message: e.target.value,
                    })
                  }
                />
                <label>
                  Is Complete:
                  <input
                    type="checkbox"
                    name="is_complete"
                    checked={editedAppointmentData.is_complete} // Use the edited data
                    onChange={() =>
                      setEditedAppointmentData((prevData) => ({
                        ...prevData,
                        is_complete: !prevData.is_complete, // Toggle the value
                      }))
                    }
                  />
                </label>
                <label>
                  Is Approved:
                  <input
                    type="checkbox"
                    name="is_approved"
                    checked={editedAppointmentData.is_approved} // Use the edited data
                    onChange={() =>
                      setEditedAppointmentData((prevData) => ({
                        ...prevData,
                        is_approved: !prevData.is_approved, // Toggle the value
                      }))
                    }
                  />
                </label>
                <button onClick={handleUpdateAppointment}>Update</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Appointments;
