import React, { useState, useEffect } from 'react';
import '../css/topbar.css'; // Adjust your CSS file path accordingly
import { useUser } from "./userContext";

const TopBar = () => {
  const [japanTime, setJapanTime] = useState('');
  const [usdToYenRate, setUsdToYenRate] = useState(147.60); // Default rate
  const [editingRate, setEditingRate] = useState(false);
  const [rateEditValue, setRateEditValue] = useState('');
  const { user } = useUser(); // Access current user from context

  const apiUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost/artisbay-server/server'
      : '/server';

  // Update Japan Standard Time every second
  useEffect(() => {
    const updateJapanTime = () => {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Tokyo',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      };
      setJapanTime(now.toLocaleTimeString('en-US', options));
    };

    const interval = setInterval(updateJapanTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch the current USD/JPY rate from the backend on component mount
  useEffect(() => {
    const fetchRate = async () => {
      try {
        const response = await fetch(`${apiUrl}/rates.php`, {
          method: "GET",
          credentials: "include", // Ensures cookies are sent if required
        });
        const data = await response.json();
        if (data.usdToYen) {
          setUsdToYenRate(parseFloat(data.usdToYen));
        } else {
          console.error("Error fetching rate:", data.error);
        }
      } catch (error) {
        console.error("Error fetching rate:", error);
      }
    };

    fetchRate();
  }, [apiUrl]);

  // Handler to start editing the rate (only for admin users)
  const handleEditClick = () => {
    setEditingRate(true);
    setRateEditValue(usdToYenRate.toString());
  };

  // Handler to save a new rate (sends a POST request to the backend)
  const handleSaveRate = async () => {
    const newRate = parseFloat(rateEditValue);
    if (!isNaN(newRate)) {
      try {
        const response = await fetch(`${apiUrl}/rates.php`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ usdToYen: newRate }),
        });
        const data = await response.json();
        if (data.usdToYen) {
          setUsdToYenRate(parseFloat(data.usdToYen));
        } else {
          console.error("Error updating rate:", data.error);
        }
      } catch (error) {
        console.error("Error updating rate:", error);
      }
    }
    setEditingRate(false);
  };

  // Handler to cancel editing the rate
  const handleCancelRate = () => {
    setEditingRate(false);
  };

  return (
    <div className="top-bar-wrapper">
      <div className="top-bar">
        <div className="app-info">
          <span className="app-name">Artisbay Inc.</span>
          <span className="total-cars stock">Total Cars in Stock: 120</span>
          <span className="cars-added-today stock">Cars Added Today: 5</span>
        </div>
        <div className="extra-info">
          <span className="time">Japan Standard Time: {japanTime}</span>
          <span className="exchange-rate">
            USD/JPY: $1 = ¥{" "}
            {editingRate ? (
              <>
                <input
                  type="text"
                  value={rateEditValue}
                  onChange={(e) => setRateEditValue(e.target.value)}
                  className="rate-edit-input"
                />
                <button
                  type="button"
                  onClick={handleSaveRate}
                  className="conversion-edit-btn"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleCancelRate}
                  className="conversion-edit-btn cancel"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                {usdToYenRate.toFixed(2)}{" "}
                {/* Only show the edit button if user exists and is admin */}
                {user && user.role === 'admin' && (
                  <button
                    type="button"
                    onClick={handleEditClick}
                    className="conversion-edit-btn"
                  >
                    Edit
                  </button>
                )}
              </>
            )}
          </span>
          {/*
          Additional selectors for country, currency, language can be added here.
          */}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
