import React, { useState , useEffect } from "react";
import "../css/cuttingCost.css";
import Tooltip from "./toolTip";
import SavedCarsPanel from "./savedCarsPanel";
import Modal from "./alertModal";
import { popularMakes, bodyTypeOptions, transmissionOptions, fetchMakes, fetchModelsForMake } from "./vehicleData";


const CarCostCalculator = () => {
  const [make, setMake] = useState("any");
  const [model, setModel] = useState("any");
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
  const [editingCarIndex, setEditingCarIndex] = useState(null);





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

  const auctionFees = 25000;
  const serviceFees = 20000;
  const cuttingFee = 30000;

  const subtotalForTax = (Number(buyingPrice) || 0) + auctionFees + (Number(transportation) || 0);

  const tax = subtotalForTax * 0.1;
  const optionalTotal = optionalItems.reduce(
    (total, item) => total + (optionalRemovals[item.id] ? (item.price * units) : 0),
    0,
  );

  const totalCostPerUnit = subtotalForTax + tax + serviceFees + cuttingFee + optionalTotal;



  const feesPerVehicle = auctionFees + Number(transportation) + tax + cuttingFee + serviceFees + optionalTotal;
  const vehicleCost = Number(buyingPrice) + feesPerVehicle
  const totalFeesAllVehicles = feesPerVehicle * (units || 1);
  const grandTotalCost = vehicleCost * (Number(units) || 1);

  // Calculate total cost for all cars
const totalCostForAllCars = savedCars.reduce((total, car, index) => {
  const {
    buyingPrice,
    transportation,
    units,
    tax,
    
  } = car;

 console.log(car)

  // Convert values to numbers to avoid NaN issues
  const numBuyingPrice = Number(buyingPrice) || 0;
  const numTransportation = Number(transportation) || 0;
  //console.log(`num transportation: ${numTransportation}`)
  const numUnits = Number(units) || 1; // Default to 1 if missing
  const carOptionalTotal = car.selectedOptionalItems.reduce((total, item) => total + (item.price || 0), 0);
  //console.log('car ')
  
  
  
  

  //console.log(`optional total ${carOptionalTotal}`)

  const feesPerVehicle = auctionFees + Number(transportation) + tax + cuttingFee + serviceFees + carOptionalTotal;

  const vehicleCost = numBuyingPrice + feesPerVehicle;

  // Total cost for all units of this vehicle
  const grandTotalCost = vehicleCost * numUnits;

  // Debugging output for each car
  /*
  console.log(
    `Car ${index + 1}:`,
    `Buying Price: ¥${numBuyingPrice.toLocaleString()},`,
    `Fees Per Vehicle: ¥${feesPerVehicle.toLocaleString()},`,
    `Transportation: ¥${numTransportation.toLocaleString()},`,
    `Vehicle Cost (1 unit): ¥${vehicleCost.toLocaleString()},`,
    `Units: ${numUnits},`,
    `Grand Total Cost: ¥${grandTotalCost.toLocaleString()}`
  );
*/
  // Add to total
  return total + grandTotalCost;
}, 0);

// Final total
console.log(`Total cost for all cars: ¥${totalCostForAllCars.toLocaleString()}`);

useEffect(() => {
  console.log("Updating fees:", { auctionFees, tax, cuttingFee, serviceFees, optionalTotal });
}, [auctionFees, tax, cuttingFee, serviceFees, optionalTotal]);


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
  setMake("");  // Reset Make
  setModel(""); // Reset Model
  setUnits(0);
  setBuyingPrice(0);
  setTransportation(0);
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
    const trimmedMake = make.trim().toLowerCase();
    const trimmedModel = model.trim().toLowerCase();
  
    if ((!trimmedMake || !trimmedModel) || 
        (trimmedMake !== "any" && trimmedModel !== "any" && (!make.trim() || !model.trim()))) {
      showAlert("Please enter make and model before saving.");
      return;
    }
  
    if (units <= 0) {
      showAlert("Please enter units number");
      return;
    }
    if (buyingPrice <= 0) {
      showAlert("Please enter buying price");
      return;
    }
    if (transportation <= 0) {
      showAlert("Please enter transportation fees");
      return;
    }
  
    const includedItems = cutItems
      .filter((item) => cutSelections[item.id] === "half")
      .map((item) => item.name)
      .sort();
  
      const selectedOptionalItems = optionalItems
      .filter((item) => optionalRemovals[item.id])
      .map((item) => ({ name: item.name, price: item.price ,units: units })); // Include both name and price
  
    if (editingCarIndex !== null) {
      // Editing an existing car
      const updatedCars = [...savedCars];
  
      updatedCars[editingCarIndex] = {
        ...updatedCars[editingCarIndex], // Preserve other properties
        make,
        model,
        transportation,
        buyingPrice,
        units: Number(units),
        includedItems,
        selectedOptionalItems, // Completely replace with new selection
      };
  
      setSavedCars(updatedCars);
      setEditingCarIndex(null); // Reset editing mode
    } else {
      // Adding a new car
      const newSelection = {
        id: `${make} ${model} ${savedCars.length + 1}`,
        make,
        model,
        buyingPrice,
        transportation,
        units: Number(units),
        includedItems,
        tax,
        selectedOptionalItems,
        vehicleCost,
        cuttingFee
      };
  
      setSavedCars([...savedCars, newSelection]);
    }
  
    resetInputs();
  };
  
  const editCar = (index) => {
    if (index === -1) {
      console.warn("Invalid car index received in editCar.");
      return;
    }
  
    console.log("Editing car at index:", index);
  
    const car = savedCars[index];
    if (!car) {
      console.warn("No car found at the provided index.");
      return;
    }
  
    console.log("Car Data:", car);
  
    setMake(car.make);
    setModel(car.model);
    setUnits(car.units);
    setBuyingPrice(car.buyingPrice || "");  
    setTransportation(car.transportation || "");  
  
    // Rebuild selections
    const newCutSelections = {};
    cutItems.forEach((item) => {
      newCutSelections[item.id] = car.includedItems.includes(item.name) ? "half" : null;
    });
    setCutSelections(newCutSelections);
  
    // Ensure optional items exist (in case they were empty)
    const newOptionalRemovals = {};
    optionalItems.forEach((item) => {
      // Ensure removed items are not added back
      newOptionalRemovals[item.id] = car.selectedOptionalItems?.includes(item.name) ?? false;
    });
    setOptionalRemovals(newOptionalRemovals);
    
  
    setEditingCarIndex(index);
  };
  
    
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

  const cancelEdit = () => {
    console.log("Editing cancelled");
    setMake("");
    setModel("");
    setUnits(0);
    setBuyingPrice(0);
    setTransportation(0);
    setEditingCarIndex(null);
  };
  
