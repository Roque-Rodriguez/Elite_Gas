import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, token] = useAuth(); // Get user information and token from useAuth
  const [expandedInvoice, setExpandedInvoice] = useState(null); // State to track expanded invoice
  const [editingInvoice, setEditingInvoice] = useState(null); // State to track which invoice is being edited
  const [editedInvoiceData, setEditedInvoiceData] = useState({
    id: null, // Include the ID
    customer_username: "", // Include customer_username
    date: "",
    job: "",
    description: "",
    price: "",
    total: "",
    user: user.id, // Include user.id
  });

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

  const handleToggleInvoice = (invoice_id) => {
    setExpandedInvoice(expandedInvoice === invoice_id ? null : invoice_id);
    setEditingInvoice(null); // Reset editing when toggling
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

  const handleEditInvoice = (invoiceId) => {
    debugger
    setEditingInvoice(invoiceId);
    const invoiceToEdit = invoices.find((invoice) => invoice.id === invoiceId);
    setEditedInvoiceData({
      id: invoiceId, // Set the ID
      customer_username: user.username, // Set customer_username
      date: invoiceToEdit.date,
      job: invoiceToEdit.job,
      description: invoiceToEdit.description,
      price: invoiceToEdit.price,
      total: invoiceToEdit.total,
      user: user.id, // Set user.id
    });
  };

const handleSaveInvoice = (invoiceId) => {
  const updatedInvoiceData = {
    date: editedInvoiceData.date,
    job: editedInvoiceData.job,
    description: editedInvoiceData.description,
    price: editedInvoiceData.price, // Correct field name
    total: editedInvoiceData.total,
    user: editedInvoiceData.user, // Assuming user is an object, not just an ID
    customer_username: editedInvoiceData.customer_username,
  };

  if (!token) {
    console.error("Bearer token not found.");
    return;
  }
debugger
  axios
    .put(
      `http://localhost:8000/api/invoice/put/${invoiceId}/`,
      updatedInvoiceData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then(() => {
      console.log(updatedInvoiceData);
      console.log(`Updated invoice with ID: ${invoiceId}`);
      setEditingInvoice(null);
    })
    .catch((error) => {
      console.error(`Error updating invoice with ID: ${invoiceId}`, error);
    });
};



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedInvoiceData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
                {invoice.invoice_number}
              </h3>
              {expandedInvoice === invoice.id && (
                <div>
                  {editingInvoice === invoice.id ? (
                    <div>
                      <label>Date:</label>
                      <input
                        type="text"
                        name="date"
                        value={editedInvoiceData.date}
                        onChange={handleInputChange}
                      />
                      <label>Job:</label>
                      <input
                        type="text"
                        name="job"
                        value={editedInvoiceData.job}
                        onChange={handleInputChange}
                      />
                      <label>Description:</label>
                      <input
                        type="text"
                        name="description"
                        value={editedInvoiceData.description}
                        onChange={handleInputChange}
                      />
                      <label>Amount:</label>
                      <input
                        type="text"
                        name="price"
                        value={editedInvoiceData.amount}
                        onChange={handleInputChange}
                      />
                      <label>Total:</label>
                      <input
                        type="text"
                        name="total"
                        value={editedInvoiceData.total}
                        onChange={handleInputChange}
                      />
                      <button onClick={() => handleSaveInvoice(invoice.id)}>
                        Save
                      </button>
                    </div>
                  ) : (
                    <div>
                      <p>Date: {invoice.date}</p>
                      <p>Job: {invoice.job}</p>
                      <p>Description: {invoice.description}</p>
                      <p>Amount: {invoice.price}</p>
                      <p>Total: {invoice.total}</p>
                      {user && (user.is_sales || user.is_cs) && (
                        <div>
                          <button
                            onClick={() => handleDeleteInvoice(invoice.id)}
                          >
                            Delete
                          </button>
                          <button onClick={() => handleEditInvoice(invoice.id)}>
                            Edit
                          </button>
                        </div>
                      )}
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

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import useAuth from "../../hooks/useAuth";

// const InvoiceList = () => {
//   const [invoices, setInvoices] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [user, token] = useAuth(); // Get user information and token from useAuth
//   const [expandedInvoice, setExpandedInvoice] = useState(null); // State to track expanded invoice

//   useEffect(() => {
//     const fetchInvoices = async () => {
//       try {
//         if (!token) {
//           console.error("Bearer token not found.");
//           setIsLoading(false);
//           return;
//         }

//         const response = await axios.get(
//           "http://localhost:8000/api/invoice/all/",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         setInvoices(response.data);
//         setIsLoading(false);
//       } catch (error) {
//         console.error("Error fetching invoices: ", error);
//         setIsLoading(false);
//       }
//     };

//     fetchInvoices();
//   }, [token]);

//   const handleToggleInvoice = (invoice_id) => {
//     setExpandedInvoice(expandedInvoice === invoice_id ? null : invoice_id);
//   };

//   const handleDeleteInvoice = (invoiceId) => {
//     debugger;
//     if (!token) {
//       console.error("Bearer token not found.");
//       return;
//     }

//     axios
//       .delete(`http://localhost:8000/api/invoice/delete/${invoiceId}/`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then(() => {
//         console.log(`Deleted invoice with ID: ${invoiceId}`);
//       })
//       .catch((error) => {
//         console.error(`Error deleting invoice with ID: ${invoiceId}`, error);
//       });
//   };

//   return (
//     <div>
//       {isLoading ? (
//         <p>Loading...</p>
//       ) : (
//         <div>
//           {invoices.map((invoice) => (
//             <div key={invoice.id}>
//               <h3
//                 onClick={() => handleToggleInvoice(invoice.id)}
//                 style={{
//                   color: "blue",
//                   textDecoration: "underline",
//                   cursor: "pointer",
//                 }}
//               >
//                 {invoice.invoice_number}
//               </h3>
//               {expandedInvoice === invoice.id && (
//                 <div>
//                   <p>Number: {invoice.invoice_number}</p>
//                   <p>Date: {invoice.date}</p>
//                   <p>Job: {invoice.job}</p>
//                   <p>Description: {invoice.description}</p>
//                   <p>Amount: {invoice.price}</p>
//                   {user && (user.is_sales || user.is_cs) && (
//                     <div>
//                       <button
//                         onClick={
//                           () => handleDeleteInvoice(invoice.id) // Use invoice.id here
//                         }
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default InvoiceList;
