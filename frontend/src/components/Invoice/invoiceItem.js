
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const InvoiceItem = ({ invoice, user }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [invoiceDetails, setInvoiceDetails] = useState(null);

//   const toggleAccordion = () => {
//     setIsOpen(!isOpen);
//   };

//   const fetchInvoiceDetails = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:8000/api/invoice/${invoice.id}`
//       );
//       setInvoiceDetails(response.data);
//     } catch (error) {
//       console.error("Error fetching invoice details: ", error);
//     }
//   };

//   useEffect(() => {
//     if (isOpen && !invoiceDetails) {
//       fetchInvoiceDetails();
//     }
//   }, [isOpen, invoiceDetails]);

//   const renderButtons = () => {
//     // Check user permissions for delete or edit buttons
//     if (user && (user.is_sales || user.is_cs)) {
//       return (
//         <div className="invoice-buttons">
//           {user.is_sales && <button>Edit</button>}
//           {user.is_cs && <button>Delete</button>}
//         </div>
//       );
//     }
//     return null;
//   };

//   return (
//     <div className="invoice-item">
//       <div className="invoice-header" onClick={toggleAccordion}>
//         <h3>{invoice.title}</h3>
//       </div>
//       {isOpen && (
//         <div className="invoice-details">
//           {invoiceDetails ? (
//             <>
//               <p>Number: {invoiceDetails.invoice.invoice_number}</p>
//               <p>Date: {invoiceDetails.date}</p>
//               <p>Job: {invoiceDetails.job}</p>
//               <p>Description: {invoiceDetails.description}</p>
//               <p>Amount: ${invoiceDetails.price}</p>
//               {renderButtons()} {/* Render delete or edit buttons */}
//             </>
//           ) : (
//             <p>Loading invoice details...</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default InvoiceItem;