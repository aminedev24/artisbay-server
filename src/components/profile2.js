import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useCheckScreenSize from './screenSize';
import Settings from './settings';
import Privacy from './help/privacy';
import TermsConditions from './help/terms';
import AntiSocialPolicy from './help/asf';
import '../css/profilePage.css';
import BankInformation from './help/bankInfo';
import SalesAgreement from './salesAgreement';
import InquiryList from './inquiryList';
import TireOrderList from './submittedTireOrders';
import InvoiceList from './invoicesList';
import FetchSavedCars from './fetchSavedCars';
import DepositsTable from './fetchDeposits';
import AdminUserList from './getUsers';
import { useUser } from "./userContext"; // Importing the useUser hook to access user data

const LoadingSpinner = () => (
  <div className="spinner-container">
    <div className="spinner"></div>
  </div>
);

const ProfilePage = () => {
  const [userr, setUserr] = useState(null);
  const { user } = useUser(); // Accessing the user from context
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [userProfile, setUserProfile] = useState(true);
  const [agreementType, setAgreementType] = useState(''); // State for agreement type

  const navigate = useNavigate();
  const { section } = useParams(); // Get URL param
  const { isSmallScreen, isPortrait } = useCheckScreenSize();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    company: '',
    address: ''
  });

  const apiUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost/artisbay-server/server"
      : "/server";

  console.log(user.role)
  // Menu items configuration
  const menuItems = [
    { key: 'settings', label: 'Settings', component: Settings },
    { key: 'Inquiries', label: 'Inquiries', component: InquiryList },
    { key: 'Submitted tire orders', label: 'Submitted tire orders', component: TireOrderList },
    { key: 'Invoices List', label: 'Invoices List', component: InvoiceList },
    { key: 'Accountancy', label: 'Accountancy', component: DepositsTable},
    { key: 'privacy', label: 'Privacy', component: Privacy },
    { key: 'terms', label: 'Terms & Conditions', component: TermsConditions },
    { key: 'anti-social-policy', label: 'Anti-Social Forces Policy', component: AntiSocialPolicy },
    { key: 'sales-contract', label: 'Sales Contract', component: SalesAgreement },
    { key: 'Cutting & Dismantling logs', label: 'Cutting & dismantling logs', component: FetchSavedCars },
    user.role && user.role == 'admin' ?
    { key: 'Users', label: 'Users list', component: AdminUserList }
    :''

  ];

  // Determine active content based on URL or default to settings
  const [activeContent, setActiveContent] = useState(
    section && menuItems.some(item => item.key === section)
      ? section
      : 'settings'
  );

  // Set agreement type based on active content
  useEffect(() => {
    switch (activeContent) {
      case 'terms':
        setAgreementType('Terms & Conditions');
        break;
      case 'privacy':
        setAgreementType('Privacy Policy');
        break;
      case 'anti-social-policy':
        setAgreementType('Anti-Social Forces Policy');
        break;
      case 'sales-contract':
        setAgreementType('Sales Agreement');
        break;
      default:
        setAgreementType('');
    }
  }, [activeContent]);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${apiUrl}/profile.php`, {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setUserr(data);
        setFormData({
          name: data.full_name,
          country: data.country,
          company: data.company,
          address: data.address
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !userr) {
      navigate("/login");
    }
  }, [loading, userr, navigate]);

  // Handle URL and invalid sections
  useEffect(() => {
    // If section is in URL but not valid, redirect to settings
    if (section && !menuItems.some(item => item.key === section)) {
      navigate('/profile/settings', { replace: true });
      setActiveContent('settings');
    }
  }, [section, navigate]);

  // Handle menu item selection
  const handleMenuClick = (item) => {
    setActiveContent(item.key);
    navigate(`/profile/${item.key}`, { replace: true });
  };

  // Render loading state

  if (loading) {
    return (
      <div style={{alignItems : loading ? 'center' : '' }} className="profile-wrapper">
        <LoadingSpinner />      
      </div>
    )
  }


  // If user is not logged in, return null
  if (!userr) {
    return null;
  }

  // Find the active component
  const ActiveComponent = menuItems.find(
    item => item.key === activeContent
  )?.component || Settings;

  const isSpecialContent = isSmallScreen && (
    activeContent === 'terms' ||
    activeContent === 'privacy' ||
    activeContent === 'sales-contract' ||
    activeContent === 'anti-social-policy'
  );

  const isSpecialContent2 = (
    activeContent === 'terms' ||
    activeContent === 'privacy' ||
    activeContent === 'sales-contract' ||
    activeContent === 'anti-social-policy'
);

  
  const style = {
    height: isSpecialContent ? '70vh' : '118vh',
    padding: isSpecialContent2 ? '0' : '',
  };

  return (
    <div className="profile-wrapper">
      <div className="profile-container">
        <div className="profile-sidebar">
          <div className='profile-sidebar-menus'>
            <h2>MENU</h2>
            <ul>
              {menuItems.map((item) => (
                <li
                  key={item.key}
                  onClick={() => handleMenuClick(item)}
                  className={activeContent === item.key ? 'active' : ''}
                  style={{ cursor: 'pointer' }}
                >
                  {item.label}
                </li>
              ))}
            </ul>
            <div className="amount">
              <p><strong>Total Guaranty:</strong> $2,014</p>
              <p><strong>Total Expensive Guaranty:</strong> $2,014</p>
              <p><strong>Spending Amount:</strong> ¥1,042,063</p>
            </div>
          </div>
        </div>
        <div className="profile-content" style={style}>
          <ActiveComponent
            user={userr}
            setUser={setUserr}
            formData={formData}
            setFormData={setFormData}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            userProfile={userProfile}
            agreementType={agreementType} // Pass agreementType as a prop
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;