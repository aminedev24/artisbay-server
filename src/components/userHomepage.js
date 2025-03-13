import React, { useState, useEffect } from 'react';
import '../css/userHomepage.css';

// Car listings data
const carListingsData = [
  {
    id: 1,
    image: 'https://placehold.co/100x100',
    alt: 'Image of 2013 Honda Fit',
    listingNumber: '977196 R003531373',
    model: '2013 HONDA FIT GEE-1739623',
    auction: 'Auction: 2025-02-17 HONDA KYUSHU',
    buyPrice: 'Buy Price: ¥134,000',
    buttons: ['Year 2013 / 3', 'Mileage'],
    sellPrice: 'Sell Price: ¥1,710',
    balanceAmount: 'Balance Amount: ¥-1,710',
    paymentDue: 'Payment Due: 2025-03-18',
    day: 'Day: 3',
    detailsButton: 'Ship / Consignee / Documents Information'
  },
  {
    id: 2,
    image: 'https://placehold.co/100x100',
    alt: 'Image of 2013 Mazda Demio',
    listingNumber: '966922 R003404449',
    model: '2013 MAZDA DEMIO DE3FS-561903',
    auction: 'Auction: 2025-01-18 MIRIVE OSAKA',
    buyPrice: 'Buy Price: ¥156,000',
    buttons: ['Year 2013 / 11', 'Mileage'],
    sellPrice: 'Sell Price: ¥1,677',
    balanceAmount: 'Balance Amount: ¥-129',
    paymentDue: 'Payment Due: 2025-03-12',
    day: 'Day: 7',
    detailsButton: 'Ship / Consignee / Documents Information'
  }
];

// Form fields for "Purchased Car Search"
const formFields = [
  { label: "Make", type: "select", options: ["ALL"] },
  /*{ label: "Yard", type: "select", options: ["ALL"] },
  { label: "Ship", type: "select", options: ["ANY"] },
  */
  { label: "Chassis No", type: "text" },
  { label: "Name", type: "select", options: ["ALL"] },
  /*
  { label: "In Yard", type: "select", options: ["ANY"] },
  { label: "Ship Date", type: "date" },
  { label: "Yard Date", type: "date" },
  { label: "Voyage", type: "text" },
   
 
  { label: "BL No", type: "text" },
  { label: "Parts", type: "select", options: ["ANY"] },
  { label: "Ref No", type: "text" }
   */
];



const UserHomepage = () => {
  const [cars,setCars] = useState([]);
  const [showFullText, setShowFullText] = useState(false);
  const [filteredCars, setFilteredCars] = useState([]);
  const [filters, setFilters] = useState({ make: "", chassis: "", model: '', malieage: "", engineCapacity: ""  });
  const [imageSrc , setImageSrc] = useState( process.env.NODE_ENV === "development" ? `${process.env.PUBLIC_URL}` : '/inventory' )
  const apiUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost/artisbay-server/server"
    : "/server";

  useEffect(() => {
    fetch(`${apiUrl}/getSoldCars.php`, {
      credentials: "include", // 🔥 Ensures session cookies are sent
    })
      .then(response => response.json())
      .then(data => setCars(data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

 // console.log(cars)

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
      (filters.chassis === "" || car.chassis_number.toLowerCase().includes(filters.chassis.toLowerCase()))
    );

    setFilteredCars(filtered);
  }, [filters, cars]);

  
  return (
    <div className="user-homepage-container">
      {/* Header */}
      
      <h1>My Page</h1>
    

      {/* News & Updates and Important Notice */}
      <div className="grid grid-cols-2 mb-4">
        <div className="news-updates">
          <h2>News & Updates</h2>
          <ul className="list-disc pl-5">
            <li>2024/11/15 Artisbay Inc was born</li>
            <li>2024/12/02 Artisbay Inc website published</li>
            <li>Holidays from 28 December to 5 January </li>
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

      {/* Toggle "Read More" Button */}
      <button
        onClick={() => setShowFullText(!showFullText)}
        className="read-more-btn"
      >
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
              value={filters.car_model}
              onChange={handleFilterChange}
              placeholder="Enter Model"
            />
          </div>

         
        </div>
        <div className="search-buttons">
          <button className="search-btn">SEARCH</button>
          <button onClick={() => setFilters({ make: "", chassis: "" ,model: ""})} className="clear-btn">
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
                className="image"
                height="100"
                src={`${imageSrc}${car.image_urls[0]}`}
                width="100"
              />
              <div className="details">
                <div className="info">
                  <p className="subtitle">
                    {index + 1}.{car.chassis_number}
                  </p>
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
              </div>
            </div>
          ))
        ) : (
          <p>No cars found.</p>
        )}
      </div>

    </div>
  );
};

export default UserHomepage;
