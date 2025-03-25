import React, { useState, useEffect } from 'react';
import "../../css/vehicle/vehicleInfo.css";

const VehicleInfo = ({onClose, selectedCar}) => {
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState(null);
  const [imageSrc, setImageSrc] = useState(
    process.env.NODE_ENV === "development" ? `${process.env.PUBLIC_URL}` : '/inventory'
  );
  const apiUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost/artisbay-backup/server"
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

  const { chassis_number, make, car_model, engine_capacity, mileage, price, currency, image_urls , stock_id,
     color, year, size, dimension, consignee, address, phone, company} = selectedCar;

  //console.log(selectedCar)
  const vehicleInfo = [
    { title: "Ref No.", value: stock_id },
    { title: "Make", value: make },
    { title: "Model", value: car_model },
    { title: "Price", value: `FOB ${price.toLocaleString()}${currency}` },
    { title: "Category", value: "" },
    { title: "Color", value: color },
    { title: "Year", value: year },
    { title: "Dimension (L*W*H)", value: `${dimension} (cm)` },
    { title: "M3", value: `${parseInt(size).toLocaleString()} m3` },
  
  ];

  const engineInfo = [
    { title: "Engine Capacity", value: `${engine_capacity.toLocaleString()}cc` },
    { title: "Mileage", value: `odo ${mileage.toLocaleString()}km` },
    { title: "Chassis No.", value: chassis_number },
    { title: "Fuel", value: "" },
    { title: "Door", value: "" },
    { title: "Seat", value: "" },
    { title: "Transmission", value: "" },
    { title: "Drive", value: "" },
    { title: "Stereo", value: "" }
  ];


  const shipInfoLeft = [
    { title: "Ship Name", value: "" },
    { title: "Ship Date", value: "" },
    { title: "Departure Port", value: "" },
    { title: "Tracking URL", value: "" }
  ];
  
  const shipInfoRight = [
    { title: "Voyage", value: "" },
    { title: "N/A", value: "", hidden: true }, // Hidden title
    { title: "Arrival Port", value: "" },
    { title: "N/A", value: "", hidden: true } // Hidden title
  ];

  const consigneeInfoLeft = [
    { title: "Consignee", value: company },
    { title: "Adress", value: address }, // Hidden title
    { title: "Telephone", value: phone },
  ];


  const InfoColumn = ({ data }) => (
    <div className="info-column">
      {data.map((item, index) => (
        <div className="info-item" key={index}>
          <div  style={item.hidden ? { visibility: "hidden" } : {}} className="info-title">{item.title}</div>
          <div className="info-value">{item.value}</div>
        </div>
      ))}
    </div>
  );

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
            <p className="text-center">Artisbay Inc. - Ref No {stock_id}</p>
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
          <h2>Ref Number #{stock_id}</h2>
          <p className="price">FOB {currency}{price.toLocaleString()}</p>
          <h3>Vehicle Information</h3>

      
          <div className="vehicle-information-container">
            <div className="info-container">
              <InfoColumn data={vehicleInfo} />
              <InfoColumn data={engineInfo} />
            </div>
          </div>
          {/*
             <h3>Options / Equipment</h3>
             <table className="options-table">
               <tbody>
                 <tr><td>Air Bag</td><td>ABS</td><td>Air Conditioner</td><td>Alloy Wheels</td></tr>
                 <tr><td>Power Steering</td><td>Power Windows</td><td>Push Start</td><td>Sun Roof</td></tr>
               </tbody>
             </table>
          */}
         
         <div className='vehicle-information-container'>
          <h3>Ship Information</h3>
          <div className='info-container'>
            <InfoColumn data={shipInfoLeft} />
            <InfoColumn data={shipInfoRight} />
          </div>
         </div>

         <div className='vehicle-information-container'>
          <h3>consignee Information</h3>
          <div className='info-container'>
            <InfoColumn data={consigneeInfoLeft} />
          </div>
         </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default VehicleInfo;
