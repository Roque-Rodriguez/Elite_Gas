import React, { useState } from "react";
import InvoiceList from "../../components/Invoice/InvoiceList";
import AddInvoiceForm from "../../components/Invoice/CreateInvoice"; // Import the AddInvoiceForm component

function CustomerServiceHome() {
  const [showInvoices, setShowInvoices] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  const toggleInvoices = () => {
    setShowInvoices(!showInvoices);
  };

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
  };

  return (
    <div>
      <h1>Customer Service Dashboard</h1>
      <button onClick={toggleInvoices}>
        {showInvoices ? "Hide Invoices" : "View Invoices"}
      </button>
      {showInvoices && <InvoiceList />}

      <button onClick={toggleAddForm}>
        {showAddForm ? "Hide Add Invoice Form" : "Add New Invoice"}
      </button>

      {/* Conditionally render the AddInvoiceForm component */}
      {showAddForm && <AddInvoiceForm />}
    </div>
  );
}

export default CustomerServiceHome;
