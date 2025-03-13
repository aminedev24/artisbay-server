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
import UserHomepage from './userHomepage';

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
    { key: 'my-page', label: 'My Page', component: UserHomepage },
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
    : 'my-page';
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

  //console.log(userr)
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
    padding: isSpecialContent2 && activeContent != 'my-page' ? '0' : '',
    height: isSpecialContent2 ? '118vh' : '',

  };

  // Calendar header and rows
const calendarHeader = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const calendarRows = [
  [
    { day: '1', className: 'text-red-500' },
    { day: '2' },
    { day: '3' },
    { day: '4' },
    { day: '5' },
    { day: '6' },
    { day: '7' }
  ],
  [
    { day: '8' },
    { day: '9' },
    { day: '10'},
    { day: '11' },
    { day: '12',},
    { day: '13' },
    { day: '14' }
  ],
  [
    { day: '15' },
    { day: '16' },
    { day: '17' },
    { day: '18' },
    { day: '19' },
    { day: '20',},
    { day: '21' }
  ],
  [
    { day: '22' },
    { day: '23' },
    { day: '24' },
    { day: '25' },
    { day: '26' },
    { day: '27' },
    { day: '28' }
  ],
  [
    { day: '29' },
    { day: '30' },
    { day: '31' },
    { day: '' },
    { day: '' },
    { day: '' },
    { day: '' }
  ]
];

const date = new Date()

calendarRows.forEach((row)=>{
  row.map((day,index)=>{
    Object.assign(day,{"className": date.getDate()-1 == day.day ? "highlight" : day.day == 20 ? 'red' : ''})
  })
}) 
console.log(userr.total_by_currency)
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
              <p><strong>Total Guaranty: </strong>{userr.total_by_currency.JPY.guaranty}</p>
              <p><strong>Total Expensive Guaranty: </strong> {userr.total_by_currency.JPY.extra_guaranty}</p>
              <p><strong>Spending Amount: </strong>{(userr.total_by_currency.JPY.spending) || 0}</p>
          
            </div>

            <div className="calendar">
            <h2>March</h2>
            <table>
              <thead>
                <tr>
                  {calendarHeader.map((day, index) => (
                    <th key={index}>{day}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {calendarRows.map((week, weekIndex) => (
                  <tr key={weekIndex}>
                    {week.map((dayItem, dayIndex) => (
                      <td key={dayIndex} className={dayItem.className ? dayItem.className : ''}>
                        {dayItem.day}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="public-holiday">PUBLIC HOLIDAY MAR 20TH</p>
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
