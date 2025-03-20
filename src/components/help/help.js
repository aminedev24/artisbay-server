import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import HowToBuy from './howtobuy';
import CompanyProfile from './companyProfile';
import '../../css/help.css';
import TermsAndConditions from './terms';
import AntiSocialForcesPolicy from './asf';
import WhyChooseUs from './whyChooseUs';
import CarDismantlingService from '../dismantling';
import ArtisbayOverview from './overview';
import EnvironmentalMessage from './envirementPolicy';
import PaymentPolicy from './securityNotice';
import PaypalInfo from './paypal'; 
import ArtisbayInfo from './whyArtisbay';
import PaymentMethods from './paymentMethods';
import UsedTiresFAQ from './aboutusedtires';
import AuctionLanding from './auction';
import TelegraphicTransfer from './telegraphicTransfer';
import PrivacyPolicy from './privacy';
import SellInArtisbay from './sellinartisbay';
import BankInformation from './bankInfo';
import FAQComponent from './faq';
import AutomatedInvoice from './automatedInvoice';
import WisePaymentInstructions from './wise';
import BusinessConsulting from './businessConsulting';
import PdfContent from './japanDealers';
import ArtisbayPromo from './artisbayPromo2';
import ImageWithLoader from '../imageWithLoader';
import useCheckScreenSize from '../screenSize';

// Define the topics
const topics = {
  help: [
    { name: "help", content: <h1 className='help-header'>All you need to know about us</h1>, image: `${process.env.PUBLIC_URL}/images/helpheader.png` },
    { name: "Overview", component: <ArtisbayOverview />, image: `${process.env.PUBLIC_URL}/images/companyoverview.png` },
    { name: "Company Profile", component: <CompanyProfile />, image: `${process.env.PUBLIC_URL}/images/companyprofile.png` },
    { name: "Bank Information", content: <BankInformation />, image: `${process.env.PUBLIC_URL}/images/bankinfo.png` },
    { name: "F&Q", content: <FAQComponent />, image: `${process.env.PUBLIC_URL}/images/FAQ.png` },
    { name: "Automated Invoice", content: <AutomatedInvoice />, image: `${process.env.PUBLIC_URL}/images/invoicegenerator.png` },
    { name: "Why Artisbay Inc.", content: <ArtisbayInfo />, image: `${process.env.PUBLIC_URL}/images/whychooseusrecent.jpeg` },
    { name: "Artisbay Consulting", content: <ArtisbayPromo />, image: `${process.env.PUBLIC_URL}/images/artisbayconsultingheader.png` },
    { name: "Terms and conditions", content: <TermsAndConditions />, image: `${process.env.PUBLIC_URL}/images/terms&conditions.png` },
    { name: "Anti-Social Force Policy", content: <AntiSocialForcesPolicy />, image: `${process.env.PUBLIC_URL}/images/asf.png` },
    { name: "How to Buy used cars", component: <HowToBuy />, image: `${process.env.PUBLIC_URL}/images/howtobuyrecent2.jpeg` },
    { name: "auction", content: <AuctionLanding />, image: `${process.env.PUBLIC_URL}/images/auction.png` },
    { name: "about used Tires", component: <UsedTiresFAQ />, image: `${process.env.PUBLIC_URL}/images/tiresfromjapanhelp.png` },
  ],
  buying: [
    { name: "about Dismantled Cars", content: <CarDismantlingService />, image: `${process.env.PUBLIC_URL}/images/dismantling&cutting.jpeg` },
    { name: "About payement", component: <PaymentMethods />, image: `${process.env.PUBLIC_URL}/images/aboutpaymentrecent.jpeg` },
    { name: "Wise Banking", component: <WisePaymentInstructions />, image: `${process.env.PUBLIC_URL}/images/wisebanner.png` },
    { name: "paypal", content: <PaypalInfo />, image: `${process.env.PUBLIC_URL}/images/paypalbannerrecent.jpeg` },
    { name: "telegraphic transfer", content: <TelegraphicTransfer />, image: `${process.env.PUBLIC_URL}/images/telegraphictransferrecent.jpeg` },
    { name: "security", content: <PaymentPolicy />, image: `${process.env.PUBLIC_URL}/images/securityalert.png` },
    { name: "privacy policy", content: <PrivacyPolicy />, image: `${process.env.PUBLIC_URL}/images/privacybanner.png` },
    { name: "Machinery", content: '', image: `${process.env.PUBLIC_URL}/images/comingsoon.jpeg` },
    { name: "Sustainability", content: <EnvironmentalMessage />, image: `${process.env.PUBLIC_URL}/images/eco3.png` },
  ]
};

