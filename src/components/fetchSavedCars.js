import { useEffect, useState } from "react";
import '../css/fetchCars.css';
import { use } from "react";
const LoadingSpinner = () => (
  <div className="spinner-container">
    <div className="spinner"></div>
  </div>
);

const FetchSavedCars = () => {
  const [savedCars, setSavedCars] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [groupedOrders, setGroupedOrders] = useState({}); // Orders grouped by orderId
  const [activeOrder, setActiveOrder] = useState(null); // Active order tab
  const [isTableCollapsed, setIsTableCollapsed] = useState(false);
  const [isItemsTableCollapsed, setIsItemsTableCollapsed] = useState(false);
  const [isOptionalTableCollapsed, setIsOptionalTableCollapsed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [underConstruction, setUnderConstruction] = useState(process.env.NODE_ENV === "development" ? false : false);

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
      ? 'http://localhost/artisbay-server/server'
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
                const orderIndex = orderIds.indexOf(car.order_id) + 1;
                const displayOrderId = `Order #${orderIndex}`;
      
                if (!acc[displayOrderId]) {
                  acc[displayOrderId] = [];
                }
      
                acc[displayOrderId].push(car);
                return acc;
              }, {});
      
              setGroupedOrders(grouped);
              
              // Set the first order as active
              const firstOrder = Object.keys(grouped)[0] || null;
              setActiveOrder(firstOrder);
      
              // Set the first car of the first order as the active tab
              if (firstOrder && grouped[firstOrder].length > 0) {
                setActiveTab(grouped[firstOrder][0].id);
              }
            } else {
              console.error("Error fetching saved cars:", data.message);
            }
          } catch (error) {
            console.error("Error fetching saved cars:", error);
          }finally {
            setLoading(false)
          }
        };
      
        fetchSavedCars();
      }, []);
      
      // When changing orders, reset the activeTab to the first car in that order
      useEffect(() => {
        if (activeOrder && groupedOrders[activeOrder]?.length > 0) {
          setActiveTab(groupedOrders[activeOrder][0].id);
        }
      }, [activeOrder, groupedOrders]);

      const calculateOrderSummary = (orderCars) => {
        let totalCars = 0;
        let totalInvestment = 0;
        let totalLists = orderCars.length; // Each car in the array is a separate list
      
        orderCars.forEach((car) => {
          const numBuyingPrice = Number(car.buying_price) || 0;
          const numTransportation = Number(car.transportation) || 0;
          const numUnits = Number(car.units) || 1;
          const tax = Number(car.tax) || 0;
      
          const carOptionalTotal = car.selectedOptionalItems.reduce((carTotal, selectedItem) => {
            console.log('selected item', selectedItem)
            return carTotal + selectedItem.price * selectedItem.units
            //const item = optionalItems.find(opt => opt.id === selectedItem);
            //return item ? carTotal + item.price : carTotal;
          }, 0);
          console.log('summary car optional total', carOptionalTotal)
      
          const feesPerVehicle = auctionFees + numTransportation + tax + cuttingFee + serviceFees + carOptionalTotal;
          const vehicleCost = numBuyingPrice + feesPerVehicle;
          const grandTotalCost = vehicleCost * numUnits;
      
          totalCars += numUnits;
          totalInvestment += grandTotalCost;
        });
      
        return { totalCars, totalInvestment, totalLists };
      };
      
      
  if (loading) {
    return (
      <div style={{alignItems : loading ? 'center' : '' }} className="profile-wrapper">
        <LoadingSpinner />      
      </div>
    )
  }

  
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
      tax,
      
    } = car;

    console.log('car', car)
    // Convert values to numbers to avoid NaN issues
    const numBuyingPrice = Number(buying_price) || 0;
    console.log(`num buying price: ${numBuyingPrice}`)
    const numTransportation = Number(transportation) || 0;
    const numUnits = Number(units) || 1; // Default to 1 if missing

    // Calculate the optional total per car
    const carOptionalTotal = car.selectedOptionalItems.reduce((total, item) => total + (item.price * item.units || 0), 0);

    console.log('car optional total', carOptionalTotal);

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

      {!underConstruction ? (
        <>  
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
        
                  {/* Car Tabs inside Order */}
                  <div className="saved-orders-tabs">
                    {groupedOrders[activeOrder].map((car) => (
                      <button
                        key={car.id}
                        className={`tab-button ${activeTab === car.id ? "active" : ""}`}
                        onClick={() => setActiveTab(car.id)}
                      >
                        {car.make} {car.model}
                      </button>
                    ))}
                  </div>
        
                  {/* Display Selected Car Details */}
                  {groupedOrders[activeOrder].map((car) =>
                    activeTab === car.id ? (
                      <div key={car.id} className="saved-car-container">
                        <div className="saved-cars-details">
                        <p><strong>Make:</strong> {car.make}</p>
                        <p><strong>Model:</strong> {car.model}</p>
        
                        <p><strong>Buying Price:</strong> ¥{new Intl.NumberFormat().format(car.buying_price)}</p>
                        <p><strong>Transportation Price:</strong> ¥{new Intl.NumberFormat().format(car.transportation)}</p>
                        <p><strong>Units:</strong> {car.units}</p>
                      </div>
        
                   <div className="items-section">
                    {/* Included Items Table */}
                    <h5
                      className="collapse-btn"
                      onClick={() => setIsItemsTableCollapsed(!isItemsTableCollapsed)}
                    >
                      {isItemsTableCollapsed ? "Show list" : "Hide list"} {isItemsTableCollapsed ? "▼" : "▲"}
                    </h5>
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Included Items</th>
                        </tr>
                      </thead>
                      <tbody style={{ display: isItemsTableCollapsed ? "none" : "table-row-group" }}>
                        {car.includedItems.length > 0 ? (
                          car.includedItems.map((item, index) => (
                            <tr key={index}><td>{item}</td></tr>
                          ))
                        ) : (
                          <tr><td>No items</td></tr>
                        )}
                      </tbody>
                    </table>
        
                    {/* Optional Items Table */}
                    <h5
                      className="collapse-btn"
                      onClick={() => setIsOptionalTableCollapsed(!isOptionalTableCollapsed)}
                    >
                      {isOptionalTableCollapsed ? "Show list" : "Hide list"} {isOptionalTableCollapsed ? "▼" : "▲"}
                    </h5>
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Optional Items</th>
                        </tr>
                      </thead>
                      <tbody style={{ display: isOptionalTableCollapsed ? "none" : "table-row-group" }}>
                        {car.selectedOptionalItems.length > 0 ? (
                          car.selectedOptionalItems.map((item, index) => (
                            <tr key={index}><td>{item.name}</td></tr>
                          ))
                        ) : (
                          <tr><td>No optional items</td></tr>
                        )}
                      </tbody>
                    </table>
        
                    {/* Order Summary */}
                    <div className="summary-section">
                      <h3>Order Summary</h3>
                      {(() => {
                        const { totalCars, totalInvestment } = calculateOrderSummary(groupedOrders[activeOrder]);
                        return (
                          <table>
                            <tbody>
                              <tr>
                                <th>Total Cars</th>
                                <td>{totalCars}</td>
                              </tr>
                          
                              <tr>
                                <th>Total Investment</th>
                                <td>¥{totalInvestment.toLocaleString()}</td>
                              </tr>
                            </tbody>
                          </table>
                        );
                      })()}
                      </div>
                          </div>
        
                              </div>
                            ) : null
                          )}
                    </div>
              )}
        
            
              {/* Summary Section */}
              <div className="summary-section">
                <h3>Total Orders Summary
                </h3>
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
              </>

           
      ): (
        <>
          <div className="overlay overlay-filter"></div>
          <div className="overlay overlay-image"></div>
        </>

      )}

      </div>

  
  );
};

export default FetchSavedCars;
