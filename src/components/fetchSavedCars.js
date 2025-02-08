import { useEffect, useState } from "react";
import '../css/fetchCars.css';

const FetchSavedCars = () => {
  const [savedCars, setSavedCars] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [groupedOrders, setGroupedOrders] = useState({}); // Orders grouped by orderId
  const [activeOrder, setActiveOrder] = useState(null); // Active order tab
  const [isTableCollapsed, setIsTableCollapsed] = useState(false);
  const [isItemsTableCollapsed, setIsItemsTableCollapsed] = useState(false);
  const [isOptionalTableCollapsed, setIsOptionalTableCollapsed] = useState(false);
  const [showModal, setShowModal] = useState(false);

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

          const orderIds = [...new Set(data.cars.map(car => car.order_id))]; // Unique order IDs

          const grouped = data.cars.reduce((acc, car) => {
            const orderIndex = orderIds.indexOf(car.order_id) + 1; // Get order position
            const displayOrderId = `Order #${orderIndex}`;
          
            if (!acc[displayOrderId]) {
              acc[displayOrderId] = [];
            }
          
            acc[displayOrderId].push(car);
            return acc;
          }, {});
          
          
          

          setGroupedOrders(grouped);
          setActiveOrder(Object.keys(grouped)[0] || null);
          //setActiveTab(data.cars.length > 0 ? data.cars[0].id : null);
        } else {
          console.error("Error fetching saved cars:", data.message);
        }
      } catch (error) {
        console.error("Error fetching saved cars:", error);
      }
    };

    fetchSavedCars();
  }, []);

 
  const handleCloseModal = () => {
    setShowModal(false);
  };


  console.log(savedCars)

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

  console.log('grouped orders:', groupedOrders)
  return (
    <div className="saved-cars-panel">
      <h1>Cutting & Dismantling inquiries</h1>
      <div className="scroll-hint-container">

      <div className="saved-orders-tabs">
        {Object.keys(groupedOrders).map((orderId) => (
          <button
            key={orderId}
            className={`tab-button ${activeOrder === orderId ? "active" : ""}`}
            onClick={() => setActiveOrder(orderId)}
          >
            {orderId}
          </button>
        ))}
      </div>
      <p className="scroll-hint left">&lt; Scroll to see more &gt;</p>

      </div>
      {/* Orders Displayed as Cards */}
      {activeOrder && groupedOrders[activeOrder] && (
              <div className="order-card">
                <h2>{activeOrder}</h2>

                {groupedOrders[activeOrder].map((car) => (
                  <div key={car.id} className="saved-car-details">
                    <h3>{car.make} {car.model}</h3>

                    <p><strong>Buying Price:</strong> ¥{new Intl.NumberFormat().format(car.buying_price)}</p>
                    <p><strong>Transportation:</strong> ¥{new Intl.NumberFormat().format(car.transportation)}</p>
                    <p><strong>Units:</strong> {car.units}</p>

                    {/* Included & Optional Items as Tables */}

                    <div className="items-section">
                      <h5
                        className="collapse-btn"
                        onClick={() => setIsItemsTableCollapsed(!isItemsTableCollapsed)}
                      >
                        {!isItemsTableCollapsed ? 'Show list': 'Hide list'} {!isItemsTableCollapsed ? "▼" : "▲"}
                      </h5>
                      <table className="items-table">
                        <thead>
                          <tr>
                            <th>Included Items</th>
                          </tr>
                        </thead>
                        <tbody>
                          {isItemsTableCollapsed && car.includedItems.length > 0 ? (
                            car.includedItems.map((item, index) => (
                              <tr key={index}><td>{item}</td></tr>
                            ))
                          ) : (
                          ''
                          )}
                        </tbody>
                      </table>


                      <h5
                        className="collapse-btn"
                        onClick={() => setIsOptionalTableCollapsed(!isOptionalTableCollapsed)}
                      >
                        {!isOptionalTableCollapsed ? 'Show list': 'Hide list'} {!isOptionalTableCollapsed ? "▼" : "▲"}
                      </h5>

                      <table className="items-table">
                   
                        <thead>
                          <tr>
                            <th>Optional Items</th>
                          </tr>
                        </thead>
                        <tbody>
                          {isOptionalTableCollapsed && car.selectedOptionalItems.length > 0 ? (
                            car.selectedOptionalItems.map((item, index) => (
                              <tr key={index}><td>{item}</td></tr>
                            ))
                          ) : (
                            ''
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
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
