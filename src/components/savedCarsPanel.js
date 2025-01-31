import { useState } from "react";

const SavedCarsPanel = ({ savedCars }) => {
  const [selectedCarId, setSelectedCarId] = useState(null);

  const toggleCarDetails = (id) => {
    setSelectedCarId(selectedCarId === id ? null : id); // Toggle selection
  };

  return (
    <div className="saved-cars-panel">
      <h3>Saved Selections</h3>
      {savedCars.length > 0 ? (
        <ul>
          {savedCars.map((car) => (
            <li key={car.id}>
              {/* Car selection button */}
              <button
                className="saved-car-button"
                onClick={() => toggleCarDetails(car.id)}
              >
                {car.make} {car.model} (x{car.units})
              </button>

              {/* Show details only if selected */}
              {selectedCarId === car.id && (
                <div className="saved-car-details">
                  <strong>Included Items:</strong>
                  <ul>
                    {car.includedItems.length > 0 ? (
                      car.includedItems.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))
                    ) : (
                      <li>No items included</li>
                    )}
                  </ul>
                  {car.selectedOptionalItems.length > 0 && (
                    <>
                      <strong>Optional Removals:</strong>
                      <ul>
                        {car.selectedOptionalItems.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No selections saved yet.</p>
      )}
    </div>
  );
};

export default SavedCarsPanel;
