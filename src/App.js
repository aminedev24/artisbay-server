import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Header from './components/common/header';
import Footer from './components/common/footer';
import CarDetails from './components/vehicles/carDetails';
import Stocklist from './components/misc/stockList';
import carData from './components/vehicles/carData'; // Import car data
import HomePage from './components/pages/homepage';
import Contact from './components/forms/contact';
//import HowToBuy from './components/howtobuy';
import LeftSidebar from './components/common/sidebar'; // Import the LeftSidebar
import './css/global/App.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CarDismantling from './components/vehicles/carDismantling';
import UsedTires from './components/vehicles/usedTires';
import HelpPage from './components/help/help';
import InquiryForm from './components/vehicles/vehiculeEnquiry';
import RegisterForm from './components/pages/register';
import { UserProvider } from './components/user/userContext';
import Login from './components/pages/login';
import { useLocation } from 'react-router-dom';
import ResetPassword from './components/forms/resetPassword';
import ForgotPassword from './components/forms/forgotPassword';
import ProfilePage from './components/user/profile2';
import Shipping from './components/shipping/shipping';
import ProformaInvoiceForm from './components/forms/invoiceForm';
import NamibiaAgent from './components/agents/namibiaAgent';
import CongoAgent from './components/agents/congoAgent';
import TanzainaAgent from './components/agents/tanzaniaAgent';
import CarCostCalculator from './components/forms/cuttingCalculator';
import PdfContent from './components/help/japanDealers';
import SendEmailVerification from './components/misc/SendEmailVerification';
import VerifyEmail from './components/user/verifyEmail';
import SignupForm from './components/forms/registerForm2';
import AdminVerifyEmail from './components/utilities/adminVerifyEmail';
import UserEmailVerification from './components/user/verifyUserEmail';
function App() {
  
  const [bodyWidth, setBodyWidth] = useState(window.screen.width);
  const location = useLocation();
  
  useEffect(() => {
    const pathname = location.pathname;
  
    // List of paths to exclude because they use React Helmet
    const excludedPaths = [
      '/',
      '/contact',
      '/help/artisbayInc/Company-Profile',
      '/shipping',
      '/invoice-generator',
      '/used-tires',
      '/local-services/Namibia/Walvisbay',
      '/local-services/Dr-Congo/Matadi',
      '/local-services/tanzania/Dar-Essalam',
      '/car-dismantilng-cost-calculator'
    ];
  
    // If the current path is excluded, do nothing
    if (excludedPaths.includes(pathname)) {
      console.log('Path is excluded from dynamic title update:', pathname);
      return;
    }
  
    // Otherwise, extract and format the path
    const pathSegments = pathname
      .replace(/^\/|\/$/g, '') // Remove leading/trailing slashes
      .split('/')
      .map(segment => segment.replace(/-/g, ' ')) // Replace dashes with spaces
      .map(segment => segment.charAt(0).toUpperCase() + segment.slice(1)); // Capitalize first letter
  
    const formattedTitle = `Artisbay Inc. | ${pathSegments.join(' ')}`;
    console.log('Updated Path:', formattedTitle);
  
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
        {/*<Route path="/help" element={<HelpPage />} />*/}
        <Route path="/help/artisbayInc/:topic" element={<HelpPage />} />
        <Route path="/vehicle-inquiry" element={<InquiryForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/profile/:section?" element={<ProfilePage />} />
        <Route path='/shipping' element={<Shipping />} />
        <Route path='/invoice-generator' element={<ProformaInvoiceForm />} />
        <Route path='/local-services/Namibia/Walvisbay' element={<NamibiaAgent />} />
        <Route path='/local-services/DR-Congo/Matadi' element={<CongoAgent />} />
        <Route path='/local-services/Tanzania/Dar-Essalam' element={<TanzainaAgent />} />
        <Route path='/car-dismantilng-cost-calculator' element={<CarCostCalculator />} />
        <Route path='/japan-exports' element={<PdfContent />} />
        <Route path='/send-email-verification' element={<SendEmailVerification />} />
        <Route path='/get-email-verification' element={<VerifyEmail />} />
        <Route path="/verify_email" element={<AdminVerifyEmail />}/>
        <Route path="/get_user_email_verification" element={<UserEmailVerification />}/>

        
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
