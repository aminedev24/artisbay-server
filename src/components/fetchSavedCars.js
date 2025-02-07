import { useEffect, useState } from "react";
import '../css/fetchCars.css';

const FetchSavedCars = () => {
  const [savedCars, setSavedCars] = useState([]);
  const [activeTab, setActiveTab] = useState(null);

  const auctionFees = 25000;
  const serviceFees = 20000;
  const cuttingFee = 30000;

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

  const apiUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost/artisbay-server-clean/server'
      : '/server';

  useEffect(() => {
    const fetchSavedCars = async () => {
      try {
        const response = await fetch(`${apiUrl}/fetchCarsEstimation.php`, {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();
        if (data.success) {
          setSavedCars(data.cars);
          setActiveTab(data.cars.length > 0 ? data.cars[0].id : null);
        } else {
          console.error("Error fetching saved cars:", data.message);
        }
      } catch (error) {
        console.error("Error fetching saved cars:", error);
      }
    };

    fetchSavedCars();
  }, []);

  console.log(savedCars)


// Assuming each car object in savedCars has selectedOptionalItems (array) that holds item IDs
const optionalTotal = savedCars.reduce((total, car) => {
  // Ensure selectedOptionalItems is an array and calculate the total for this car
  if (Array.isArray(car.selectedOptionalItems)) {
    // Sum up the prices for the selected items in the car
    const carOptionalTotal = car.selectedOptionalItems.reduce((carTotal, selectedItem) => {
      const item = optionalItems.find(opt => opt.id === selectedItem); // Find item by ID
      return item ? carTotal + item.price : carTotal; // Add price if item found
    }, 0);

    return total + carOptionalTotal; // Accumulate the total across all cars
  }
  return total; // No optional items, continue with the next car
}, 0);


  const totalCars = savedCars.reduce((acc, car) => acc + (Number(car.units) || 0), 0);
  const totalLists = savedCars.length;
  // Calculate total cost for all cars
const totalInvestment = savedCars.reduce((total, car, index) => {
  const {
    buying_price,
    transportation,
    units,
    tax
  } = car;

  console.log('car', car)
  // Convert values to numbers to avoid NaN issues
  const numBuyingPrice = Number(buying_price) || 0;
  console.log(`num buying price: ${numBuyingPrice}`)
  const numTransportation = Number(transportation) || 0;
  const numUnits = Number(units) || 1; // Default to 1 if missing

  // Calculate the optional total per car
  const carOptionalTotal = car.selectedOptionalItems.reduce((carTotal, selectedItem) => {
    const item = optionalItems.find(opt => opt.id === selectedItem); // Find item by ID
    return item ? carTotal + item.price : carTotal; // Add price if item found
  }, 0);

  // Fees per vehicle (excluding transportation)
  const feesPerVehicle = auctionFees + numTransportation + tax + cuttingFee + serviceFees + carOptionalTotal;

  // Vehicle cost (including transportation)
  const vehicleCost = numBuyingPrice + feesPerVehicle;

  // Total cost for all units of this vehicle
  const grandTotalCost = vehicleCost * numUnits;

    // Debugging output for each car
    console.log(
      `Car ${index + 1}:`,
      `Buying Price: ¥${numBuyingPrice.toLocaleString()},`,
      `Fees Per Vehicle: ¥${feesPerVehicle.toLocaleString()},`,
      `Transportation: ¥${numTransportation.toLocaleString()},`,
      `Vehicle Cost (1 unit): ¥${vehicleCost.toLocaleString()},`,
      `Units: ${numUnits},`,
      `Grand Total Cost: ¥${grandTotalCost.toLocaleString()}`
    );

  // Add to total
  return total + grandTotalCost;
}, 0);

  
  return (
    <div className="saved-cars-panel">
      <h1>Saved Cars</h1>

      <div className="saved-cars-tabs">
        {savedCars.map((car) => (
          <button
            key={car.id}
            className={`tab-button ${activeTab === car.id ? "active" : ""}`}
            onClick={() => setActiveTab(car.id)}
          >
            {car.make} {car.model} x{car.units}
          </button>
        ))}
      </div>

      {savedCars.map((car) =>
        activeTab === car.id ? (
          <div key={car.id} className="saved-car-details">
            <h3>{car.make} {car.model}</h3>
            <p><strong>Buying Price:</strong> {new Intl.NumberFormat().format(car.buying_price)}</p>
            <p><strong>Transportation:</strong> {new Intl.NumberFormat().format(car.transportation)}</p>
            <p><strong>Units:</strong> {car.units}</p>
            
            <div className="items-section">
              <div className="items-list">
                <h4>Included Items</h4>
                <table className="items-table">
                  <thead>
                    <tr>
                      <th>Item Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {car.includedItems.length > 0 ? (
                      car.includedItems.map((item, index) => (
                        <tr key={index}>
                          <td>{item}</td>
                        </tr>
                      ))
                    ) : (
                      <tr><td>No included items</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="items-list">
                <h4>Optional Items</h4>
                <table className="items-table">
                  <thead>
                    <tr>
                      <th>Item Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {car.selectedOptionalItems.length > 0 ? (
                      car.selectedOptionalItems.map((item, index) => (
                        <tr key={index}>
                          <td>{item}</td>
                        </tr>
                      ))
                    ) : (
                      <tr><td>No optional items</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : null
      )}
      {/* Summary Section */}
      <div className="summary-section">
        <table>
          <tbody>
            <tr>
              <th>Total Cars</th>
              <td>{totalCars}</td>
            </tr>
            <tr>
              <th>Total Lists</th>
              <td>{totalLists}</td>
            </tr>
            <tr>
              <th>Total Investment</th>
              <td>{`¥${totalInvestment.toLocaleString()}`}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FetchSavedCars;
