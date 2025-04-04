import React, { useEffect, useState } from "react";
//import "./TireOrderList.css"; // Import CSS file for styling
const LoadingSpinner = () => (
  <div className="spinner-container">
    <div className="spinner"></div>
  </div>
);

const TireOrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of items per page

  const apiUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost/artisbay-server/server"
      : "/server";

      useEffect(() => {
        fetch(`${apiUrl}/fetchTireOrders.php`, {
          method: "GET", // Optional: specify the HTTP method
          credentials: "include", // Include credentials such as cookies
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to fetch data");
            }
            return response.json();
          })
          .then((data) => {
            setOrders(data);
            setLoading(false);
          })
          .catch((err) => {
            setError(err.message);
            setLoading(false);
          });
      }, []);
      

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(orders.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return (
      <div style={{alignItems : loading ? 'center' : '' }} className="profile-wrapper">
        <LoadingSpinner />      
      </div>
    )
  }

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="order-list">
      <h1>Submitted Tire Orders</h1>
      <table border="1">
        <thead>
          <tr>
            <th>Make</th>
            <th>Type</th>
            <th>Size</th>
            <th>Quantity</th>
            <th>Speed Rating</th>
            <th>Load Index</th>
            <th>Order Date</th>
          </tr>
        </thead>
        <tbody>
          {currentOrders.length > 0 ? currentOrders.map((order) => (
            <tr key={order.id}>
              <td>{order.make}</td>
              <td>{order.type}</td>
              <td>{`${order.width}/${order.aspect_ratio}R${order.rim_diameter}`}</td>
              <td>{order.quantity}</td>
              <td>{order.speed_rating || "N/A"}</td>
              <td>{order.load_index || "N/A"}</td>
              <td>{order.order_date}</td>
            </tr>
          )): (
            <td colSpan="8" className="text-center p-4">
                No records found.
              </td>
          )}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`pagination-button ${
              currentPage === index + 1 ? "active" : ""
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TireOrderList;
