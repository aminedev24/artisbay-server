import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation , useNavigate} from 'react-router-dom';
import { useUser } from '../user/userContext'; // Import useUser hook
import '../../css/layout/header.css';
import TopBar from './topbar';
import '@fortawesome/fontawesome-free/css/all.min.css';
import ReactCountryFlag from "react-country-flag";
import RevertImpersonationButton from '../utilities/handleRevert';
const Header = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRefs = useRef({}); // Object to hold refs for all dropdowns
  const location = useLocation();

  const { user, logout } = useUser();

  const toggleDropdown = (dropdownName) => {
    setActiveDropdown((prev) => (prev === dropdownName ? null : dropdownName));
  };

  const handleClickOutside = (event) => {
    // Close dropdown if clicked outside any active dropdown
    if (
      activeDropdown &&
      dropdownRefs.current[activeDropdown] &&
      !dropdownRefs.current[activeDropdown].contains(event.target)
    ) {
      event.stopPropagation(); // Prevent bubbling issues
      setActiveDropdown(null);
    }
  };

  const logoutHandler = () => {
    logout();
    setActiveDropdown(null);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeDropdown]);

  const [searchKeyword, setSearchKeyword] = useState('');
  const navigate = useNavigate();
  
  const handleSearch = () => {
      // Update the URL with the search keyword
      navigate(`/stocklist?search=${encodeURIComponent(searchKeyword)}`);
  };
  
  const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
          handleSearch();
      }
  };

  return (
    <div className="header-container">
      <TopBar />
      <header className="main-header">
        <div className="header-top">
          <Link className="logo" to="/">
            <img src={`${process.env.PUBLIC_URL}/images/logo3.png`} alt="Logo" />
          </Link>
          <div className="header-search">
            <input
              type="text" 
              placeholder="Search by keyword..." 
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onKeyPress={handleKeyPress}

             />
            <i className="fas fa-search search-icon" onClick={handleSearch}></i>
          </div>
          <div className="header-icons">
            <div className="header-item">
              <Link to="/contact">Contact</Link>
            </div>
            {!user ? (
              <>
                <div className="header-item">
                  <i className="fas fa-user-plus icon"></i> <Link to="/register">Register</Link>
                </div>
                <div className="header-item">
                  <i className="fas fa-user icon"></i>
                  <Link to="/login">Login</Link>
                </div>
              </>
            ) : (
              <div
                className="header-item dropdown"
                ref={(el) => (dropdownRefs.current['profile'] = el)}
                onClick={() => toggleDropdown('profile')}
              >
                <i className="fas fa-user icon"></i> {user.name || 'Profile'}
                <div
                  className={`dropdown-content profile ${
                    activeDropdown === 'profile' ? 'show' : ''
                  }`}
                >
                  <Link to="/profile">My Account</Link>
                  <button onClick={logoutHandler} className="logout-btn">
                    Logout
                  </button>

                  {user && user.isImpersonating	&&
                    <RevertImpersonationButton />
                  }
                
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="header-bottom">
          <div className="left-links">
            <div className="used-cars">
              <i className="fas fa-car icon"></i>
              <Link to={'/car-dismantling'}>Car dismantling</Link>
            </div>
            <div className="used-tires">
              <i className="fas fa-circle-notch icon"></i>
              <Link to={'/used-tires'}>Used Tires</Link>
            </div>
          </div>

          <div className="right-links">
            <ReactCountryFlag
              countryCode={"JP"}
              svg
              style={{
                  width: '1.5em',
                  height: '1.5em',
                  marginRight: '-10px',
              }}
              title={"Japan"}
            />
            <Link to={'/help/artisbayInc/Artisbay-Consulting'}>Artisbay に相談する</Link>
            <div
              className="nav-item dropdown"
              ref={(el) => (dropdownRefs.current['localServices'] = el)}
              onClick={() => toggleDropdown('localServices')}
            >
              Local Services <span className="arrow">🔽</span>
              <div
                className={`dropdown-content ${
                  activeDropdown === 'localServices' ? 'show' : ''
                }`}
              >
                
                {/*<Link to='local-services/namibiaAgent'>Namibia</Link>*/}
                <a href="/local-services/namibia">Namibia</a>
                <a href="/local-services/congo">DR-Congo</a>
                <a href="/local-services/tanzania">Tanzania</a>
              </div>
            </div>
            <div
              className="nav-item dropdown"
              ref={(el) => (dropdownRefs.current['overview'] = el)}
              onClick={() => toggleDropdown('overview')}
            >
              Help <span className="arrow">🔽</span>
              <div
                className={`dropdown-content help ${
                  activeDropdown === 'overview' ? 'show' : ''
                }`}
              >
                <Link to={'/help/artisbayInc/help'}>Help</Link>
                <Link to={'/help/artisbayInc/Company-Profile'}>Company Profile</Link>
                <Link to={'/help/artisbayInc/Bank-information'}>Bank Information</Link>
                <Link to={'/help/artisbayInc/Why-Artisbay-Inc.'}>
                  Why Artisbay Inc.
                </Link>
                <Link to={'/help/artisbayInc/Terms-and-Conditions'}>
                  Terms & Conditions
                </Link>
                <Link to={'/help/artisbayInc/Anti-Social-Force-Policy'}>
                  Anti-Social Force Policy
                </Link>
                <Link to={'/help/artisbayInc/How-to-Buy-used-cars'}>
                  How To Buy
                </Link>
                <Link to={'/help/artisbayInc/About-payement'}>About Payment</Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
