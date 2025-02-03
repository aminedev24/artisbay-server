import React, { useState , useEffect } from "react";
import "../css/cuttingCost.css";
import Tooltip from "./toolTip";
import SavedCarsPanel from "./savedCarsPanel";
import Modal from "./alertModal";
import { popularMakes, bodyTypeOptions, transmissionOptions, fetchMakes, fetchModelsForMake } from "./vehicleData";

const CarCostCalculator = () => {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [units, setUnits] = useState(1);
  const [buyingPrice, setBuyingPrice] = useState(0);
  const [transportation, setTransportation] = useState(0);
  const [isItemsTableCollapsed, setIsItemsTableCollapsed] = useState(false);
  const [isOptionalTableCollapsed, setIsOptionalTableCollapsed] = useState(false);
  const [savedCars, setSavedCars] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [modalType, setModalType] = useState("");  // Could be 'alert', 'confirmation', or 'clear_all'
    const [selectedMake, setSelectedMake] = useState("");
    const [makes, setMakes] = useState([]);
    const [models, setModels] = useState([]);

      useEffect(() => {
        const loadMakes = async () => {
          const fetchedMakes = await fetchMakes();
          setMakes(fetchedMakes);
        };
        loadMakes();
      }, []);

    const handleMakeChange = async (event) => {
      const make = event.target.value;
      setMake(make);
  
      if (make) {
        const fetchedModels = await fetchModelsForMake(make);
        setModels(fetchedModels);
      } else {
        setModels([]);
      }
    };


  const [optionalRemovals, setOptionalRemovals] = useState({});

  const cutItems = [
    { id: "nose_cut_fenders", name: "Nose Cut (taking off fenders)" },
    { id: "half_cut_windshield", name: "Half Cut (without windshield glass)" },
    { id: "bonnet", name: "Bonnet" },
    { id: "door", name: "Door" },
    { id: "back_door", name: "Back Door/Rear Gate/Trunk Lid" },
    { id: "fenders", name: "Fenders" },
    { id: "spoiler", name: "Spoiler (if the car has it)" },
    { id: "air_grille", name: "Air Grille" },
    { id: "front_bumper", name: "Front Bumper (with or without lights)" },
    { id: "headlights", name: "Headlights or Fog Lights" },
    { id: "radiator_support", name: "Radiator Support (optional)" },
    {
      id: "engine_assembly",
      name: "Entire Engine Assembly (including harness and brain box)",
    },
    { id: "gearbox", name: "Gearbox/Transmission assembly" },
    { id: "cardan", name: "Cardan (if the car is 4WD or FR)" },
    { id: "front_axle", name: "Front Axle and Suspension" },
    { id: "dashboard_pedals", name: "Dashboard and Pedals" },
    { id: "suspension_arm", name: "Suspension/Arm" },
    { id: "steering_gearbox", name: "Steering Gear Box (without P/S tubes)" },
    { id: "steering_rack", name: "Steering rack and column assembly" },
    { id: "rim_tire", name: "Rim/Tire/Wheel Cap" },
    { id: "wiper_motor", name: "Wiper Motor/Linkage/Arm" },
    { id: "tail_lamp", name: "Tail Lamp" },
    { id: "front_seat", name: "Front Seat" },
    { id: "rear_seat", name: "Rear Seat" },
    { id: "rear_bumper", name: "Rear Bumper" },
  ];

  const optionalItems = [
    { id: "evaporator", name: "Evaporator/AC Blower", price: 2000 },
    { id: "dashboard", name: "Dashboard", price: 3000 },
    { id: "roof", name: "Roof Cut", price: 3500 },
    { id: "windshield", name: "Windshield Glass", price: 7000 },
    { id: "harness", name: "Harness All Keep", price: 3500 },
    { id: "tail", name: "Tail Cut", price: 3500 },
    { id: "muffler", name: "Muffler", price: 2500 },
    { id: "sunroof", name: "Sun-Roof Take", price: 1500 },
  ];

  const [cutSelections, setCutSelections] = useState(() => {
    const initialSelections = {};
    cutItems.forEach((item) => {
      // Set default selection, e.g., "nose" for all items
      initialSelections[item.id] = "half"; // Replace "nose" with "half" if needed
    });
    return initialSelections;
  });

  const auctionFees = 20000;
  const serviceFees = 20000;
  const cuttingFee = 30000;

  const subtotalForTax = (Number(buyingPrice) || 0) + auctionFees + (Number(transportation) || 0);

  const tax = subtotalForTax * 0.1;
  const optionalTotal = optionalItems.reduce(
    (total, item) => total + (optionalRemovals[item.id] ? item.price : 0),
    0,
  );

  const totalCostPerUnit = subtotalForTax + tax + serviceFees + cuttingFee + optionalTotal;

  const grandTotalCost = totalCostPerUnit * (Number(units) || 0);

  const feesPerVehicle = auctionFees + Number(transportation) + tax + cuttingFee + serviceFees + optionalTotal;
  const vehicleCost = Number(buyingPrice) + auctionFees + tax + cuttingFee + serviceFees + optionalTotal + Number(transportation);
  const totalFeesAllVehicles = feesPerVehicle * units;

  const handleCutChange = (itemId, type) => {
    setCutSelections((prev) => ({
      ...prev,
      [itemId]: prev[itemId] === type ? null : type, // Toggle the selection
    }));
  };

  const handleOptionalChange = (itemId) => {
    setOptionalRemovals((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const apiUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost/artisbay-server/server"
      : "/server";

  const handleSubmit = async () => {
    const data = {
      make,
      model,
      units,
      buyingPrice,
      transportation,
      cutSelections,
      optionalRemovals,
      totalCostPerUnit,
      grandTotalCost,
    };

    try {
      const response = await fetch(`${apiUrl}/sendCostData.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Data sent successfully!");
      } else {
        alert("Failed to send data.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while sending the data.");
    }
  };

  const resetInputs = () => {
    setMake("");
    setModel("");
    setUnits(1);
    setBuyingPrice(0);
    setTransportation(0);

    // Reset checkbox selections
    setOptionalRemovals({});
    setCutSelections(() => {
      const initialSelections = {};
      cutItems.forEach((item) => {
        initialSelections[item.id] = "half";
      });
      return initialSelections;
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const showAlert = (message, type = "alert") => {
    setTimeout(() => {
      setModalMessage(message);
      setModalType(type);
      setShowModal(true);
    }, 1000); // Delay for 1 second
  };

  const saveSelection = () => {
    if (!make || !model) {
      //alert("Please enter make and model before saving.");
      showAlert("Please enter make and model before saving.")
      return;
    }

    if (units <= 0 || buyingPrice <= 0 || transportation <= 0) {
      //alert("Units, Buying Price, and Transportation Fees must be greater than 0 before saving.");
      showAlert("Units, Buying Price, and Transportation Fees must be greater than 0 before saving.");

      return;
    }
  
    const includedItems = cutItems
      .filter((item) => cutSelections[item.id] === "half")
      .map((item) => item.name)
      .sort(); // Sorting ensures consistent order for comparison
  
    const selectedOptionalItems = optionalItems
      .filter((item) => optionalRemovals[item.id])
      .map((item) => item.name)
      .sort();
  
    const existingCar = savedCars.find(
      (car) =>
        car.make === make &&
        car.model === model &&
        JSON.stringify(car.includedItems) === JSON.stringify(includedItems) &&
        JSON.stringify(car.selectedOptionalItems) === JSON.stringify(selectedOptionalItems)
    );
  
    if (existingCar) {
      // Increase unit count if already exists
      existingCar.units += units;
      setSavedCars([...savedCars]); // Trigger re-render
    } else {
      // Add new entry
      const newSelection = {
        id: `${make} ${model} ${savedCars.length + 1}`,
        make,
        model,
        units,
        includedItems,
        selectedOptionalItems,
      };
      setSavedCars([...savedCars, newSelection]);
      resetInputs();
    }
  };
  
  const savedCarsTotalCost = savedCars.reduce((total, car) => {
    const carTotalPerUnit = totalCostPerUnit; // Assuming same formula for each saved car
    return total + carTotalPerUnit * car.units;
  }, 0);
  
  const handleModelChange = (event) => {
    setModel(event.target.value);
  };
  
  const handleInputChange = (event, setState) => {
    let value = event.target.value;
  
    // Remove any non-digit characters except the comma (for formatting)
    value = value.replace(/[^0-9,]/g, '');
  
    // Remove commas for proper numeric calculations
    const numericValue = value.replace(/,/g, '');
  
    // Apply formatting with commas
    const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  
    setState(formattedValue);
  };
  
  const handleBlur = (value, setState) => {
    // Convert the formatted value back to number without commas
    const numericValue = value.replace(/,/g, '');
    setState(numericValue);
  };
  
  




  return (
    <div className="calculator-wrapper">
      {showModal && (
      <Modal
        message={modalMessage}
        onClose={handleCloseModal}
        type={modalType}
      />
    )}
    <div className="calculator-container">
      <h2>Cutting & Dismantling Cost Calculator</h2>

      <div className="cutting-loading-fees">
        <table>
          <thead>
            <tr>
              <th>Cutting fees + Loading</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>STANDARD HALF CUT Japanese cars</td>
              <td>¥30,000/unit</td>
            </tr>
            <tr>
              <td>STANDARD NOSE CUT Japanese cars</td>
              <td>¥30,000/unit</td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* Inputs Section */}
      <div className="input-section">
        <label>
          Make:
        {/*
          <input
            type="text"
            value={make}
            onChange={(e) => setMake(e.target.value)}
            placeholder="e.g., Toyota"
          />
          */}
          <select id="make" name="make" onChange={handleMakeChange}>
                  <option value='any'>Make (any)</option>
                  {makes.map((make, index) => (
                    <option key={index} value={make}>
                      {make.charAt(0).toUpperCase() + make.slice(1)}
                    </option>
                  ))}
          </select>
        </label>
        <label>
          Model:
        {/*
          <input
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            placeholder="e.g., Corolla"
          />
        */}
          <select id="model" name="model" onChange={handleModelChange}>
                  <option value='any'>Model (any)</option>
                  {models.map((model, index) => (
                    <option key={index} value={model}>
                      {model}
                    </option>
          ))}
          </select>
        </label>
        <label>
          Units:
          <input
            type="number"
            value={units}
            onChange={(e) => {
              const value = e.target.value;
              setUnits(value === "" ? "" : Math.max(0, Number(value)));
            }}
          />
        </label>

      </div>

      {/* Reset Button */}
      <button className="reset-button" onClick={resetInputs}>
        Reset
      </button>
      <br/>
      {/* Collapsible Items Table */}
      <div className="cutting-section-container">
      <div className="upper-section">
        <h5
          className="collapse-btn"
          onClick={() => setIsItemsTableCollapsed(!isItemsTableCollapsed)}
        >
          {!isItemsTableCollapsed ? 'Show list': 'Hide list'} {!isItemsTableCollapsed ? "▼" : "▲"}
        </h5>

        <Tooltip                   
                    
          message="Uncheck the item to discard it from the list" />
      </div>

   

     <table className="cut-selection-table">
          <thead>
            <tr>
              <th>Items in half cut styles</th>
              <th>Check</th>
              {/*<th>Nose Cut</th>*/}
            </tr>
          </thead>
          <tbody>
            {isItemsTableCollapsed && cutItems.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={cutSelections[item.id] === "half"}
                    onChange={() => handleCutChange(item.id, "half")}
                  />
                </td>
                {/*
                        <td>
                        <input
                          type="checkbox"
                          checked={cutSelections[item.id] === "nose"}
                          onChange={() => handleCutChange(item.id, "nose")}
                        />
                      </td>
                      */}
              </tr>
            ))}
          </tbody>
        </table>

     </div>

      

      <div className="optional-table">
        <h5
          className="collapse-btn"
          onClick={() => setIsOptionalTableCollapsed(!isOptionalTableCollapsed)}
        >
          {!isOptionalTableCollapsed ? 'Show list': 'Hide list'}  {!isOptionalTableCollapsed ? "▼" : "▲"}
        </h5>
       
       
          <div className="optional-removals">
          <table>
            <thead>
        
              <tr>
                <th>Items in optional removals</th>
                <th>Fees</th>
                <th className="checkbox-cell">Check</th>
              </tr>
   
            </thead>
            <tbody>
              {isOptionalTableCollapsed && optionalItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td> {`${item.price} ¥`}</td>
                  <td className="checkbox-cell">
                    <input
                      type="checkbox"
                      checked={optionalRemovals[item.id] || false}
                      onChange={() => handleOptionalChange(item.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
    
      </div>

      <div className="input-section">
        <label>
          Buying Fee (¥):
          <input
            type="number"
            value={buyingPrice}
            onChange={(e) => {
              const value = e.target.value;
              
              // If input is not empty and starts with '0', strip leading zero
              if (value && value.startsWith('0') && value.length > 1) {
                setBuyingPrice(value.replace(/^0+/, ''));
              } else {
                // Ensure that it's a valid number or allow empty input
                setBuyingPrice(value === "" ? "" : Math.max(0, Number(value)));
              }
            }}
   
          />

        </label>

        <label>
          Transportation Fees (¥):
          <input
            type="number"
            value={transportation}
            onChange={(e) => {
              const value = e.target.value;

              if (value && value.startsWith('0') && value.length > 1) {
                setTransportation(value.replace(/^0+/, ''));
              } else {
                setTransportation(value === "" ? "" : Math.max(0, Number(value)));
              }
            }}
      
          />
        </label>
      </div>

            {/* Reset Button */}
      <div className="button-section">
        <button className="reset-button" onClick={resetInputs}>
          Reset
        </button>
        <button onClick={saveSelection}>Save Selection</button>
      </div>





      {/* Cost Breakdown */}
      <div className="cost-breakdown">
        <h3>Cost Breakdown</h3>
        <div className="breakdown-item">
          <span>Buying Fee</span>
          <span>
            ¥{(buyingPrice).toLocaleString() || 0}
          </span>
        </div>
        <div className="breakdown-item">
          <span>Auction Fees</span>
          <span>
            ¥{(auctionFees).toLocaleString()}
          </span>
        </div>
        <div className="breakdown-item">
          <span>Transportation Fees</span>
          <span>
            ¥{(transportation).toLocaleString() || 0}
          </span>
        </div>
        <div className="breakdown-item">
          <span>Tax (10%):</span>
          <span>¥{tax.toLocaleString()}</span>
        </div>
        <div className="breakdown-item">
          <span>Cutting Fee:</span>
          <span>¥{cuttingFee.toLocaleString()}</span>
        </div>
        {optionalTotal > 0 && (
          <div className="breakdown-item">
            <span>Optional Removals:</span>
            <span>¥{optionalTotal.toLocaleString()}</span>
          </div>
        )}
        <div className="breakdown-item">
          <span>Service Fees:</span>
          <span>¥{serviceFees.toLocaleString()}</span>
        </div>

        <div className="total-cost">
          <span>
            Fees per vehicle
            <Tooltip message="Includes auction fees, transportation, tax, cutting fee, service fees, and optional removals" />
          </span>
          <span>¥{feesPerVehicle.toLocaleString()}</span>
        </div>
        {
          /*
          <div className="total-cost">
            <span>Total Cost (Per Unit):</span>
            <span>¥{totalCostPerUnit.toLocaleString()}</span>
          </div>
          */
        }


        <div className="total-cost">
          <span>
            Vehicle cost
            <Tooltip message="Vehicle price plus all fees except freight" />
          </span>
          <span>¥{vehicleCost.toLocaleString()}</span>
        </div>

        <div className="total-cost">
          <span>
            Total fees (all vehicles)
            <Tooltip message="Sum of all fees per vehicle multiplied by units" />
          </span>
          <span>¥{totalFeesAllVehicles.toLocaleString()}</span>
        </div>

        <div className="total-cost grand-total">
          <span>
            Total cost (all vehicles)
            <Tooltip message="Total cost including all fees and vehicle price multiplied by units" />
          </span>
          <span>¥{grandTotalCost.toLocaleString()}</span>
        </div>


      {
        /*
        <div className="total-cost grand-total">
          <span>Total Cost (All Units):</span>
          <span>¥{(totalCostPerUnit * units).toLocaleString()}</span>
        </div>
        */
      }
        



      </div>

      {/*<button onClick={handleSubmit}>Send Email</button>*/}
    </div>
    <SavedCarsPanel savedCars={savedCars} setSavedCars={setSavedCars} savedCarsTotalCost={savedCarsTotalCost}/>

    </div>
 
  );
};

export default CarCostCalculator;
