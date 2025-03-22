import React, { useState, useEffect, useRef } from "react";
import Stocklist from "../misc/stockList";
import carData from "../vehicles/carData"; // Import car data
import "../../css/pages/homepage.css"; // Add your CSS file for homepage styling
import { Link } from "react-router-dom";
import RightSidebar from "../misc/rightsidebar";
import SearchForm from "../misc/searchContainer";
import MediaSlider from "../misc/slider";
import Makestypes from "../utilities/makestypes";
import { FaHandPointer } from "react-icons/fa";
import useCheckScreenSize from "../utilities/screenSize";
import { useLocation } from "react-router-dom";
import ImageWithLoader from "../misc/imageWithLoader"; // import your new component

// A simple spinner component (you can also extract this to its own file)
const LoadingSpinner = () => (
  <div className="spinner-container">
    <div className="spinner"></div>
  </div>
);

function HomePage() {
  const [cars, setCars] = useState([]);
  const [filters, setFilters] = useState({
    make: "",
    model: "",
    year: "",
    price: "",
    location: "",
    searchTerm: "",
  });
  const [isLoading, setIsLoading] = useState(true); // Loading state


  

  const isSmallScreen = useCheckScreenSize();

  const location = useLocation();
/*
  useEffect(() => {
    // Simulate async loading
    setTimeout(() => {
      setCars(carData);
      setIsLoading(false); // Data has loaded
    }, 2000); // Adjust the delay as needed or replace with actual async call
  }, []);

  // While data is loading, display the spinner
  if (isLoading) {
    return <LoadingSpinner />;
  }
  */
  



  const cards = [
    {
      imgSrc: `${process.env.PUBLIC_URL}/images/howToBuy.png`,

      link: "/help/artisbayInc/How-to-Buy-used-cars",
    },

    {
      imgSrc: `${process.env.PUBLIC_URL}/images/howtopay.png`,

      link: "/help/artisbayInc/About-payement",
    },
    {
      imgSrc: `${process.env.PUBLIC_URL}/images/Thumbnails/security.png`,

      link: "/help/artisbayInc/security",
    },
    {
      imgSrc: `${process.env.PUBLIC_URL}/images/Thumbnails/eco.png`,

      link: "/help/artisbayInc/Sustainability",
    },
  ];

  const links1 = [
    { text: "OVERVIEW", path: "/help/artisbayInc/Overview" },
    { text: "COMPANY PROFILE", path: "/help/artisbayInc/Company-Profile" },
    { text: "BANK INFORMATION", path: "/help/artisbayInc/Bank-Information" },
    { text: "WHY ARTISBAY INC", path: "/help/artisbayInc/Why-Artisbay-Inc" },
    { text: "TERMS AND CONDITIONS", path: "/help/artisbayInc/Terms-and-Conditions" },
    { text: "ANTI SOCIAL FORCES POLICY", path: "/help/artisbayInc/Anti-Social-Force-Policy" },
    { text: "HOW TO BUY CARS ON ARTISBAY INC", path: "/help/artisbayInc/How-to-Buy-used-cars" },
   
    
];

const links2 = [
    { text: "ABOUT USED TIRES", path: "/help/artisbayInc/about-used-Tires" },
    { text: "ABOUT DISMANTLED CARS", path: "/help/artisbayInc/about-Dismantled-Cars" },
    { text: "ABOUT PAYMENT", path: "/help/artisbayInc/About-payement" },
    { text: "SECURITY", path: "/help/artisbayInc/security" },
    { text: "PRIVACY", path: "/help/artisbayInc/privacy-policy" },
    { text: "TELEGRAPHIC TRANSFER", path: "/help/artisbayInc/telegraphic-transfer" },
    { text: "ARTISBAY CONSULTING", path: "/help/artisbayInc/Artisbay-Consulting" }
];

  return (
    <div className="layout">
      <div className="container">
        <div className="main-content">
          <div className="homepage">
            <MediaSlider />
            <SearchForm />
          </div>
         
        </div>
        

        
        <div 
          className="info-cards-container"
          style={{
            gridTemplateColumns: isSmallScreen.isSmallScreen ? 'repeat(4, 1fr)' : 'repeat(4,1fr)',
           
          }}
        >
          {cards.map((card, index) => (
            <Link to={card.link} className="info-card-link" key={index}>
              <div className="info-card">
              <ImageWithLoader
                  src={card.imgSrc}
                  alt={`Card ${index}`}
                  className="info-card-image"
                />
              </div>
            </Link>
          ))}
        </div>

        <div className="banner-header-container">
            <ImageWithLoader
                  src={`${process.env.PUBLIC_URL}/images/consultwithab.jpeg`}
                  className="banner"
                  alt="sell banner"
            />
            <Link to="/help/artisbayInc/Artisbay-Consulting">
              <button className="sell-btn">Read more</button>
            </Link>
        </div>

        <Makestypes />
        <div className="usefulLinks_wrapper">
          
          <div class="usefulLinks_container">
            <ImageWithLoader
              src={`${process.env.PUBLIC_URL}/images/usefullLinksTitle.png`} 
              alt="usefullLinks" 
              className="title-img"
         
            />
            {/*<img className="title-img" src={`${process.env.PUBLIC_URL}/images/usefullLinksTitle.png`} alt="usefullLinks" />*/}
            
            <div className="links">
            <ul>
                {links1.map((link, index) => (
                    <li key={index}>
                        <Link to={link.path}>{link.text}</Link>
                    </li>
                ))}
            </ul>
            <ul>
                {links2.map((link, index) => (
                    <li key={index}>
                        <Link to={link.path}>{link.text}</Link>
                    </li>
                ))}
            </ul>
        </div>
            <div class="image-usefulLinks_container">
              
              
              <img
                alt="A large signboard with the ARTISBAY logo and the text 'ARTISBAY INC. DESIGNED TO SERVE YOU' in front of a modern building with glass windows."
                src={`${process.env.PUBLIC_URL}/images/companyprofile.jpg`}
              />
              
            </div>
           
          </div>
        </div>
        {/*
        <section className="stocklist-section">
          <Stocklist cars={cars} filters={filters} setFilters={setFilters} />
        </section>

        */}


        <div>
          <div className="banner-header-container">

          <picture className="banner">
            <source srcset={`${process.env.PUBLIC_URL}/images/tiresbannerhome2.webp`} type="image/webp" />
            <source srcset={`${process.env.PUBLIC_URL}/images/tiresbannerhome2.jpeg`} type="image/jpeg" /> 
            <ImageWithLoader
              src={`${process.env.PUBLIC_URL}/images/tiresbannerhome2.jpeg`}   
              className="banner"   
              alt="Tires banner"
            />
            {/*<img className="banner" src={`${process.env.PUBLIC_URL}/images/tiresbannerhome2.jpeg`} alt="Tires banner" />*/}
          </picture>

          <Link to="/help/artisbayInc/about-used-Tires">
              <button className="order-now">read more</button>
          </Link>
          {/* 
             <img
              src={`${process.env.PUBLIC_URL}/images/tiresbannerhome.jpeg`}
              className="ad-banner"
            />
            <Link to="/help/artisbayInc/about-used-Tires">
              <button className="order-now">read more</button>
            </Link>
          */}
           
          </div>

          <div className="banner-header-container">
          <picture className="banner">
            <source srcset={`${process.env.PUBLIC_URL}/images/dismantlinghome2.webp`} type="image/webp" />
            <source srcset={`${process.env.PUBLIC_URL}/images/dismantlinghome2.jpeg`} type="image/jpeg" /> 
            <ImageWithLoader
              src={`${process.env.PUBLIC_URL}/images/dismantlinghome2.jpeg`}   
              className="banner"   
              alt="dismantling banner"
            />
            {/*<img className="banner" src={`${process.env.PUBLIC_URL}/images/dismantlinghome2.jpeg`} alt="dismantling banner" />*/}
          </picture>

            <Link to="/car-dismantling">
              <button className="dismantling-btn">read more</button>
            </Link>
          </div>

          <div className="banner-header-container">
            <div className='bordered'>
            <ImageWithLoader
              src={`${process.env.PUBLIC_URL}/images/paymentmethodshome.png`}   
              className="banner"   
              
            />
            {/*
            <img
              src={`${process.env.PUBLIC_URL}/images/paymentmethodshome.png`}
              className="banner"
            />
            */}
            <Link to="/help/artisbayInc/security">
              <button className="security-btn">read more</button>
            </Link>
            <Link to="/help/artisbayInc/paypal">
              <button className="paypal-btn">read more</button>
            </Link>
            <Link to="/help/artisbayInc/telegraphic-transfer">
              <button className="bank-btn">read more</button>
            </Link>
            </div>
          </div>
        </div>
      {/*
          <div className="ad-header-container">
            <img
              src={`${process.env.PUBLIC_URL}/images/sellhome.jpeg`}
              className="ad-banner"
              alt="sell banner"
            />
            <Link to="/help/artisbayInc/sell-on-artisbay-Inc.">
              <button className="sell-btn">Read more</button>
            </Link>
        </div>
      */}


        <div className="newsupdates">
          <ImageWithLoader
            src={`${process.env.PUBLIC_URL}/images/news&updatestitle.png`} 
            className="banner"   
            alt="usefullLinks"

            />
          {/*<img className="title-img" src={`${process.env.PUBLIC_URL}/images/news&updatestitle.png`} alt="usefullLinks" />*/}
          <div className="news-item-container">
            <div className="news-items">
            <p className="news-item">2024/11/15 Artisbay Inc was born</p>
            <p className="news-item">2024/12/02 Artisbay Inc website published</p>
            <p className="news-item">2025/01/03 Artisbay Inc. is a company registered under the Yokohama Legal Affairs Bureau</p>

            </div>
            <ImageWithLoader
              src={ `${process.env.PUBLIC_URL}/images/homepage/companynewsicon.png`}    
              
            />
            {/*<img src={ `${process.env.PUBLIC_URL}/images/homepage/companynewsicon.png`} />*/}
          </div>
           
        </div>

        <div className="banner-header-container">
            <ImageWithLoader
              src={`${process.env.PUBLIC_URL}/images/ecohome2.jpeg`}  
              className="banner"   
              alt="eco friendly banner"
            />
            {/*
            <img
              src={`${process.env.PUBLIC_URL}/images/ecohome2.jpeg`}
              className="banner"
              alt="eco friendly banner"
            />
            */}
            <Link to="/help/artisbayInc/Sustainability">
              <button className="small-banner-btn eco-btn">Read more</button>
            </Link>
        </div>

        {/* Why Choose Us Section */}
        <section className="why-choose-us">
          <h2>Why Choose Us?</h2>
          <ImageWithLoader
              src={`${process.env.PUBLIC_URL}/images/whychooseushome.png`} 
              className="banner"   
               alt="Why Choose Us"
          />
          {/*
          <img
            src={`${process.env.PUBLIC_URL}/images/whychooseushome.png`}
            alt="Why Choose Us"
          />
          */}

          <p className="bold-text">
            With over 40 years of experience and a passion for quality, we
            deliver high-standard used vehicles, tires, and parts tailored to
            your needs. Our transparent processes and detailed documentation
            ensure confidence and trust in every transaction.{" "}
            <Link
              className="cta-link"
              to="/help/artisbayInc/Why-Artisbay-Inc."
            >
              Read more
            </Link>
          </p>
        </section>

        {/* Contact CTA Section */}
        <section className="contact-cta">
          <h2>Need help?</h2>
          <p>
            Contact us today and let us help you import your next car with ease!
          </p>
          <Link className="cta-button" to="/contact">
            Contact Us
          </Link>
        </section>

       
      </div>
    </div>
  );
}

export default HomePage;
