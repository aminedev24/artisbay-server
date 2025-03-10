import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useCheckScreenSize from './screenSize';
import Settings from './settings';
import Privacy from './help/privacy';
import TermsConditions from './help/terms';
import AntiSocialPolicy from './help/asf';
import '../css/profilePage.css';
import BankInformation from './help/bankInfo';
import SalesAgreement from './salesAgreement';
import InquiryList from './fetchIquiries';
import TireOrderList from './submittedTireOrders';
import InvoiceList from './fetchInvoices';
import FetchSavedCars from './fetchSavedCars';
import DepositsTable from './fetchDeposits';
import AdminUserList from './getUsers';
import { useUser } from "./userContext";
import { Link } from 'react-router-dom';
import AccountancyForm from './accountancyForm2';

const ProfilePage = () => {
  const [userr, setUserr] = useState(null);
  const { user } = useUser(); // Accessing the user from context
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [userProfile, setUserProfile] = useState(true);
  const [agreementType, setAgreementType] = useState('');

  const navigate = useNavigate();
  const { section } = useParams();
  const { isSmallScreen } = useCheckScreenSize();

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

  // Build the menuItems array using useMemo so it recalculates when user changes.
  const menuItems = useMemo(() => [
    { key: 'settings', label: 'Settings', component: Settings },
    { key: 'vehicle inquiries', label: 'Vehice Inquiries', component: InquiryList },
    { key: 'submitted tire orders', label: 'Submitted tire orders', component: TireOrderList },
    { key: 'invoices list', label: 'Invoices List', component: InvoiceList },
    { key: 'accountancy', label: 'Accountancy', component: DepositsTable },
    { key: 'privacy', label: 'Privacy', component: Privacy },
    { key: 'terms', label: 'Terms & Conditions', component: TermsConditions },
    { key: 'anti-social-policy', label: 'Anti-Social Forces Policy', component: AntiSocialPolicy },
    { key: 'sales-contract', label: 'Sales Contract', component: SalesAgreement },
    { key: 'cutting & dismantling logs', label: 'Cutting & dismantling logs', component: FetchSavedCars },

    // Only include admin items if user is loaded and is admin
    ...(user && user.role === 'admin'
      ? [
          { key: 'customers', label: 'Customers', component: AdminUserList },
          { key: 'income', label: 'Income', component: AccountancyForm }
        ]
      : [])
  ], [user]);

  // Determine active content based on URL or default to settings.
  // Use lowercase for comparison.
  const initialActive = section && menuItems.some(item => item.key === section.toLowerCase())
    ? section.toLowerCase()
    : 'settings';
  const [activeContent, setActiveContent] = useState(initialActive);

  // Set agreement type based on active content.
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

  // Fetch user data.
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
  }, [apiUrl]);

  // Redirect if not logged in.
  useEffect(() => {
    if (!loading && !userr) {
      navigate("/login");
    }
  }, [loading, userr, navigate]);

  useEffect(() => {
    if (user && section) {
      if (!menuItems.some(item => item.key === section.toLowerCase())) {
        navigate('/profile/settings', { replace: true });
        setActiveContent('settings');
      } else {
        setActiveContent(section.toLowerCase());
      }
    }
  }, [section, navigate, user, menuItems]);
  

  // Handle menu item selection.
  const handleMenuClick = (item) => {
    setActiveContent(item.key);
    navigate(`/profile/${item.key}`, { replace: true });
  };

  if (loading) {
    return (
      <div className="profile-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>      
      </div>
    );
  }

  if (!userr) {
    return null;
  }

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
          <div className="profile-sidebar-menus">
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
            agreementType={agreementType}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
