import React, { useState, useEffect, useRef } from 'react';
import '../css/contact.css';
import CountryList from './countryList';
import useCheckScreenSize from './screenSize';
import { useLocation } from 'react-router-dom';

const Contact = ({ sell, japanExports }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: sell ? 'Japan' : '',
    phone: '',
    enquiry: sell ? 'sell on Artisbay' : '',
    message: '',
    prefecture: '',
    city: '',
    address: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneCode, setPhoneCode] = useState("");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const fromConsulting = queryParams.get('from') === 'consulting';


  //const fromConsulting = location.state?.fromConsulting || false;
  
  const [submitted, setSubmitted] = useState(false);
  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: sell ? 'Japan' : '',
    city: '',
    address: ''
  });

  const [messageInfo, setMessageInfo] = useState(null); // For message type and content
  const messageRef = useRef(); // For scrolling to the message
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const { isSmallScreen, isPortrait } = useCheckScreenSize();

  const apiUrl = process.env.NODE_ENV === 'development'
    ? 'http://localhost/artisbay-server/server'
    : '/server';

    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const response = await fetch(`${apiUrl}/getUserInfo.php`, {
            method: 'GET',
            credentials: 'include',
          });
    
          if (!response.ok) {
            console.error('Failed to fetch user data:', response.statusText);
            return;
          }
    
          const data = await response.json();
    
          // Check if data and expected fields exist
          if (!data || data.error || !data.data) {
            console.error('Invalid or missing data returned from API:', data);
            return;
          }
    
          // Ensure all fields are present and set defaults if needed
          const { full_name = '', email = '', phone = '', country = '' } = data.data;
    
          setUserData({
            fullName: full_name,
            email: email,
            phone: phone,
            country: country,
          });
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
    
      fetchUserData();
    }, []);
    

  useEffect(() => {
    if (userData.fullName) {
      setFormData((prevData) => ({
        ...prevData,
        name: userData.fullName,
        email: userData.email,
        phone: userData.phone,
        country: userData.country,
      }));
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name)
    // Update form data first
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    console.log(`Updating field: ${name} = ${value}`);

    
    // Handle phone code for country selection
    if (name === 'country') {
      try {
        const selectedCountry = CountryList().find(
          (country) => country.label === value
        );
        
        if (selectedCountry?.countryCode) {
          setPhoneCode(selectedCountry.countryCode);
        } else {
          // Reset phone code if no country found
          setPhoneCode('');
          console.warn('No country code found for:', value);
        }
      } catch (error) {
        console.error('Error setting phone code:', error);
        setPhoneCode('');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log(formData)

    try {
      const response = await fetch(`${apiUrl}/send_email.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData),
      });

      const result = await response.json();

      if (result.status === 'success') {
        setMessageInfo({ type: 'success', text: sell ? "Thank you for your interest in joining Artisbay! We will review your application and get back to you within a few days." :'Thank you for your message! We will get back to you shortly.' });
      } else {
        setMessageInfo({ type: 'error', text: result.message || 'Something went wrong. Please try again.' });
      }
    } catch (error) {
      console.error('Error:', error);
      setMessageInfo({ type: 'error', text: 'There was an error submitting the form. Please try again later.' });
    } finally {
      setIsSubmitting(false);

      // Scroll to the message
      if (messageRef.current) {
        messageRef.current.scrollIntoView({ behavior: 'smooth' });
      }

      // Dismiss the message after 5 seconds
      setTimeout(() => {
        setMessageInfo(null);
      }, 10000);
    }
  };

  

  return (
    <div className='form-wrapper contact-wrapper'>
  <div className="signup-container contact-container">
    <form className="signup-form contact-form" onSubmit={handleSubmit}>
      {!sell &&
         <img 
         src={`${process.env.PUBLIC_URL}/images/logo3new.png`} 
         alt="Logo" 
         className="logo-form" 
       />
      }
     

      {!sell && !japanExports && <h2>We like to hear from you!</h2>}
      <h3>{japanExports ? " お問い合わせ" :  'Contact Us'}</h3>
      {!japanExports &&
      <p className='contact-prompt'>
       If you have any questions or would like to learn more about our offerings, please don’t hesitate to reach out using the form below. We’re always eager to connect with our customers and will respond as promptly as possible.
      </p>
      }

      <div className="input-group">
        <input
          type="text"
          value={formData.name}
          onChange={handleChange}
          name="name"
          placeholder={japanExports ? '名前': 'your name'}
          required
        />
        <label> {japanExports ? '名前' : `Your Name ` } <span className="required">*</span></label>
      </div>

      <div className="input-group">
        <input
          type="email"
          value={formData.email}
          onChange={handleChange}
          name="email"
          placeholder={japanExports ? 'メールアドレス' : 'your email'}
          required
        />
        <label>{japanExports ? 'メールアドレス' : 'Email' } <span className="required">*</span></label>
      </div>

      <div className="input-group">
     
        <select
          id="country"
          name="country"
          value={formData.country}
          onChange={handleChange}
          className={formData.country ? "not-empty" : ""}
          required
        >
          <option value={""}>{japanExports ? "国":  'Select Country'}</option>
          {sell || japanExports ? (
            <option value="Japan">Japan</option>
          ) : (
            CountryList().sort((a, b) => a.label.localeCompare(b.label)).map((country) => (
              <option key={country.code} value={country.label}>
                {country.label}
              </option>
            ))
          )}
        </select>
        <label>{japanExports ? '国' : 'Country'}<span className="required">*</span></label>
      </div>

      {japanExports &&
      <div className="input-group">
          <input
            type="text"
            name="city"
            value={formData.city}
            placeholder={'市区町村'}
            onChange={handleChange}
          />
          <label>市区町村<span className="required">*</span></label>
      </div>
      }

      {japanExports &&
            <div className="input-group">
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  placeholder={'住所'}
                  onChange={handleChange}
                />
                <label>住所（初回のお問い合わせでは不要)</label>
            </div>
            }

      <div className="input-group phone-number-group">
      {phoneCode && <span className="phone-code">{phoneCode}</span>}

        <input
          type="tel"
          name="phone"
          className={phoneCode ? "shrink" : ''}
          value={formData.phone}
          onChange={handleChange}
          placeholder={japanExports ? "電話番号":  "phone number"}
          readOnly={!!userData.phone}
          required
        />
        <label>{japanExports ? '電話番号' : `Phone`}<span className="required">*</span></label>
      </div>
      

      {japanExports &&
      <div className="input-group">
          <input
            type="text"
            name="prefecture"
            value={formData.prefecture}
            placeholder={'都道府県'}
            onChange={handleChange}
          />
          <label>都道府県<span className="required">*</span></label>
      </div>
      }
        

        {!sell && (
        <div className="input-group">
          <select
            name="enquiry"
            value={formData.enquiry}
            onChange={handleChange}
            className={formData.enquiry ? "not-empty" : ""}
            required
          >
            {!japanExports ? (
              fromConsulting ? (
                <>
                  {/* New Options */}
                  <option value="">Select Enquiry Type</option>
                  <option value="Solar panels">Solar Panels</option>
                  <option value="Brand-new tires">Brand-New Tires</option>
                  <option value="Brand-new cars">Brand-New Cars</option>
                  <option value="Used cars">Used Cars</option>
                  <option value="Home appliances">Home Appliances</option>
                  <option value="Terrace roof mounts">Terrace Roof Mounts</option>
                  <option value="EV charging stations">EV Charging Stations</option>
                  <option value="Machinery">Machinery</option>
                  <option value="Agricultural Machinery">Agricultural Machinery</option>
                </>
              ) : (
                <>
                  {/* Default Options */}
                  <option value="">Select Enquiry Type</option>
                  <option value="General">General Inquiry</option>
                  <option value="Support">Support</option>
                  <option value="Sales">Sales</option>
                </>
              )
            ) : (
              <>
                {/* Japanese Options */}
                <option value="">件名</option>
                <option value="Looking for overseas customers">海外の顧客を探しています</option>
                <option value="I want to Invest">投資したい</option>
                <option value="others">その他</option>
              </>
            )}
          </select>
          <label>
            {japanExports ? '件名' : 'Enquiry type'}
            <span className="required">*</span>
          </label>
        </div>
      )}

      {sell || japanExports && (
        <div className="input-group">
          <input
            type="text"
            name="company"
            value={formData.company}
            placeholder={japanExports ? '会社名（任意)' : 'company'}
            onChange={handleChange}
          />
          <label>{japanExports ? "会社名（任意)" : "Company"}</label>
        </div>
      )}

      <div className="input-group">
      <label>{japanExports ? 'メッセージ' : 'Message'}<span className="required">*</span></label>
        <textarea
          name="message"
          placeholder={japanExports ? "メッセージ" : 'your message'}
          value={formData.message}
          onChange={handleChange}
          required
          rows="5"
        ></textarea>
        
      </div>

      {messageInfo && (
        <div className={`message ${messageInfo.type === 'success' ? 'success' : 'error'}`}>
          {messageInfo.text}
        </div>
      )}

      <button 
        type="submit" 
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : japanExports ? "送信" : 'SUBMIT'}
      </button>
    </form>
  </div>
</div>
  );
};

export default Contact;
