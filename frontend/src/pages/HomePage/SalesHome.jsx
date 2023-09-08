import React, { useState } from "react";
import InvoiceList from "../../components/Invoice/InvoiceList";

function SalesHome() {
  
  const [showInvoices, setShowInvoices] = useState(false);

  const toggleInvoices = () => {
    setShowInvoices(!showInvoices);
  };



  return (
    <div>
      <h1>Sales Dashboard</h1>
      <button onClick={toggleInvoices}>
        {showInvoices ? "Hide Invoices" : "View Invoices"}
      </button>
      {showInvoices && <InvoiceList />}
      {/* Display Invoice component when showInvoices is true */}
    </div>
  );
}

export default SalesHome;
