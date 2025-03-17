import React, { useState, useEffect } from 'react';
import { useSearchParams } from "react-router-dom";
import '../css/userHomepage.css';
import VehicleInfo from './vehicleInformation';

const UserHomepage = () => {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [showFullText, setShowFullText] = useState(false);
  const [filteredCars, setFilteredCars] = useState([]);
  const [filters, setFilters] = useState({ make: "", chassis: "", model: "" ,ref: ""});
  const [imageSrc, setImageSrc] = useState(
    process.env.NODE_ENV === "development" ? `${process.env.PUBLIC_URL}` : '/inventory'
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const apiUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost/artisbay-server/server"
      : "/server";

  useEffect(() => {
    fetch(`${apiUrl}/getSoldCars.php`, {
      credentials: "include", // Sends session cookies
    })
      .then(response => response.json())
      .then(data => setCars(data))
      .catch(error => console.error("Error fetching data:", error));
  }, [apiUrl]);

  // Handle Filter Changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Apply Filters
  useEffect(() => {
    let filtered = cars.filter(car =>
      (filters.make === "" || car.make.toLowerCase().includes(filters.make.toLowerCase())) &&
      (filters.chassis === "" || car.chassis_number.toLowerCase().includes(filters.chassis.toLowerCase())) &&
      (filters.model === "" || car.car_model.toLowerCase().includes(filters.model.toLowerCase()))&&
      (filters.ref === "" || car.stock_id.toLowerCase().includes(filters.ref.toLowerCase()))
    );
    setFilteredCars(filtered);
  }, [filters, cars]);
  
  // If a car is selected, show the VehicleInformation component.
  if (selectedCar) {
    // You can pass the selectedCar as a prop.
    // onClose is used here to let VehicleInformation signal when to close.
    
    return <VehicleInfo selectedCar={selectedCar} onClose={() => setSelectedCar(null)} />;
  }

    // Handle selecting a car
  const handleSelectCar = (car) => {
      setSelectedCar(car);
      setSearchParams({ id: car.chassis_number }); // Update URL with car ID
  };

    // Handle closing the car details
  const handleCloseCarDetail = () => {
    setSelectedCar(null);
    setSearchParams({}); // Remove ID from URL
  };

  return (
    <div className="user-homepage-container">
      {selectedCar ? (
        <VehicleInfo car={selectedCar} onClose={handleCloseCarDetail} />
      ) : (
      <>     

      <h1>My Account</h1>

      {/* News & Updates and Important Notice */}
      <div className="grid grid-cols-2 mb-4">
        <div className="news-updates">
          <h2>News & Updates</h2>
          <ul className="list-disc pl-5">
            <li>2024/11/15 Artisbay Inc was born</li>
            <li>2024/12/02 Artisbay Inc website published</li>
            <li>Holidays from 28 December to 5 January</li>
          </ul>
        </div>
        <div className="important-notice">
          <h2>IMPORTANT (PURPOSE OF MONEY TRANSFER)</h2>
          <p><strong>Dear customers!</strong></p>
          {showFullText ? (
            <p>
              When you transfer money to our bank account (TT), please indicate the purpose of money transfer as “CAR” or "CAR PAYMENT".
              From now on, Japanese banks will start checking incoming payments more strictly. If the purpose of the payment is not clearly indicated on the transfer, the banks will hold the payment for inspection before sending it to our account.
              Even if the payment has already arrived in Japan, it may take several days before the money reaches our account. This may cause delays in processing documents or shipments.
              To receive payments without delay, please do not forget to indicate the purpose of the money transfer when making the payment.
            </p>
          ) : (
            <p>
              When you transfer money to our bank account (TT), please indicate the purpose of....
            </p>
          )}
          <button onClick={() => setShowFullText(!showFullText)} className="read-more-btn">
            {showFullText ? "Read Less" : "Read More"}
          </button>
        </div>
      </div>

      {/* Purchased Car Search */}
      <div className="purchased-car-search mb-4">
        <h2>Purchased Car Search</h2>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {/* Make Filter */}
          <div>
            <label>Make</label>
            <input
              type="text"
              name="make"
              value={filters.make}
              onChange={handleFilterChange}
              placeholder="Enter Make"
            />
          </div>
          {/* Chassis No Filter */}
          <div>
            <label>Chassis No</label>
            <input
              type="text"
              name="chassis"
              value={filters.chassis}
              onChange={handleFilterChange}
              placeholder="Enter Chassis No"
            />
          </div>
          {/* Model Filter */}
          <div>
            <label>Model</label>
            <input
              type="text"
              name="model"
              value={filters.model}
              onChange={handleFilterChange}
              placeholder="Enter Model"
            />
          </div>
          <div>
            <label>Ref No</label>
            <input
              type="text"
              name="ref"
              value={filters.ref}
              onChange={handleFilterChange}
              placeholder="Enter Ref No"
            />
          </div>
        </div>
        <div className="search-buttons">
          <button className="search-btn">SEARCH</button>
          <button onClick={() => setFilters({ make: "", chassis: "", model: "" })} className="clear-btn">
            CLEAR
          </button>
        </div>
      </div>

      {/* Car Listings */}
      <div>
        {filteredCars.length > 0 ? (
          filteredCars.map((car, index) => (
            <div className="car-listings mb-4" key={car.car_id}>
              <img
                alt={car.alt}
                className="image cursor-pointer"
                height="100"
                src={`${imageSrc}${car.image_urls[0]}`}
                width="100"
                onClick={() => handleSelectCar(car)}
              />
              <div className="details">
                <div className="info">
                  <p className="subtitle">{index + 1}.{car.stock_id}</p>
                  <p className="title">{car.make}</p>
                  <p className="subtitle">{car.car_model}</p>
                  <p className="subtitle">
                    {car.price.toLocaleString()}
                    {car.currency}
                  </p>
                </div>
              </div>
              <div className="price-info">
                <p className="price">
                  Engine Capacity: <span>{car.engine_capacity.toLocaleString()}cc</span>
                </p>
                <p className="price">
                  Mileage: <span>odo {car.mileage.toLocaleString()}km</span>
                </p>
                <p className="price">
                  Chassis No: <span>{car.chassis_number}</span>
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No cars found.</p>
        )}
      </div>
    
    </>
)}
</div>
      
  );
};

export default UserHomepage;
