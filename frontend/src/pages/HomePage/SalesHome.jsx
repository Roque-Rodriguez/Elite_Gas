import React, { useState } from "react";
import InvoiceList from "../../components/Invoice/InvoiceList";
import AddInvoiceForm from "../../components/Invoice/CreateInvoice"; // Import the AddInvoiceForm component

function SalesHome() {
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
      <h1>Sales Dashboard</h1>
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
