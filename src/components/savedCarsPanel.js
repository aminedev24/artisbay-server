import { useState, useEffect, useCallback } from "react";
import "../css/savedCarsPanel.css";

const SavedCarsPanel = ({ savedCars, setSavedCars, savedCarsTotalCost }) => {
  const [selectedCar, setSelectedCar] = useState(savedCars[0] || null);
  const [isTableCollapsed, setIsTableCollapsed] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});

  // Initialize checked state for a car
  const initializeCheckedState = useCallback((car) => {
    setCheckedItems((prev) => {
      if (!prev[car.id]) {
        const initialChecked = {
          included: new Array(car.includedItems.length).fill(true),
          optional: new Array(car.selectedOptionalItems.length).fill(true),
        };
        console.log(`Initializing checked state for car: ${car.make} ${car.model}`, initialChecked);
        return { ...prev, [car.id]: initialChecked };
      }
      return prev;
    });
  }, []);

  useEffect(() => {
    if (selectedCar) {
      initializeCheckedState(selectedCar);
    }
  }, [selectedCar, initializeCheckedState]);

  // Handle checkbox change
  const handleCheckboxChange = (carId, type, index) => {
    console.log(`Checkbox changed for car: ${carId}, type: ${type}, index: ${index}`);
    setCheckedItems((prev) => {
      const carCheckState = prev[carId];
      if (!carCheckState) return prev;

      const updatedArray = [...carCheckState[type]];
      updatedArray[index] = !updatedArray[index];
      console.log(`Updated ${type} for car ${carId}:`, updatedArray);
      
      return {
        ...prev,
        [carId]: {
          ...carCheckState,
          [type]: updatedArray,
        },
      };
    });
  };

  // Handle car removal
  const handleRemoveCar = (carId) => {
    console.log(`Removing car with ID: ${carId}`);
    const updatedCars = savedCars.filter((car) => car.id !== carId);
    console.log("Updated car list after removal:", updatedCars);
    setSavedCars(updatedCars);
    if (selectedCar?.id === carId) {
      setSelectedCar(updatedCars[0] || null);
    }
  };

  return (
    <div className="saved-cars-container">
      {/* Tabs Container */}
      <div className="tabs-container">
        <div className="saved-cars-tabs">
          {savedCars.map((car) => (
            <button
              key={car.id}
              className={`tab-button ${selectedCar?.id === car.id ? "active" : ""}`}
              onClick={() => {
                setSelectedCar(car);
                initializeCheckedState(car);
              }}
            >
              {car.make} {car.model} (x{car.units})
            </button>
          ))}
        </div>
      </div>

      {/* Car details section */}
      {selectedCar && (
        <div className="table-car-details">
          <div className="selected-car">
            <button
              className="collapse-button"
              onClick={() => setIsTableCollapsed(!isTableCollapsed)}
            >
              {isTableCollapsed ? "Show List" : "Hide List"}
            </button>

            <h3>
              {selectedCar.make} {selectedCar.model} (x{selectedCar.units})
            </h3>

            <button
              className="remove-car-button"
              onClick={() => handleRemoveCar(selectedCar.id)}
            >
              Remove List
            </button>
          </div>

          {!isTableCollapsed && checkedItems[selectedCar.id] && (
            <div className="table-container">
              <table className="saved-cars-table">
                <thead>
                  <tr>
                    <th>Items</th>
                    <th>Check</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Included Items */}
                  {selectedCar.includedItems.map((item, index) => {
                    const isChecked = checkedItems[selectedCar.id].included[index];
                    return (
                      <tr
                        key={`included-${index}`}
                        className={isChecked ? "" : "unchecked-item"}
                      >
                        <td>{item}</td>
                        <td>
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleCheckboxChange(selectedCar.id, "included", index)}
                          />
                        </td>
                      </tr>
                    );
                  })}

                  {/* Optional Removals */}
                  {selectedCar.selectedOptionalItems.map((item, index) => {
                    const isChecked = checkedItems[selectedCar.id].optional[index];
                    return (
                      <tr
                        key={`optional-${index}`}
                        className={isChecked ? "" : "unchecked-item"}
                      >
                      
                        <td>{item}</td>
                        <td>
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleCheckboxChange(selectedCar.id, "optional", index)}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      <div className="summary-section">
        <table>
          <tbody>
            <tr>
              <th>Total cars</th>
              <td>{savedCars.length}</td>
            </tr>
            <tr>
              <th>Total Lists</th>
              <td>{savedCars.reduce((acc, car) => acc + car.units, 0)}</td>
            </tr>
            <tr>
              <th>Total Investment</th>
              <td>{`¥${savedCarsTotalCost.toLocaleString()}`}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SavedCarsPanel;
