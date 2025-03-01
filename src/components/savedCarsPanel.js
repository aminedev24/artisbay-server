import { useState, useEffect, useCallback } from "react";
import "../css/savedCarsPanel.css";
import { v4 as uuidv4 } from 'uuid';
import { useUser  } from './userContext';
import { useNavigate, useLocation } from "react-router-dom";

const SavedCarsPanel = ({
  savedCars,
  setSavedCars,
  editCar,
  showAlert,
}) => {
  const [selectedCar, setSelectedCar] = useState(savedCars[0] || null);
  const [isTableCollapsed, setIsTableCollapsed] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});
  const { user, loading, login } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [savedCarsTotalCost, setSavedCarsTotalCost] = useState(0);
  const [isOptionalTableCollapsed, setIsOptionalTableCollapsed] = useState(false);  
  const [isItemsTableCollapsed, setIsItemsTableCollapsed] = useState(false);
  

  const apiUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost/artisbay-server/server'
      : '/server';

  // Initializes the checked state for a car if not already set
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
      const updatedCar = savedCars.find((car) => car.id === selectedCar.id);
      if (updatedCar) {
        setSelectedCar(updatedCar);
      }
    }
  }, [savedCars]);

const handleCheckboxChange = (carId, type, index) => {
    console.log(`Checkbox changed for carId: ${carId}, type: ${type}, index: ${index}`);
    console.log('Current checkedItems state:', checkedItems);

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
  
  const [localTotalCost, setLocalTotalCost] = useState(0);
  useEffect(() => {
    let newTotalCost = 0;
    savedCars.forEach((car) => {
      // Calculate the cost for the car by multiplying the cost per vehicle by the number of units
      let carCost = car.vehicleCost * car.units; // Instead of multiplying by savedCars.length
  
      const optionalChecks = checkedItems[car.id]?.optional;
      if (optionalChecks) {
        car.selectedOptionalItems.forEach((item, index) => {
          if (optionalChecks[index] === false && item.price) {
            carCost -= Number(item.price);
          }
        });
      }
      newTotalCost += carCost;
    });
    console.log("New local total cost calculated:", newTotalCost);
    setSavedCarsTotalCost(newTotalCost);
  }, [savedCars, checkedItems]);
  
  
  
  const handleSubmit = async () => {
    const orderId = uuidv4();

    const formattedData = savedCars.map((car) => {
      const carCheckedState = checkedItems[car.id] || { included: [], optional: [] };

      return {
        orderId,
        carId: car.id,
        make: car.make,
        model: car.model,
        buyingPrice: car.buyingPrice,
        transportation: car.transportation,
        units: car.units,
        tax: car.tax,
        // Filter out unchecked items
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
        credentials: "include",
        body: JSON.stringify({ cars: formattedData, orderId }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        if (result.message.includes("not logged in")) {
          showAlert("You are not logged in. Please log in to save your data.");
        } else {
          showAlert("There was an error while saving the data. Please try again.");
        }
      } else {
        showAlert("Data saved successfully.");
        setTimeout(() => {
          window.location.reload();
        }, 3000);
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
      <p className="scroll-hint left">&lt; Scroll to see more &gt;</p>
      {user ? null : (
        <div className="login-note">
          Log in to submit the order.
          <button type="button" onClick={() => {navigate('/login', { state: { from: location.pathname } })}}>
            Log In
          </button>
          <button type="button" onClick={() => {navigate('/register', { state: { from: location.pathname } })}}>
            Register
          </button>
        </div>
      )}

      <div className="table-car-details">
        <div className="selected-car">
          <button className="collapse-button" onClick={() => setIsTableCollapsed(!isTableCollapsed)}>
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
                  if (carIndex !== -1) {
                    editCar(carIndex);
                  }
                }}
              >
                Edit List
              </button>
              <button className="remove-car-button" onClick={() => handleRemoveCar(selectedCar.id)}>
                Remove List
              </button>
            </>
          ) : (
            <h3>No car selected</h3>
          )}
        </div>
        <h5
          className="collapse-btn"
          onClick={() => setIsItemsTableCollapsed(!isItemsTableCollapsed)}
        >
          {!isItemsTableCollapsed ? 'Show list': 'Hide list'} {!isItemsTableCollapsed ? "▼" : "▲"}
        </h5>
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
                    {isItemsTableCollapsed && selectedCar.includedItems.map((item, index) => {
                      const isChecked = checkedItems[selectedCar.id]?.included[index] ?? true;
                      return (
                        <tr key={`included-${index}`} className={isChecked ? "" : "unchecked-item"}>
                          <td>{item.name || item}</td>
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
                    <h5
                      className="collapse-btn"
                      onClick={() => setIsOptionalTableCollapsed(!isOptionalTableCollapsed)}
                    >
                      {!isOptionalTableCollapsed ? 'Show list': 'Hide list'}  {!isOptionalTableCollapsed ? "▼" : "▲"}
                    </h5>
                    {selectedCar.selectedOptionalItems.length > 0 && (
                      <tr className="optional-separator">
                        <th colSpan=""><strong>Optional Items</strong></th>
                        <th>Check</th>
                      </tr>
                    )}
             
                    {isOptionalTableCollapsed && selectedCar.selectedOptionalItems.map((item, index) => {
                      const isChecked = checkedItems[selectedCar.id]?.optional[index] ?? true;
                      return (
                        <tr key={`optional-${index}`} className={isChecked ? "" : "unchecked-item"}>
                          <td>{item.name || item} ({selectedCar.units})</td>
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
            <th>Total items (half cut)</th>
            <td>
              {savedCars.reduce(
                (acc, car) => acc + (car.includedItems ? car.includedItems.length : 0),
                0
              )}
            </td>
          </tr>
          <tr>
            <th>Total items (optional)</th>
            <td>
              {savedCars.reduce(
                (acc, car) =>
                  acc +
                  (car.selectedOptionalItems ? car.selectedOptionalItems.length : 0),
                0
              )}
            </td>
          </tr>
          <tr>
            <th>Total Investment</th>
            <td>{`¥${savedCarsTotalCost.toLocaleString()}`}</td>
          </tr>
        </tbody>
      </table>
    </div>


      <button className="submit-button" onClick={handleSubmit}>
        Submit Order
      </button>
    </div>
  );
};

export default SavedCarsPanel;