//console.log(savedCarsTotalCost)
return (
    <div className="calculator-wrapper">

      <div className="overlay overlay-filter"></div>
      <div className="overlay overlay-image"></div>
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
          <select id="make" name="make" value={make}  onChange={handleMakeChange}>
                  <option name='any' value='any'>Make (any)</option>
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
          <select id="model" name="model" value={model}  onChange={handleModelChange}>
                  <option name='any' value='any'>Model (any)</option>
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

              if (value && value.startsWith('0') && value.length > 1) {
                setUnits(value.replace(/^0+/, ''));
              } else {
                setUnits(value === "" ? "" : Math.max(0, Number(value)));
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

        {editingCarIndex !== null && (
          <button onClick={cancelEdit}>Cancel Edit</button>
        )}

      </div>
  

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
            Buying Price (¥):
            <input
              type="text"
              value={buyingPrice.toLocaleString()} // Format with commas
              onChange={(e) => {
                const rawValue = e.target.value.replace(/,/g, ""); // Remove commas
                if (rawValue === "" || isNaN(rawValue)) {
                  setBuyingPrice(""); // Allow empty input
                } else {
                  setBuyingPrice(Number(rawValue)); // Store as number
                }
              }}
            />
          </label>

          <label>
            Transportation Fees (¥):
            <input
              type="text"
              value={transportation.toLocaleString()}
              onChange={(e) => {
                const rawValue = e.target.value.replace(/,/g, "");
                if (rawValue === "" || isNaN(rawValue)) {
                  setTransportation("");
                } else {
                  setTransportation(Number(rawValue));
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
          <span>Buying Price</span>
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
            Total fees (all units)
            <Tooltip message="Sum of all fees per vehicle multiplied by units" />
          </span>
          <span>¥{totalFeesAllVehicles.toLocaleString()}</span>
        </div>

        <div className="total-cost grand-total">
          <span>
            Total cost (all units)
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
    <SavedCarsPanel savedCars={savedCars} setSavedCars={setSavedCars} showAlert={showAlert} editCar={editCar}/>

    </div>
 
  );
};

export default CarCostCalculator;
