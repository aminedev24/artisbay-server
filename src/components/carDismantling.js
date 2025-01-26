import React, { useEffect } from "react";
import "../css/carDismantling.css";
import LeftSidebar from "./sidebar";
import { Link } from "react-router-dom";

const CarDismantling = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="main-content">
      <section className="carDismantling-container">
        {/* Hero Images */}
        <div className="image-container">
          <img
            src={`${process.env.PUBLIC_URL}/images/dismantlinglp.png`}
            alt="Car dismantling process"
            className="image"
          />
        </div>
        <div className="image-container cutting">
          <img
            src={`${process.env.PUBLIC_URL}/images/dismantling&cutting.png`}
            alt="Car cutting styles"
            className="image"
          />
        </div>

        {/* PDF Content Start */}
        <div className="pdf-container">
          <h1>Tailored Car Dismantling and Shipping from Japan</h1>
          <p>
            At Artisbay, we provide flexible and customizable dismantling services to meet your unique needs. 
            Choose vehicles directly from Japan’s auctions, and we’ll handle everything—from dismantling to secure 
            packing and shipping. Our efficient approach ensures optimal container utilization and the safe 
            transportation of all parts, with full transparency provided through detailed photo documentation at 
            every stage.
          </p>

          <h2>Dismantling Options</h2>
          <p>We offer multiple dismantling options to suit your specific requirements and container capacity. Each style can be further customized to fit your needs:</p>

          {/* Nose Cut */}
          <div className="cutting-style">
            <h3>1. Nose Cut</h3>
            <p>The Nose Cut includes the very front portion of the vehicle, making it ideal for customers focused on front-end repairs or replacements. It typically includes:</p>
            <ul>
              <li>Air grille</li>
              <li>Front bumper (with or without lights)</li>
              <li>Headlights or fog lights</li>
              <li>Radiator support (optional)</li>
              <li>Occasionally the hood and front fenders (if requested)</li>
            </ul>
            <p className="bold-text">This option is perfect for saving space while shipping essential front-end components.</p>
          </div>

          {/* Half Cut */}
          <div className="cutting-style">
            <h3>2. Half Cut</h3>
            <p>The Half Cut involves dividing the vehicle into two sections and includes everything from the Nose Cut, plus additional components from the front half of the car:</p>
            <div className="sub-section">
              <h4>Front Half:</h4>
              <ul>
                <li>Entire engine assembly (including harness and brain box)</li>
                <li>Gearbox/Transmission assembly</li>
                <li>Front axle and suspension system</li>
                <li>Cardan shaft (for 4WD or FR vehicles)</li>
                <li>Steering rack and column assembly</li>
                <li>Dashboard and pedals</li>
              </ul>
            </div>
            <div className="sub-section">
              <h4>Rear Half (optional):</h4>
              <ul>
                <li>Rear axle</li>
                <li>Suspension</li>
                <li>Rear body structure</li>
              </ul>
            </div>
            <p className="bold-text">This cost-effective option maximizes container efficiency while providing all critical components.</p>
          </div>

          {/* Rear Cut */}
          <div className="cutting-style">
            <h3>3. Rear Cut</h3>
            <p>Focused on the rear portion of the vehicle, this option is ideal for rear-end repairs or spare parts. It includes:</p>
            <ul>
              <li>Rear axle</li>
              <li>Suspension</li>
              <li>Trunk</li>
              <li>Rear bumper and tail lights</li>
            </ul>
          </div>

          {/* Combination Cuts */}
          <div className="cutting-style">
            <h3>4. Combination Cuts</h3>
            <p>We also offer flexible combinations tailored to your needs, such as:</p>
            <ul>
              <li>Nose Cut + Rear Cut: Ships the front and rear ends separately, omitting the middle section to save space.</li>
              <li>Half Cut + Rear Cut: Combines a front half with additional rear components for specialized use cases.</li>
            </ul>
            <p className="bold-text">This approach helps customers optimize costs and container space based on their requirements.</p>
          </div>

          {/* Optional Removals */}
          <div className="cutting-style">
            <h3>Optional Removals</h3>
            <p>For additional flexibility, we provide optional component removals for a small fee, including:</p>
            <ul>
              <li>Evaporator/AC Blower</li>
              <li>Dashboard</li>
            </ul>
            <p><em>These options can help customize your dismantling package further to meet your needs.</em></p>
          </div>

          {/* Bonus Service */}
          <div className="cutting-style">
            <h3>A Bonus Service You Won’t Find Elsewhere</h3>
            <p>Most dismantlers crack or discard windshields to save effort, but not at Artisbay. We go the extra mile:</p>
            <p className="bold-text">The windshield is carefully removed, protected in a custom wooden box, and shipped safely.</p>
            <p>This unique service saves you hundreds of dollars while ensuring your components arrive intact.</p>
          </div>

          {/* Why Choose */}
          <div className="cutting-style">
            <h3>Why Choose Artisbay?</h3>
            <ul>
              <li>Customizable dismantling options to fit your exact needs</li>
              <li>Efficient packing and cutting styles to save container space</li>
              <li>Careful handling to ensure secure shipping</li>
              <li>Full photo documentation for transparency at every stage</li>
            </ul>
          </div>
        </div>


        {/* Final CTA from PDF */}
        <div className='cta-container'> 
          <p className='cta-text'>Let us know your preferences, and we’ll handle the dismantling and packing process to ensure a cost-effective, secure, and efficient shipment. Contact us today to explore the best solution for your needs.</p> 
          <button className='cta-btn'>
            <Link to='/contact'>Contact Us</Link> 
          </button>
        </div>
      </section>
    </div>
  );
};

export default CarDismantling;