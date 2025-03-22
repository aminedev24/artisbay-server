import React from "react";
import SignupForm from "../forms/registerForm"; // Import the SignupForm component
import { useUser } from "../user/userContext"; // Import useUser  hook
import "../../css/layout/RightSidebar.css";
import { Link } from "react-router-dom";
import ImageWithLoader from "./imageWithLoader";
const RightSidebar = () => {
  const { user, logout } = useUser(); // Access user and logout from context

  const logoutHandler = () => {
    logout();
   
  };

  return (
    <>
  <div className="right-sidebar">
  <div className="account-container">
  {!user ? (
    <>
    <div className="register-banner">
      <img src={`${process.env.PUBLIC_URL}/images/homepage/register0.png`} />
    
      <Link to='/login'><button className="sign-in-btn">sign in</button></Link>
      <Link to='register'><button className="register-btn">register</button></Link>
    </div>   
    </>
  ) : (
    <>
     <div className="welcome-banner">
       <img src={`${process.env.PUBLIC_URL}/images/homepage/register1.png`} />
      
       <Link onClick={logoutHandler}><button className="contact-btn">logut</button></Link>
       <Link to='/profile'><button className="profile-btn">profile</button></Link>
    </div>
      
    </>
  )}


  <div 
    className="shipment-banner"
  
  >
    {/*<img src={`${process.env.PUBLIC_URL}/images/homepage/shipping.png`} />*/}
    <ImageWithLoader
          src={`${process.env.PUBLIC_URL}/images/homepage/shipping.png`}
         
    />
    <Link to='shipping'><button className="shipping-btn">learn more</button></Link>
    
  </div>
  
  </div>
</div>
    </>
  );
};

export default RightSidebar;
