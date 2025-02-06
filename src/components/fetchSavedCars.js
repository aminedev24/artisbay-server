import { useEffect, useState } from "react";
import '../css/fetchCars.css';
const FetchSavedCars = () => {
  const [savedCars, setSavedCars] = useState([]);
  const [activeTab, setActiveTab] = useState(null);

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
            {car.make} {car.model}
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
        ) : null
      )}
    </div>
  );
};

export default FetchSavedCars;
