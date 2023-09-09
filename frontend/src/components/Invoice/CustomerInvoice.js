import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, token] = useAuth(); // Get user information and token from useAuth
  const [expandedInvoice, setExpandedInvoice] = useState(null); // State to track expanded invoice

  useEffect(() => {
    let isMounted = true;

    const fetchInvoices = async () => {
      try {
        if (!token) {
          console.error("Bearer token not found.");
          setIsLoading(false);
          return;
        }

        const response = await axios.get(
          `http://localhost:8000/api/invoice/user/${user.id}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (isMounted) {
          if (Array.isArray(response.data.invoices)) {
            setInvoices(response.data.invoices); // Access the "invoices" property
          } else {
            console.error("Invalid data format for invoices:", response.data);
          }
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching invoices: ", error);

        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchInvoices();

    return () => {
      isMounted = false;
    };
  }, [token, user.id]);

  const handleToggleInvoice = (invoice_id) => {
    // Toggle the expandedInvoice state based on the clicked invoice_id
    setExpandedInvoice((prevExpandedInvoice) =>
      prevExpandedInvoice === invoice_id ? null : invoice_id
    );
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {invoices.map((invoice) => (
            <div key={invoice.id}>
              <h3
                onClick={() => handleToggleInvoice(invoice.id)}
                style={{
                  color: "blue",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                Invoice Number: {invoice["Invoice Number"]}
              </h3>
              {expandedInvoice === invoice.id && (
                <div>
                  <p>Date: {invoice.Date}</p>
                  <p>Invoice Number: {invoice["Invoice Number"]}</p>
                  <p>Job: {invoice.Job}</p>
                  <p>Description: {invoice.Description}</p>
                  <p>Price: {invoice.Price}</p>
                  <p>Total: {invoice.Total}</p>
                  <p>User ID: {user.id}</p>
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
