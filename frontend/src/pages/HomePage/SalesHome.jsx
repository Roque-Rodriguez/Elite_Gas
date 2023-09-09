import React, { useState } from "react";
import InvoiceList from "../../components/Invoice/InvoiceList";
import AddInvoiceForm from "../../components/Invoice/CreateInvoice";
import Appointment from "../../components/Appointment/Appointment"; // Import the Appointment component

function SalesHome() {
  const [showInvoices, setShowInvoices] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAppointments, setShowAppointments] = useState(false); // Add this state variable

  const toggleInvoices = () => {
    setShowInvoices(!showInvoices);
  };

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
  };

  const toggleAppointments = () => {
    setShowAppointments(!showAppointments);
  };

  return (
    <div>
      <h1>Sales Dashboard</h1>
      <button onClick={toggleInvoices}>
        {showInvoices ? "Hide Invoices" : "View Invoices"}
      </button>
      {showInvoices && <InvoiceList />}

      <button onClick={toggleAddForm}>
        {showAddForm ? "Hide Add Invoice Form" : "Add New Invoice"}
      </button>

      <button onClick={toggleAppointments}>
        {showAppointments ? "Hide Appointments" : "View Appointments"}
      </button>

      {/* Conditionally render the AddInvoiceForm component */}
      {showAddForm && <AddInvoiceForm />}

      {/* Conditionally render the Appointment component */}
      {showAppointments && <Appointment />}
    </div>
  );
}

export default SalesHome;

// import React, { useState } from "react";
// import InvoiceList from "../../components/Invoice/InvoiceList";

// function SalesHome() {

//   const [showInvoices, setShowInvoices] = useState(false);

//   const toggleInvoices = () => {
//     setShowInvoices(!showInvoices);
//   };

//   return (
//     <div>
//       <h1>Sales Dashboard</h1>
//       <button onClick={toggleInvoices}>
//         {showInvoices ? "Hide Invoices" : "View Invoices"}
//       </button>
//       {showInvoices && <InvoiceList />}
//       {/* Display Invoice component when showInvoices is true */}
//     </div>
//   );
// }

// export default SalesHome;
