import { useState } from "react";

const SavedCarsPanel = ({ savedCars, setSavedCars }) => {
  const [selectedCarId, setSelectedCarId] = useState(null);

  // Toggle car details
  const toggleCarDetails = (id) => {
    setSelectedCarId(selectedCarId === id ? null : id);
  };

  // Remove a saved car
  const removeCar = (id) => {
    setSavedCars(savedCars.filter((car) => car.id !== id));
  };

  // Remove an item from a car (either included or optional)
  const removeItem = (carId, item, type) => {
    setSavedCars(
      savedCars.map((car) =>
        car.id === carId
          ? {
              ...car,
              [type]: car[type].filter((i) => i !== item),
            }
          : car
      )
    );
  };

  return (
    <div className="saved-cars-panel">
      <h3>Saved Selections</h3>
      {savedCars.length > 0 ? (
        <ul>
          {savedCars.map((car) => (
            <li key={car.id}>
              <div className="saved-car-header">
                <button className="saved-car-button" onClick={() => toggleCarDetails(car.id)}>
                  {car.make} {car.model} (x{car.units})
                </button>
                <button className="remove-car-button" onClick={() => removeCar(car.id)}>❌</button>
              </div>

              {/* Show details only if selected */}
              {selectedCarId === car.id && (
                <div className="saved-car-details">
                  <strong>Included Items:</strong>
                  <ul>
                    {car.includedItems.length > 0 ? (
                      car.includedItems.map((item, index) => (
                        <li key={index}>
                          {item}{" "}
                          <button
                            className="remove-item-button"
                            onClick={() => removeItem(car.id, item, "includedItems")}
                          >
                            ❌
                          </button>
                        </li>
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
                          <li key={index}>
                            {item}{" "}
                            <button
                              className="remove-item-button"
                              onClick={() => removeItem(car.id, item, "selectedOptionalItems")}
                            >
                              ❌
                            </button>
                          </li>
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
