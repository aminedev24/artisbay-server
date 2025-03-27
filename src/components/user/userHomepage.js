import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from "react-router-dom";
import CreatableSelect from 'react-select/creatable';
import '../../css/user/userHomepage.css';
import VehicleInfo from '../vehicles/vehicleInformation';

const UserHomepage = () => {
  // Filters state includes text-based filters and numeric range filters.
  const [filters, setFilters] = useState({ 
    make: "", 
    chassis: "", 
    model: "", 
    ref: "",
    priceFrom: "",
    priceTo: "",
    yearFrom: "",
    yearTo: ""
  });

  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [showFullText, setShowFullText] = useState(false);
  const [filteredCars, setFilteredCars] = useState([]);
  const [imageSrc, setImageSrc] = useState(
    process.env.NODE_ENV === "development" 
      ? `${process.env.PUBLIC_URL}` 
      : '/inventory'
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const apiUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost/artisbay-backup/server"
      : "/server";

  useEffect(() => {
    fetch(`${apiUrl}/getSoldCars.php`, {
      credentials: "include",
    })
      .then(response => response.json())
      .then(data => setCars(data))
      .catch(error => console.error("Error fetching data:", error));
  }, [apiUrl]);

  // Compute distinct values for text-based filters.
  const distinctMakes = useMemo(() => [...new Set(cars.map(car => car.make))], [cars]);
  const distinctChassis = useMemo(() => [...new Set(cars.map(car => car.chassis_number))], [cars]);
  const distinctModels = useMemo(() => [...new Set(cars.map(car => car.car_model))], [cars]);
  const distinctRefs = useMemo(() => [...new Set(cars.map(car => car.stock_id))], [cars]);

  // Compute distinct price values and years (numeric arrays).
  const distinctPrices = useMemo(() => {
    const prices = cars.map(car => Number(car.price));
    return [...new Set(prices)].sort((a, b) => a - b);
  }, [cars]);

  const distinctYears = useMemo(() => {
    const years = cars.map(car => Number(car.year));
    return [...new Set(years)].sort((a, b) => a - b);
  }, [cars]);

  // Prepare options for react-select (Creatable) components.
  const makeOptions = useMemo(() => distinctMakes.map(make => ({ value: make, label: make })), [distinctMakes]);
  const chassisOptions = useMemo(() => distinctChassis.map(chassis => ({ value: chassis, label: chassis })), [distinctChassis]);
  const modelOptions = useMemo(() => distinctModels.map(model => ({ value: model, label: model })), [distinctModels]);
  const refOptions = useMemo(() => distinctRefs.map(ref => ({ value: ref, label: ref })), [distinctRefs]);

  // Update filters state when a select value changes.
  const handleSelectChange = (name, selectedOption) => {
    const newValue = selectedOption ? selectedOption.value : "";
    setFilters(prev => ({
      ...prev,
      [name]: newValue,
    }));
  };

  // Update filters for numeric inputs.
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Apply filters to the car list.
  useEffect(() => {
    const filtered = cars.filter(car =>
      (filters.make === "" || car.make.toLowerCase().includes(filters.make.toLowerCase())) &&
      (filters.chassis === "" || car.chassis_number.toLowerCase().includes(filters.chassis.toLowerCase())) &&
      (filters.model === "" || car.car_model.toLowerCase().includes(filters.model.toLowerCase())) &&
      (filters.ref === "" || car.stock_id.toLowerCase().includes(filters.ref.toLowerCase())) &&
      (filters.priceFrom === "" || Number(car.price) >= Number(filters.priceFrom)) &&
      (filters.priceTo === "" || Number(car.price) <= Number(filters.priceTo)) &&
      (filters.yearFrom === "" || Number(car.year) >= Number(filters.yearFrom)) &&
      (filters.yearTo === "" || Number(car.year) <= Number(filters.yearTo))
    );
    setFilteredCars(filtered);
  }, [filters, cars]);

  // Handle selecting a car.
  const handleSelectCar = (car) => {
    setSelectedCar(car);
    setSearchParams({ id: car.chassis_number });
  };

  const handleCloseCarDetail = () => {
    setSelectedCar(null);
    setSearchParams({});
  };

  if (selectedCar) {
    return <VehicleInfo selectedCar={selectedCar} onClose={handleCloseCarDetail} />;
  }

  return (
    <div className="user-homepage-container">
      <>
        <h1>My Account</h1>

        {/* News & Updates and Important Notice */}
        <div className="grid grid-cols-2 mb-4">
          <div className="news-updates">
            <h2>News & Updates</h2>
            <ul className="list-disc pl-5">
              <li>2024/11/15 Artisbay Inc was born</li>
              <li>2024/12/02 Artisbay Inc website published</li>
              <li>25/03/01 Artisbay Inc. moved to Yokohama</li>
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
          {/* Text-based filters using CreatableSelect for combobox behavior */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <label>Make</label>
              <CreatableSelect
                options={makeOptions}
                value={filters.make ? { value: filters.make, label: filters.make } : null}
                onChange={(option) => handleSelectChange('make', option)}
                placeholder="Select or type Make"
                isClearable
              />
            </div>
            <div>
              <label>Chassis No</label>
              <CreatableSelect
                options={chassisOptions}
                value={filters.chassis ? { value: filters.chassis, label: filters.chassis } : null}
                onChange={(option) => handleSelectChange('chassis', option)}
                placeholder="Select or type Chassis No"
                isClearable
              />
            </div>
            <div>
              <label>Model</label>
              <CreatableSelect
                options={modelOptions}
                value={filters.model ? { value: filters.model, label: filters.model } : null}
                onChange={(option) => handleSelectChange('model', option)}
                placeholder="Select or type Model"
                isClearable
              />
            </div>
            <div>
              <label>Ref No</label>
              <CreatableSelect
                options={refOptions}
                value={filters.ref ? { value: filters.ref, label: filters.ref } : null}
                onChange={(option) => handleSelectChange('ref', option)}
                placeholder="Select or type Ref No"
                isClearable
              />
            </div>
          </div>

          {/* Numeric filters for Price and Year with your desired structure */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div className='year-group'>
              <div className='form-group'>
                <label>Price From</label>
                <input
                  type="number"
                  name="priceFrom"
                  value={filters.priceFrom}
                  onChange={handleFilterChange}
                  placeholder="Min Price"
                  list="priceFromList"
                />
                <datalist id="priceFromList">
                  {distinctPrices.map(price => (
                    <option key={price} value={price} />
                  ))}
                </datalist>
              </div>
              <div className='form-group'>
                <label>Price To</label>
                <input
                  type="number"
                  name="priceTo"
                  value={filters.priceTo}
                  onChange={handleFilterChange}
                  placeholder="Max Price"
                  list="priceToList"
                />
                <datalist id="priceToList">
                  {distinctPrices.map(price => (
                    <option key={price} value={price} />
                  ))}
                </datalist>
              </div>
            </div>
          
            <div className='year-group'>
              <div className='form-group'>
                <label>Year From</label>
                <input
                  type="number"
                  name="yearFrom"
                  value={filters.yearFrom}
                  onChange={handleFilterChange}
                  placeholder="Min Year"
                  list="yearFromList"
                />
                <datalist id="yearFromList">
                  {distinctYears.map(year => (
                    <option key={year} value={year} />
                  ))}
                </datalist>
              </div>
              <div className='form-group'>
                <label>Year To</label>
                <input
                  type="number"
                  name="yearTo"
                  value={filters.yearTo}
                  onChange={handleFilterChange}
                  placeholder="Max Year"
                  list="yearToList"
                />
                <datalist id="yearToList">
                  {distinctYears.map(year => (
                    <option key={year} value={year} />
                  ))}
                </datalist>
              </div>
            </div>
          </div>

          <div className="search-buttons">
            <button className="search-btn">SEARCH</button>
            <button
              onClick={() =>
                setFilters({ make: "", chassis: "", model: "", ref: "", priceFrom: "", priceTo: "", yearFrom: "", yearTo: "" })
              }
              className="clear-btn"
            >
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
                    <p className="title">{index + 1}.{car.stock_id}</p>
                    <p className="title">{car.make}</p>
                    <p className="subtitle">{car.car_model}</p>
                    <p className="subtitle">
                     FOB {car.price.toLocaleString()} {car.currency}
                    </p>
                  </div>
                </div>
                <div className="price-info">
                  <p className="price">
                    Engine Capacity: <span> {car.engine_capacity.toLocaleString()}cc</span>
                  </p>
                  <p className="price">
                    Mileage: <span>odo {car.mileage.toLocaleString()}km</span>
                  </p>
                  <p className="price">
                    Year: <span>{car.year}</span>
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>No cars found.</p>
          )}
        </div>
      </>
    </div>
  );
};

export default UserHomepage;
