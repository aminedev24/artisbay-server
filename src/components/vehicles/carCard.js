import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/vehicle/carCard.css';

const CarCard = ({ car }) => {
  return (
    <div className="car-card">
      <img src={car.image} alt={car.name} />
      <div style={{display: 'flex' , alignItems: 'baseline',gap: '5px'}}>
        <strong>Make:</strong><p>{car.name}</p>
      </div>

      <div style={{display: 'flex' , alignItems: 'baseline',gap: '5px'}}>
        <strong>Model: </strong><p>{car.model}</p>
      </div>

      <div style={{display: 'flex' , alignItems: 'baseline',gap: '5px'}}>
        <strong>Engine Capacity: </strong><p>{car.engineCapacity}</p>
      </div>
      
      <div style={{display: 'flex' , alignItems: 'baseline',gap: '5px'}}>
        <strong>Price: </strong><p>{car.price}</p>
      </div>

      {car.images.map((baseName, index) => {
            // For the first image, no suffix; for others, add an underscore and the index number
            const suffix = index === 0 ? '' : `_${index}`;
            const imageUrl = `${process.env.PUBLIC_URL}/images/vehicles/${baseName}${suffix}.jpg`;
            console.log(imageUrl)
            return (
              <img
                key={index}
                src={imageUrl}
                alt={`${car.name} image ${index + 1}`}
                style={{ width: '200px', marginRight: '10px' }} // optional styling
              />
            );
          })}
      
    

      
      
      
      

      {/*<Link to={`/cars/${car.id}`}>View Details</Link>*/}
    </div>
  );
};

export default CarCard;
