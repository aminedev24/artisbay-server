import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
//import "./InvoiceList.css"; // import the external CSS file

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

  // New filter states (invoice number, description, date, payment purpose)
  const [invoiceNumberFilter, setInvoiceNumberFilter] = useState("");
  const [descriptionFilter, setDescriptionFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [paymentPurposeFilter, setPaymentPurposeFilter] = useState("");

  const apiUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost/artisbay-backup/server"
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
        // Sort invoices by created_at in descending order (recent to old)
        const sortedData = data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setInvoices(sortedData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  // Filter invoices using multiple filters (excluding customer name and email)
  const filteredInvoices = invoices.filter((invoice) => {
    const invoiceNumberMatch = invoice.invoice_number
      .toLowerCase()
      .includes(invoiceNumberFilter.toLowerCase());
    const descriptionMatch = invoice.description
      .toLowerCase()
      .includes(descriptionFilter.toLowerCase());
    const dateMatch = invoice.created_at
      .toLowerCase()
      .includes(dateFilter.toLowerCase());
    const paymentPurposeMatch = invoice.deposit_purpose
      .toLowerCase()
      .includes(paymentPurposeFilter.toLowerCase());
    return invoiceNumberMatch && descriptionMatch && dateMatch && paymentPurposeMatch;
  });

  // Pagination logic: Slice filtered invoices array
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentInvoices = filteredInvoices.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // When "Regenerate Invoice" is clicked, navigate to invoice generator route with invoice data
  const handleRegenerate = (invoice) => {
    sessionStorage.setItem("invoiceData", JSON.stringify(invoice));
    const queryString = new URLSearchParams({
      regenerate: true,
    }).toString();
    window.open(`/invoice-generator?${queryString}`, "_blank");
  };

  if (loading) {
    return (
      <div className="profile-wrapper" style={{ alignItems: "center" }}>
        <LoadingSpinner />
      </div>
    );
  }
  if (error) return <p>Error: {error}</p>;

  const invoiceHeaders = [
    "Invoice Number",
    "Customer Name",
    "Email",
    "Payment Amount",
   // "Description",
    "Date",
    "Payment Purpose",
    "Vehicle Description",
    "Mileage",
    "Chassis Number",
    "Engine Capacity",
    "Actions",
  ];

  return (
    <div className="order-list">
      <h1>Invoices List</h1>

      {/* Filter container */}
      <div className="filter-container invoice-list">
        <div className="form-group">
          <label htmlFor="filterNumber">Filter by invoice number</label>
          <input
            type="text"
            name='filterNumber'
            placeholder="Filter by Invoice Number"
            value={invoiceNumberFilter}
            onChange={(e) => {
              setInvoiceNumberFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="filter-input"
          />
        </div>
        
        <div className='form-group'>
          <label htmlFor="filterNumber">Filter by description</label>
          <input
            type="text"
            name='byDescription'
            placeholder="Filter by Description"
            value={descriptionFilter}
            onChange={(e) => {
              setDescriptionFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="filter-input"
          />

        </div>
       <div className="form-group">
        <label htmlFor="byDate">Filter by date</label>
          <input
            name="byDate"
            type="text"
            placeholder="Filter by Date"
            value={dateFilter}
            onChange={(e) => {
              setDateFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="filter-input"
          />

       </div>
       <div className='form-group'>
        <label htmlFor="byPurpose">Filter by purpose</label>
          <input
            name="byPurpose"
            type="text"
            placeholder="Filter by Payment Purpose"
            value={paymentPurposeFilter}
            onChange={(e) => {
              setPaymentPurposeFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="filter-input"
          />
       </div>
       
      </div>

      <table className="invoice-table" border="1">
        <thead>
          <tr>
            {invoiceHeaders.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentInvoices.length > 0 ? (
            currentInvoices.map((invoice) => (
              <tr key={invoice.id}>
                <td>{invoice.invoice_number}</td>
                <td>{invoice.customer_name}</td>
                <td>{invoice.email}</td>
                <td>
                  {parseInt(invoice.deposit_amount).toLocaleString()}{" "}
                  {invoice.deposit_currency}
                </td>
                {/*<td>{invoice.description}</td>*/}
                <td>{invoice.created_at}</td>
                <td>{invoice.deposit_purpose}</td>
                <td>
                  {invoice.make && invoice.model
                    ? `${invoice.make} ${invoice.model}`
                    : "not specified"}
                </td>
                <td>{invoice.mileage || "not specified"}</td>
                <td>{invoice.chasis_number || "not specified"}</td>
                <td>{invoice.engine_capacity || "not specified"}</td>
                <td>
                  <button
                    style={{ backgroundColor: "var(--accent-color)", color: "#fff" }}
                    onClick={() => handleRegenerate(invoice)}
                  >
                    Regenerate Invoice
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr className="border p-2">
              <td colSpan="12" className="text-center p-4">
                No records found.
              </td>
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
