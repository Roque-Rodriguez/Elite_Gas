import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import InvoiceList from "../../components/Invoice/CustomerInvoice";
import CustomerAppointments from "../../components/Appointment/CustomerAppointment";
import "./CustomerHome.css"; // Import your stylesheet

function CustomerHome() {
  const [showInvoices, setShowInvoices] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [user] = useAuth();

  const toggleInvoices = () => {
    setShowInvoices(!showInvoices);
  };

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Customer Dashboard</h1>
        <p>Welcome, {user.first_name}!</p>
        <button className="button" onClick={toggleInvoices}>
          {showInvoices ? "Hide Invoices" : "View Invoices"}
        </button>
      </div>
      {showInvoices && (
        <div className="content">
          <div className="invoice-list">
            <InvoiceList />
          </div>
        </div>
      )}
      <div className="content">
        <div className="appointments">
          <CustomerAppointments />
        </div>
      </div>
    </div>
  );
}

export default CustomerHome;
