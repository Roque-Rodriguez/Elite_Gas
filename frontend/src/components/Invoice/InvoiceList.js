import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, token] = useAuth(); // Get user information and token from useAuth
  const [expandedInvoice, setExpandedInvoice] = useState(null); // State to track expanded invoice

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        if (!token) {
          console.error("Bearer token not found.");
          setIsLoading(false);
          return;
        }

        const response = await axios.get(
          "http://localhost:8000/api/invoice/all/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setInvoices(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching invoices: ", error);
        setIsLoading(false);
      }
    };

    fetchInvoices();
  }, [token]);

  const handleToggleInvoice = (invoiceId) => {
    setExpandedInvoice(expandedInvoice === invoiceId ? null : invoiceId);
  };

  const handleDeleteInvoice = (invoiceId) => {
    if (!token) {
      console.error("Bearer token not found.");
      return;
    }

    axios
      .delete(`http://localhost:8000/api/invoice/delete/${invoiceId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        console.log(`Deleted invoice with ID: ${invoiceId}`);
      })
      .catch((error) => {
        console.error(`Error deleting invoice with ID: ${invoiceId}`, error);
      });
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {invoices.map((invoice) => (
            <div key={invoice.invoice_number}>
              <h3
                onClick={() => handleToggleInvoice(invoice.id)}
                style={{
                  color: "blue",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                {invoice.invoice_number}
              </h3>
              {expandedInvoice === invoice.id && (
                <div>
                  <p>Number: {invoice.invoice_number}</p>
                  <p>Date: {invoice.date}</p>
                  <p>Job: {invoice.job}</p>
                  <p>Description: {invoice.description}</p>
                  <p>Amount: {invoice.price}</p>
                  {user && (user.is_sales || user.is_cs) && (
                    <div>
                      <button
                        onClick={() =>
                          handleDeleteInvoice(invoice.invoice_number)
                        }
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InvoiceList;
