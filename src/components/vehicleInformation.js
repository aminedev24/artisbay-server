import React, { useState, useEffect } from 'react';
import "../css/vehicleInfo.css";

const VehicleInfo = ({onClose, selectedCar}) => {
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState(null);
  const [imageSrc, setImageSrc] = useState(
    process.env.NODE_ENV === "development" ? `${process.env.PUBLIC_URL}` : '/inventory'
  );
  const apiUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost/artisbay-server/server"
      : "/server";

  useEffect(() => {
    fetch(`${apiUrl}/getSoldCars.php`, {
      credentials: "include", // if your PHP uses session authentication
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          setCar(data[0]); // display the first car from the results
          setMainImage(`${imageSrc}${data[0].image_urls[0]}`);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching car data:", error);
        setLoading(false);
      });
  }, [apiUrl, imageSrc]);

  if (loading) return <p>Loading...</p>;
  if (!car) return <p>No car data available.</p>;

  const { chassis_number, make, car_model, engine_capacity, mileage, price, currency, image_urls } = selectedCar;

  return (
    <div className='vehicle-info-wrapper'>
    <button className="btn btn-secondary" onClick={onClose}>Go Back</button>
    <div className="vehicle-info-container">
      <div className="card">
        

        <div className="left-panel">
          {/* Main Image */}
          <div className='img-container'>
            {mainImage ? (
              <img
                src={mainImage}
                alt="Front view of the car"
                className="main-image"
              />
            ) : (
              <p>No main image available.</p>
            )}
            <p className="text-center">Artisbay Inc. - Ref No {chassis_number}</p>
          </div>
        
          <div className="thumbnail-grid">
            {image_urls.map((imgUrl, index) => (
              <img
                key={index}
                src={`${imageSrc}${imgUrl}`}
                alt={`Thumbnail ${index + 1}`}
                className="thumbnail"
                onClick={() => setMainImage(`${imageSrc}${imgUrl}`)}
              />
            ))}
          </div>
        </div>
        <div className="right-panel">
          <h2>Ref Number #{chassis_number}</h2>
          <p className="price">{currency}{price.toLocaleString()}</p>
          <h3>Vehicle Information</h3>
          <table className="info-table">
            <tbody>
              <tr><th>Make</th><td>{make}</td><th>Ref No</th><td>{chassis_number}</td></tr>
              <tr><th>Model</th><td>{car_model}</td><th>Engine Capacity</th><td>{engine_capacity.toLocaleString()} cc</td></tr>
              <tr><th>Mileage</th><td>odo {mileage.toLocaleString()}km</td></tr>
            </tbody>
          </table>
          {/*
             <h3>Options / Equipment</h3>
             <table className="options-table">
               <tbody>
                 <tr><td>Air Bag</td><td>ABS</td><td>Air Conditioner</td><td>Alloy Wheels</td></tr>
                 <tr><td>Power Steering</td><td>Power Windows</td><td>Push Start</td><td>Sun Roof</td></tr>
               </tbody>
             </table>
          */}
         
        </div>
      </div>
    </div>
    </div>
  );
};

export default VehicleInfo;
