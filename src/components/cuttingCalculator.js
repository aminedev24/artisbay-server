import React, { useState } from "react";
import "../css/cuttingCost.css";

const CarCostCalculator = () => {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [units, setUnits] = useState(1);
  const [buyingPrice, setBuyingPrice] = useState(200000);
  const [transportation, setTransportation] = useState(25000);


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
    { id: "engine_assembly", name: "Entire Engine Assembly (including harness and brain box)" },
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
      initialSelections[item.id] = "nose"; // Replace "nose" with "half" if needed
    });
    return initialSelections;
  });

  const auctionFees = 20000;
  const serviceFees = 30000;
  const cuttingFee = 30000;

  const subtotalForTax = buyingPrice + auctionFees + transportation;
  const tax = subtotalForTax * 0.1;
  const optionalTotal = optionalItems.reduce(
    (total, item) => total + (optionalRemovals[item.id] ? item.price : 0),
    0
  );

  const totalCostPerUnit =
    subtotalForTax + tax + serviceFees + cuttingFee + optionalTotal;
  const grandTotalCost = totalCostPerUnit * units;

  const handleCutChange = (itemId, type) => {
    setCutSelections((prev) => ({
      ...prev,
      [itemId]: type,
    }));
  };

  const handleOptionalChange = (itemId) => {
    setOptionalRemovals((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };



  return (
    <div className="calculator-container">
      <h2>Car Dismantling Cost Calculator</h2>


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
      {/* Make and Model Inputs */}
      <div className="input-section">
        <label>
          Make:
          <input
            type="text"
            value={make}
            onChange={(e) => setMake(e.target.value)}
            placeholder="e.g., Toyota"
          />
        </label>
        <label>
          Model:
          <input
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            placeholder="e.g., Corolla"
          />
        </label>
      </div>

      {/* Units Input */}
      <div className="input-section">
        <label>
          Units:
          <input
            type="number"
            value={units}
            onChange={(e) => setUnits(Math.max(1, Number(e.target.value)))}
            min={1}
          />
        </label>
      </div>


            {/* Cutting Options Table */}
            <h3>Items</h3>
      <table className="cut-selection-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Nose Cut</th>
            <th>Half Cut</th>
          </tr>
        </thead>
        <tbody>
          {cutItems.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>
                <input
                  type="checkbox"
                  checked={cutSelections[item.id] === "nose"}
                  onChange={() => handleCutChange(item.id, "nose")}
              
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={cutSelections[item.id] === "half"}
                  onChange={() => handleCutChange(item.id, "half")}

                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Optional Removals Table */}
      <div className="optional-table">
        <h3>Optional Removals</h3>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Price (¥)</th>
              <th className="checkbox-cell">Select</th>
            </tr>
          </thead>
          <tbody>
            {optionalItems.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.price.toLocaleString()}</td>
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

      {/* Price Inputs */}
      <div className="input-section">
        <label>
          Buying Price (¥):
          <input
            type="number"
            value={buyingPrice}
            onChange={(e) => setBuyingPrice(Number(e.target.value))}
          />
        </label>
        <label>
          Transportation Cost (¥):
          <input
            type="number"
            value={transportation}
            onChange={(e) => setTransportation(Number(e.target.value))}
          />
        </label>
      </div>

      {/* Cost Breakdown */}
      <div className="cost-breakdown">
        <h3>Cost Breakdown</h3>
        <div className="breakdown-item">
          <span>Base Price + Fees:</span>
          <span>¥{(buyingPrice + auctionFees + transportation).toLocaleString()}</span>
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
          <span>Total Cost (Per Unit):</span>
          <span>¥{totalCostPerUnit.toLocaleString()}</span>
        </div>
        <div className="total-cost grand-total">
          <span>Grand Total (All Units):</span>
          <span>¥{grandTotalCost.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default CarCostCalculator;
