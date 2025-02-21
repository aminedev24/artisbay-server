import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import CarDetails from './components/carDetails';
import Stocklist from './components/stockList';
import carData from './components/carData'; // Import car data
import HomePage from './components/homepage';
import Contact from './components/contact';
//import HowToBuy from './components/howtobuy';
import LeftSidebar from './components/sidebar'; // Import the LeftSidebar
import './css/App.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CarDismantling from './components/carDismantling';
import UsedTires from './components/usedTires';
import HelpPage from './components/help/help';
import InquiryForm from './components/vehiculeEnquiry';
import RegisterForm from './components/register';
import { UserProvider } from './components/userContext';
import Login from './components/login';
import { useLocation } from 'react-router-dom';
import ResetPassword from './components/resetPassword';
import ForgotPassword from './components/forgotPassword';
import ProfilePage from './components/profile2';
import Shipping from './components/shipping';
import ProformaInvoiceForm from './components/invoiceForm';
import NamibiaAgent from './components/namibiaAgent';
import CongoAgent from './components/congoAgent';
import TanzainaAgent from './components/tanzaniaAgent';
import CarCostCalculator from './components/cuttingCalculator';
import PdfContent from './components/help/japanDealers';
import SendEmailVerification from './components/SendEmailVerification';
import VerifyEmail from './components/verifyEmail';

function App() {
  
  const [bodyWidth, setBodyWidth] = useState(window.screen.width);
  const location = useLocation();
  
  useEffect(() => {
    const pathname = location.pathname;
  
    // If the path is '/' (homepage), set the default title
    if (pathname === '/') {
      document.title = "Artisbay Inc. | Used cars and used tires for sale";
      return;
    }
  
    // Otherwise, extract and format the path
    const pathSegments = pathname
      .replace(/^\/|\/$/g, "") // Remove leading/trailing slashes
      .split("/") // Split into segments
      .map(segment => segment.replace(/-/g, " ")) // Replace dashes with spaces
      .map(segment => segment.charAt(0).toUpperCase() + segment.slice(1)); // Capitalize first letter
  
    const formattedTitle = `Artisbay Inc. | ${pathSegments.join(" ")}`;
    console.log("Updated Path:", formattedTitle); // Debugging
  
    document.title = formattedTitle;
  }, [location.pathname]); // Runs every time the path changes
  
  const [cars, setCars] = useState([]);
  
  useEffect(() => {
    setCars(carData); // Use the imported carData
  }, []);
  
  return (
    <UserProvider>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage cars={cars} />} />
        <Route path="/cars/:id" element={<CarDetails cars={cars} />} />
        <Route path="/stocklist" element={<Stocklist cars={cars} />} />
        <Route path="/contact" element={<Contact />} />
        {/* More routes here */}
        <Route path="/car-dismantling" element={<CarDismantling />} />
        <Route path="/used-tires" element={<UsedTires />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/vehicleInquiry" element={<InquiryForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/profile/:section?" element={<ProfilePage />} />
        <Route path='/shipping' element={<Shipping />} />
        <Route path='/invoice-generator' element={<ProformaInvoiceForm />} />
        <Route path='/local-services/namibia' element={<NamibiaAgent />} />
        <Route path='/local-services/congo' element={<CongoAgent />} />
        <Route path='/local-services/tanzania' element={<TanzainaAgent />} />
        <Route path='/car-cost-calculator' element={<CarCostCalculator />} />
        <Route path='/japan-exports' element={<PdfContent />} />
        <Route path='/send-email-verification' element={<SendEmailVerification />} />
        <Route path='/get-email-verification' element={<VerifyEmail />} />
        
        {/* Catch-all route for undefined paths */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </UserProvider>
  );

  
}

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-heading">404 - Page Not Found</h1>
      <p className="not-found-description">
        Sorry, the page you're looking for doesn't exist. Check the URL or return to the <Link to="/">homepage</Link>.
      </p>
    </div>
  );
};

export default App;
