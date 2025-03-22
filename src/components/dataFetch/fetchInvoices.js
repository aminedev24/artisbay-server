import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
//import '../css/invoiceList.css';

const LoadingSpinner = () => (
  <div className="spinner-container">
    <div className="spinner"></div>
  </div>
);

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const apiUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost/artisbay-server/server"
      : "/server";

  useEffect(() => {
    fetch(`${apiUrl}/fetchInvoices.php`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        setInvoices(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);
  //invoices.forEach((invoiceData)=>{console.log(invoiceData)})

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentInvoices = invoices.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(invoices.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // When "Regenerate Invoice" is clicked,
  // navigate to the invoice form generator route with the invoice data
  const handleRegenerate = (invoice) => {
    const queryString = new URLSearchParams({
      invoiceData: JSON.stringify(invoice), 
      regenerate: true
    }).toString();
  
    window.open(`/invoice-generator?${queryString}`, "_blank");
  };
  

  if (loading) {
    return (
      <div className="profile-wrapper" style={{ alignItems: 'center' }}>
        <LoadingSpinner />      
      </div>
    );
  }
  if (error) return <p>Error: {error}</p>;
  const invoiceHeaders = ['Invoice Number', 'Customer Name', , 'Email', 'Payment Amount', 'Description', 'Date', 'Payment Purpose', 
    'Vehicle Description', 'Mileage', 'Chassis Number', 'Engine Capacity', 'Actions' ]

  const invoiceData = []

  return (
    <div className="order-list">
      <h1>Invoices List</h1>
      <table className="invoice-table" border="1">
        <thead>
          <tr>
            {invoiceHeaders.map((header)=>{
              return <th key={header}>{header}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {currentInvoices.length > 0 ? currentInvoices.map((invoice) => (
            <tr key={invoice.id}>
              <td>{invoice.invoice_number}</td>
              <td>{invoice.customer_name}</td>
              <td>{invoice.email}</td>
              <td>{parseInt(invoice.deposit_amount).toLocaleString()} {invoice.deposit_currency}</td>
              <td>{invoice.description}</td>
              <td>{invoice.created_at}</td>
              <td>{invoice.deposit_purpose}</td>
              <td>{invoice.make && invoice.model ? `${invoice.make} ${invoice.model}` : 'not specified'}</td>
              <td>{invoice.mileage || 'not specified'}</td>
              <td>{invoice.chasis_number || 'not specified'}</td>
              <td>{invoice.engine_capacity || 'not specified'}</td>
              <td>
                <button style={{
                  backgroundColor: 'var(--accent-color)',
                  color: "#fff"
                }} onClick={() => handleRegenerate(invoice)}>
                  Regenerate Invoice
                </button>
              </td>
            </tr>
          )) : (
            <tr className="border p-2">
              <td colSpan="12" className="text-center p-4">No records found.</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`pagination-button ${currentPage === index + 1 ? "active" : ""}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default InvoiceList;
