import { useState, useEffect, useCallback } from "react";
import "../css/savedCarsPanel.css";

const SavedCarsPanel = ({ savedCars, setSavedCars, savedCarsTotalCost, editCar, showAlert }) => {
  const [selectedCar, setSelectedCar] = useState(savedCars[0] || null);
  const [isTableCollapsed, setIsTableCollapsed] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});
    // API URL setup
  const apiUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost/artisbay-server-clean/server'
      : '/server';

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

  useEffect(() => {
    if (selectedCar) {
      const updatedCar = savedCars.find(car => car.id === selectedCar.id);
      if (updatedCar) {
        setSelectedCar(updatedCar); // Update the selected car when `savedCars` changes
      }
    }
  }, [savedCars]); // Re-run effect when `savedCars` changes
  

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

  const handleSubmit = async () => {
    const formattedData = savedCars.map((car) => {
      const carCheckedState = checkedItems[car.id] || { included: [], optional: [] };
  
      return {
        carId: car.id,
        make: car.make,
        model: car.model,
        buyingPrice: car.buyingPrice,
        transportation: car.transportation,
        units: car.units,
        tax: car.tax,
        includedItems: car.includedItems.filter((_, index) => carCheckedState.included?.[index] ?? true),
        selectedOptionalItems: car.selectedOptionalItems.filter((_, index) => carCheckedState.optional?.[index] ?? true),
      };
    });
  
    try {
      const response = await fetch(`${apiUrl}/saveCars.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Send cookies with request
        body: JSON.stringify({ cars: formattedData }),
      });
  
      console.log("Response Status:", response.status);
      const result = await response.json();
      console.log("Server Response:", result);
  
      if (!response.ok) {
        console.error("Error response from server:", result.message);
        showAlert("There was an error while saving the cars. Please try again.");
      } else {
        console.log("Cars saved successfully", result);
        showAlert("Data saved successfully.");
  
        // Wait for 2 seconds before refreshing the page
        setTimeout(() => {
          window.location.reload();
        }, 3000); // Adjust time as needed (2000ms = 2 seconds)
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      showAlert("Error submitting data.");
    }
  };
  
  
  
  

  return (
    <div className="saved-cars-container">
      <div className="tabs-container">
        <div className="saved-cars-tabs">
          {savedCars.map((car, index) => (
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
                  className="edit-button"
                  onClick={() => {
                    const carIndex = savedCars.findIndex((car) => car.id === selectedCar.id);
                    console.log("Edit button clicked. Car Index:", carIndex, "Car Data:", selectedCar);
                    if (carIndex !== -1) {
                      editCar(carIndex);
                    } else {
                      console.warn("Selected car not found in savedCars.");
                    }
                  }}
                >
                  Edit List
                </button>

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
              <td>{savedCars.reduce((acc, car) => acc + car.units, 0)}</td>
            </tr>
            <tr>
              <th>Total Lists</th>
              <td>{savedCars.length}</td>
            </tr>
            <tr>
              <th>Total Investment</th>
              <td>{`¥${savedCarsTotalCost.toLocaleString()}`}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <button className="submit-button" onClick={handleSubmit}>
        Submit Selection
      </button>

    </div>
  );
};

export default SavedCarsPanel;
