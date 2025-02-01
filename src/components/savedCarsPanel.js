import { useState, useEffect, useCallback } from "react";
import "../css/savedCarsPanel.css";

const SavedCarsPanel = ({ savedCars, setSavedCars, savedCarsTotalCost }) => {
  const [selectedCar, setSelectedCar] = useState(savedCars[0] || null);
  const [isTableCollapsed, setIsTableCollapsed] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});

  const initializeCheckedState = useCallback((car) => {
    setCheckedItems((prev) => {
      if (!prev[car.id]) {
        const initialChecked = {
          included: new Array(car.includedItems.length).fill(true),
          optional: new Array(car.selectedOptionalItems.length).fill(true),
        };
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

  const handleCheckboxChange = (carId, type, index) => {
    setCheckedItems((prev) => {
      const carCheckState = prev[carId];
      if (!carCheckState) return prev;

      const updatedArray = [...carCheckState[type]];
      updatedArray[index] = !updatedArray[index];

      return {
        ...prev,
        [carId]: {
          ...carCheckState,
          [type]: updatedArray,
        },
      };
    });
  };

  const handleRemoveCar = (carId) => {
    const updatedCars = savedCars.filter((car) => car.id !== carId);
    setSavedCars(updatedCars);
    if (selectedCar?.id === carId) {
      setSelectedCar(updatedCars[0] || null);
    }
  };

  return (
    <div className="saved-cars-container">
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

      <div className="table-car-details">
        <div className="selected-car">
          <button
            className="collapse-button"
            onClick={() => setIsTableCollapsed(!isTableCollapsed)}
          >
            {isTableCollapsed ? "Show List" : "Hide List"}
          </button>

          {selectedCar ? (
            <>
              <h3>
                {selectedCar.make} {selectedCar.model} (x{selectedCar.units})
              </h3>
              <button
                className="remove-car-button"
                onClick={() => handleRemoveCar(selectedCar.id)}
              >
                Remove List
              </button>
            </>
          ) : (
            <h3>No car selected </h3>
          )}
        </div>

        {!isTableCollapsed && (
          <div className="table-container">
            <table className="saved-cars-table">
              <thead>
                <tr>
                  <th>Items</th>
                  <th>Check</th>
                </tr>
              </thead>
              <tbody>
                {selectedCar ? (
                  <>
                    {selectedCar.includedItems.map((item, index) => {
                      const isChecked = checkedItems[selectedCar.id]?.included[index] ?? true;
                      return (
                        <tr key={`included-${index}`} className={isChecked ? "" : "unchecked-item"}>
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

                    {selectedCar.selectedOptionalItems.length > 0 && (
                      <tr className="optional-separator">
                        <td colSpan="2"><strong>Optional Items</strong></td>
                      </tr>
                    )}

                    {selectedCar.selectedOptionalItems.map((item, index) => {
                      const isChecked = checkedItems[selectedCar.id]?.optional[index] ?? true;
                      return (
                        <tr key={`optional-${index}`} className={isChecked ? "" : "unchecked-item"}>
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
                  </>
                ) : (
                  <tr>
                    <td colSpan="2" style={{ textAlign: "center" }}>No car selected</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

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