const HelpPage = () => {
  const { topic: topicParam } = useParams(); // Extract the topic from the URL parameter
  const navigate = useNavigate();
  const { isSmallScreen } = useCheckScreenSize();
  
  // Find the topic in the help or buying arrays (case insensitive)
  const initialTopic = 
    topics.help.find(topic => topic.name.toLowerCase() === topicParam?.toLowerCase()) ||
    topics.buying.find(topic => topic.name.toLowerCase() === topicParam?.toLowerCase()) ||
    topics.help[0];
    
  const [selectedTopic, setSelectedTopic] = useState(initialTopic);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Convert underscores back to spaces for matching
    // Convert underscores back to spaces and ampersands
    const decodedTopic = topicParam
      .replace(/_/g, " ")
      .replace(/%26/g, "&");
      
    const foundTopic = 
      topics.help.find(topic => topic.name.toLowerCase() === decodedTopic?.toLowerCase()) ||
      topics.buying.find(topic => topic.name.toLowerCase() === decodedTopic?.toLowerCase());
        
    if (foundTopic) {
      setSelectedTopic(foundTopic);
    } else {
      setSelectedTopic(topics.help[0]);
    }
    setIsLoading(false);
  }, [topicParam]);
  

  const handleTopicChange = (topic) => {
    setSelectedTopic(topic);
    const formattedName = topic.name.replace(/[\s&]/g, "_"); // Replace spaces and '&' with '_'
    navigate(`/help/artisbayInc/${formattedName}`);
  };
  
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [topicParam]);

  console.log("Selected topic:", selectedTopic.name);

  return (
    <div className="help-page">
      {selectedTopic.image && (
        <ImageWithLoader
          src={selectedTopic.image}
          className="topic-image"
          alt={selectedTopic.name}
        />
      )}
      <div className={`help-main-content ${
            selectedTopic.name === 'help' ? 'help-lp' : 
            selectedTopic.name === 'Sustainability' ? 'commitment-topic-lp' : ''
        }`}>
        <div className={`sidebar ${isSidebarOpen ? 'open' : 'collapsed'}`}>
          <div className="sidebar-header">
            <h1 
              onClick={() => handleTopicChange(topics.help[0])} 
              className={`help-header ${!isSidebarOpen ? 'vertical' : ''}`}
            >
              HELP
            </h1>
            <div 
              style={{
                width: isSidebarOpen ? '30%' : '',
                alignItems: isSidebarOpen ? 'center' : '',
                flexDirection: isSidebarOpen ? 'column': ''
              }} 
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className='arrow-icon-container'
            >
              <span className={`arrow-icon-text ${!isSidebarOpen ? "vertical" : ''}`}>
                {isSidebarOpen ? "Hide" : 'Show'}
              </span>
              <img 
                className={`arrow-icon ${!isSidebarOpen ? 'vertical' : ''}`}
                width={'50px'} 
                src={`${process.env.PUBLIC_URL}/images/arrows.png`} 
                alt="arrow" 
              />
            </div>
          </div>
          {isSidebarOpen && (
            <div className="sidebar-menu">
              {topics.help.map((topic, index) => (
                topic.name !== 'help' && (
                  <button
                    key={index}
                    onClick={() => handleTopicChange(topic)}
                    className={selectedTopic.name === topic.name ? 'active' : ''} 
                  >
                    {topic.name}
                  </button>
                )
              ))}
              {topics.buying.map((topic, index) => (
                <button
                  key={index}
                  onClick={() => handleTopicChange(topic)}
                  className={selectedTopic.name === topic.name ? 'active' : ''}
                >
                  {topic.name}
                </button>
              ))}
            </div>
          )}
        </div>
        <div 
          style={{ height: selectedTopic.name === 'help' && !isSmallScreen ? '100vh' : '' }} 
          className="content-area"
        >
          <h2 className={
              selectedTopic.name === 'our commitment to Sustainability'
                ? 'content header help-header'
                : 'content-header'
            }>
            {selectedTopic.name === 'help' ? '' : selectedTopic.name}
          </h2>
          {selectedTopic.component || <>{selectedTopic.content}</>}
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
