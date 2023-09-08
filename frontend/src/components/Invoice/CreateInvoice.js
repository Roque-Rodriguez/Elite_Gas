import React, { useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth"; // Import the useAuth hook

const AddInvoiceForm = ({ onInvoiceAdded }) => {
    
    const [newInvoice, setNewInvoice] = useState({
    invoice_number: "",
    date: "",
    job: "",
    description: "",
    Amount: "",
    total: ""
  });

  const [user, token] = useAuth(); // Get user information and token from useAuth

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewInvoice((prevInvoice) => ({ ...prevInvoice, [name]: value }));
  };

const handleAddInvoice = () => {
  if (!token || !(user.is_sales || user.is_cs)) {
    console.error("Unauthorized to add an invoice.");
    return;
  }

  const invoiceData = {
    customer_username: user.customer_username,
    invoice_number: newInvoice.invoice_number,
    date: newInvoice.date,
    job: newInvoice.job,
    description: newInvoice.description,
    price: newInvoice.price,
    total: newInvoice.total,
    user: user.id , // Assuming user.id is the correct property for the user's identifier
  };

  axios
    .post("http://localhost:8000/api/invoice/post/", invoiceData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      onInvoiceAdded(response.data); // Pass the new invoice data to the parent component
      setNewInvoice({
        invoice_number: "",
        date: "",
        job: "",
        description: "",
        price: "",
        total: "",
      });
    })
    .catch((error) => console.error(error));
};

  return (
    <div>
      {user &&
        (user.is_sales || user.is_cs) && ( // Check user permission
          <div>
            <h2>Add New Invoice</h2>
            <form>
              <div>
                <label>Invoice Number:</label>
                <input
                  type="text"
                  name="invoice_number"
                  value={newInvoice.invoice_number}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Date:</label>
                <input
                  type="text"
                  name="date"
                  value={newInvoice.date}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Job:</label>
                <input
                  type="text"
                  name="job"
                  value={newInvoice.job}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Description:</label>
                <input
                  type="text"
                  name="description"
                  value={newInvoice.description}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Amount:</label>
                <input
                  type="decimal"
                  name="price"
                  value={newInvoice.price}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Total:</label>
                <input
                  type="decimal"
                  name="total"
                  value={newInvoice.total}
                  onChange={handleInputChange}
                />
              </div>
              <button type="button" onClick={handleAddInvoice}>
                Add Invoice
              </button>
            </form>
          </div>
        )}
    </div>
  );
};

export default AddInvoiceForm;
