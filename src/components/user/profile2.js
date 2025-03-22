import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useCheckScreenSize from '../utilities/screenSize';
import Settings from '../misc/settings';
import Privacy from '../help/privacy';
import TermsConditions from '../help/terms';
import AntiSocialPolicy from '../help/asf';
import '../../css/user/profilePage.css';
import BankInformation from '../help/bankInfo';
import SalesAgreement from '../sales/salesAgreement';
import InquiryList from '../dataFetch/fetchIquiries';
import TireOrderList from '../sales/submittedTireOrders';
import InvoiceList from '../dataFetch/fetchInvoices';
import FetchSavedCars from '../dataFetch/fetchSavedCars';
import DepositsTable from '../dataFetch/fetchDeposits';
import AdminUserList from '../dataFetch/getUsers';
import { useUser } from "./userContext";
import { Link } from 'react-router-dom';
import AccountancyForm from '../forms/accountancyForm2';
import UserHomepage from './userHomepage';
import Calander from '../misc/calander';
import useAgreementStatus from '../utilities/agreementStatus';
import Modal from "../common/alertModal";

const apiUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost/artisbay-backup/server'
    : '/server';

const ProfilePage = () => {
  const [userr, setUserr] = useState(null);
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [userProfile, setUserProfile] = useState(true);
  const [agreementType, setAgreementType] = useState('');
  const navigate = useNavigate();
  const { section } = useParams();
  const { isSmallScreen } = useCheckScreenSize();

  // Modal states for alerting the user.
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("");  // e.g., 'alert', 'confirmation'
  
  // Suppression state to temporarily hide highlight even if status remains false.
  // For each menu key, we will mark it as suppressed if needed.
  const [suppressHighlight, setSuppressHighlight] = useState({});

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const showAlert = (message, type = "alert") => {
    setTimeout(() => {
      setModalMessage(message);
      setModalType(type);
      setShowModal(true);
    }, 1000); // Delay for 1 second
  };

  // Define a mapping between menu keys and agreement names.
  const agreementMapping = useMemo(() => ({
    terms: 'Terms & Conditions',
    privacy: 'Privacy Policy',
    'anti-social-policy': 'Anti-Social Forces Policy',
  }), []);

  // We'll use an array of the agreement names for our hook.
  const agreementNames = useMemo(() => Object.values(agreementMapping), [agreementMapping]);

  // Get the statuses for all required agreements.
  const { statuses, loading: statusLoading, error: statusError } = useAgreementStatus(agreementNames, apiUrl);
  const allAgreed = Object.values(statuses).every(status => status === true);

  // Allowed menu keys when agreements are not complete.
  const allowedKeys = ['terms', 'privacy', 'anti-social-policy'];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    company: '',
    address: ''
  });

  // Build menu items.
  const menuItems = useMemo(() => [
    { key: 'my-account', label: 'My Account', component: UserHomepage },
    { key: 'settings', label: 'Settings', component: Settings },
    { key: 'vehicle-inquiries', label: 'Vehicle Inquiries', component: InquiryList },
    { key: 'submitted-tire-orders', label: 'Submitted Tire Orders', component: TireOrderList },
    { key: 'invoices-list', label: 'Invoices List', component: InvoiceList },
    { key: 'accountancy', label: 'Accountancy', component: DepositsTable },
    { key: 'privacy', label: 'Privacy', component: Privacy },
    { key: 'terms', label: 'Terms & Conditions', component: TermsConditions },
    { key: 'anti-social-policy', label: 'Anti-Social Forces Policy', component: AntiSocialPolicy },
    { key: 'sales-contract', label: 'Sales Contract', component: SalesAgreement },
    { key: 'cutting-and-dismantling-logs', label: 'Cutting & Dismantling Logs', component: FetchSavedCars },
    // Only include admin items if the user is loaded and is admin.
    ...(user && user.role === 'admin'
      ? [
          { key: 'customers', label: 'Customers', component: AdminUserList },
          { key: 'income', label: 'Income', component: AccountancyForm }
        ]
      : [])
  ], [user]);

  // Determine active content based on URL or default to "my-account".
  const initialActive = section && menuItems.some(item => item.key === section.toLowerCase())
    ? section.toLowerCase()
    : 'my-account';
  const [activeContent, setActiveContent] = useState(initialActive);

  // If not all agreements are accepted, force navigation to an agreement route.
  useEffect(() => {
    const allowedRoutes = ['terms', 'privacy', 'anti-social-policy'];
    if (!allAgreed && !allowedRoutes.includes(activeContent)) {
      navigate(`/profile/anti-social-policy`, { replace: true });
      setActiveContent('anti-social-policy');
    }
  }, [allAgreed, activeContent, navigate]);

  // Set agreementType based on activeContent.
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
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        if (data.error) throw new Error(data.error);
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

  const handleMenuClick = (item) => {
    // If not all agreements are accepted and the clicked menu is not allowed…
    if (!allAgreed && !allowedKeys.includes(item.key)) {
      showAlert('Please accept all required agreements first.');
      
      // Set suppression for all agreement-related items with false status.
      const newSuppress = {};
      menuItems.forEach(menuItem => {
        const agreementName = agreementMapping[menuItem.key];
        if (agreementName && statuses[agreementName] === false) {
          newSuppress[menuItem.key] = true;
        }
      });
      setSuppressHighlight(newSuppress);
      
      // Clear the suppression after 3 seconds.
      setTimeout(() => {
        setSuppressHighlight({});
      }, 3000);
      
      navigate(`/profile/anti-social-policy`, { replace: true });
      setActiveContent('anti-social-policy');
      return;
    }
    // Otherwise, proceed normally.
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

  if (!userr) return null;

  const ActiveComponent = menuItems.find(item => item.key === activeContent)?.component || Settings;
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
    padding: isSpecialContent2 && activeContent !== 'my-account' ? '0' : '',
    height: isSpecialContent2 ? '185vh' : ''
  };

  // Render the component.
  return (
    <div className="profile-wrapper">
      {showModal && (
        <Modal
          message={modalMessage}
          onClose={handleCloseModal}
          type={modalType}
        />
      )}
      <div className="profile-container">
        <div className="profile-sidebar">
          <div className="profile-sidebar-menus">
            <h2>MENU</h2>
            <ul>
              {menuItems.map((item) => {
                // Check if this menu item corresponds to an agreement.
                const agreementName = agreementMapping[item.key];
                // Apply highlight only if:
                // - There is an agreement for this item
                // - The status is false
                // - And it is NOT currently suppressed
                const highlight =
                  agreementName &&
                  statuses[agreementName] === false &&
                  !suppressHighlight[item.key];
                
                return (
                  <li
                    key={item.key}
                    onClick={() => handleMenuClick(item)}
                    className={`menu-item ${activeContent === item.key ? 'active' : ''} ${highlight ? 'highlight' : ''}`}
                    style={{ cursor: 'pointer' }}
                  >
                    {item.label}
                  </li>
                );
              })}
            </ul>
            <div className="amount">
              <p><strong>Total Guaranty: </strong>{userr.total_by_currency?.JPY?.guaranty || "0 JPY"}</p>
              <p><strong>Total Extra Guaranty: </strong>{userr.total_by_currency?.JPY?.extra_guaranty || "0 JPY"}</p>
            </div>
            <Calander />
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
            setSuppressHighlight={setSuppressHighlight}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
