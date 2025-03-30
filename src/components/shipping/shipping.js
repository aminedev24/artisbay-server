import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import '../../css/pages/shipping.css';
import useCheckScreenSize from '../utilities/screenSize';
import AfricaShippingTable from "./africaContainer";
import AfricaRoroShippingTable from "./africaRoroContainer";
import EuropeRoroShippingTable from "./europeRoro";
import {Helmet} from 'react-helmet-async';

const Shipping = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isSmallScreen, isPortrait } = useCheckScreenSize();

  // Extract destination from URL or default to null
  const [showTable, setShowTable] = useState(() => {
    const searchParams = new URLSearchParams(location.search);
    const destParam = searchParams.get('dest');
    return destParam ? parseInt(destParam) : null;
  });

  useEffect(() => {
    if (showTable !== null) {
      const applyFontSize = () => {
        const fontSize = (() => {
          if (isSmallScreen && isPortrait) return '15px';
          if (isSmallScreen && !isPortrait) return '15px';
          return '12px';
        })();
  
        // Use a timeout to ensure the table is rendered
        setTimeout(() => {
          const elements = document.querySelectorAll('th, td');
          elements.forEach((el) => {
            el.style.fontSize = fontSize;
          });
        }, 0);
      };
  
      applyFontSize();
      
      // Update URL parameter when table changes
      navigate(`?dest=${showTable}`, { replace: true });
    }
  }, [showTable, isSmallScreen, isPortrait, navigate]);
  const handleAfricaRoroClick = () => {
    setShowTable(1);
  };

  const handleAfricaContainerClick = () => {
    setShowTable(2);
  };

  const handleEuropeContainerClick = () => {
    setShowTable(3);
  };

  return (
    <div 
      className="shipping-container"
    >
       <Helmet>
        <title>Artisbay Inc. | Shipping Schedule</title>
        <meta name="description" content="Explore our shipping options and schedule for used cars and tires with Artisbay Inc." />
      </Helmet>
      <div className="header">
        <img
          alt="Company Logo"
          src={`${process.env.PUBLIC_URL}/images/logo3new.png`} 
          width="130"
        />
        <h1>Shipping Schedule</h1>
      </div>
      <div className="content">
        <button 
          onClick={handleAfricaRoroClick}
          className={showTable === 1 ? 'active' : ''}
        >
          AFRICA (RO-RO)
        </button>
        <button 
          onClick={handleAfricaContainerClick}
          className={showTable === 2 ? 'active' : ''}
        >
          AFRICA (CONTAINER)
        </button>

        <button 
          onClick={handleEuropeContainerClick}
          className={showTable === 3 ? 'active' : ''}
        >
          europe (RO-RO)
        </button>
      </div>
      {/* Render only the selected table */}
      {showTable === 1 && <AfricaRoroShippingTable />}
      {showTable === 2 && <AfricaShippingTable />}
      {showTable === 3 && <EuropeRoroShippingTable />}
        {!showTable &&
         <div className="image-container">
         <img
           style={{
            height: isSmallScreen && isPortrait ? '60dvh' : '',
           }} 
           alt="freighter sailing"
           src={`${process.env.PUBLIC_URL}/images/freightersailing.jpeg`} 
           
     />
     </div>
        }
       
      
    </div>
  );
};

export default Shipping;