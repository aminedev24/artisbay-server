import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import HowToBuy from './howtobuy';
import CompanyProfile from './companyProfile';
import '../../css/help/help.css';
import TermsAndConditions from './terms';
import AntiSocialForcesPolicy from './asf';
import WhyChooseUs from './whyChooseUs';
import CarDismantlingService from '../vehicles/dismantling';
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
import ImageWithLoader from '../misc/imageWithLoader';
import useCheckScreenSize from '../utilities/screenSize';
import { SidebarOpen } from 'lucide-react';
import { ChevronsDownIcon } from 'lucide-react';
// Define the topics
const topics = {
  help: [
    { name: "help", content: <h1 className='help-header'>All you need to know about us</h1>, image: `${process.env.PUBLIC_URL}/images/helpheader.png` },
   // { name: "Overview", component: <ArtisbayOverview />, image: `${process.env.PUBLIC_URL}/images/companyoverview.png` },
    { name: "About Us", component: <CompanyProfile />, image: `${process.env.PUBLIC_URL}/images/companyprofile.png` },
    { name: "Bank Information", content: <BankInformation />, image: `${process.env.PUBLIC_URL}/images/bankinfo.png` },
    { name: "Frequently Asked Questions", content: <FAQComponent />, image: `${process.env.PUBLIC_URL}/images/FAQ.png` },
    { name: "Automated Invoice", content: <AutomatedInvoice />, image: `${process.env.PUBLIC_URL}/images/invoicegenerator.png` },
    //{ name: "Why Artisbay Inc", content: <ArtisbayInfo />, image: `${process.env.PUBLIC_URL}/images/whychooseusrecent.jpeg` },
    { name: "Artisbay Consulting", content: <ArtisbayPromo />, image: `${process.env.PUBLIC_URL}/images/artisbayconsultingheader.png` },
    { name: "Terms and conditions", content: <TermsAndConditions />, image: `${process.env.PUBLIC_URL}/images/terms&conditions.png` },
    { name: "Anti Social Force Policy", content: <AntiSocialForcesPolicy />, image: `${process.env.PUBLIC_URL}/images/asf.png` },
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
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const decodedTopic = topicParam.replace(/-/g, " ");
    const foundTopic = topics.help.find(topic => topic.name.toLowerCase() === decodedTopic?.toLowerCase()) ||
      topics.buying.find(topic => topic.name.toLowerCase() === decodedTopic?.toLowerCase());
      setSidebarOpen(!isSidebarOpen)

    setSelectedTopic(foundTopic || topics.help[0]);
  }, [topicParam]);

  

  const handleTopicChange = (topic) => {
    setSelectedTopic(topic);
    const formattedName = topic.name.replace(/[\s]/g, "-"); // Replace spaces and '&' with '_'
    navigate(`/help/artisbayInc/${formattedName}`);
  };

  const isSpecialContent2 =  (
    selectedTopic.name === 'Terms and conditions' ||
    selectedTopic.name === 'privacy policy' ||
    selectedTopic.name === 'Artisbay Consulting' ||
    selectedTopic.name === 'Anti Social Force Policy' || 
    selectedTopic.name === 'about used Tires' ||
    selectedTopic.name === 'F&Q' || 
    selectedTopic.name === 'About payement'
    
  );

  //console.log('isSpecialContent2', isSpecialContent2)
  //console.log('isSpecialContent', isSpecialContent)

  const [styles, setStyles] = useState({});

  
useEffect(() => {
  if (isSidebarOpen) {
    const timer = setTimeout(() => {
      setSidebarOpen(false);
    }, 9000);

    return () => clearTimeout(timer); // Cleanup timer if sidebar closes earlier
  }
}, [isSidebarOpen]); // Runs when sidebar state changes

useEffect(() => {
  setTimeout(() => {
    setStyles({
      width: isSidebarOpen ? "70%" : "auto",
      alignItems: isSidebarOpen ? "center" : "stretch",
      flexDirection: isSidebarOpen ? "column" : "column",
      backgroundColor: !isSidebarOpen ? "var(--primary-color)" : "transparent",
      padding: !isSidebarOpen ? "10px" : "0px",
      display: "flex",
      transformOrigin: "left center",
    });
  }, 10); // Small delay to ensure styles are applied properly
}, [isSidebarOpen]);



  const style = {
    height: !isSidebarOpen && isSmallScreen && selectedTopic.name == 'help' ? '60vh' :
    !isSidebarOpen && !isSmallScreen && selectedTopic.name == 'help' ? '80vh' : 
    isSmallScreen && SidebarOpen && selectedTopic.name != 'help' ? '60vh' : ''
  }
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [topicParam]);

//  console.log("Selected topic:", selectedTopic.name);


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
          <div className={`sidebar-header  ${!isSidebarOpen ? '' : ''}`}>
            
           
            <div 
              style={styles} 
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className='arrow-icon-container'
              
            >
               <h1 
              onClick={() => 
                !isSidebarOpen ? setSidebarOpen(!isSidebarOpen) : handleTopicChange(topics.help[0])
                
              } 
              className={`help-header ${!isSidebarOpen ? 'oriented': ''}`}
              style={{color: !isSidebarOpen ? '#fff': '#1da1f2',
                writingMode: !isSidebarOpen ? 'tb-rl' : '',
                letterSpacing: !isSidebarOpen ? '10px': ''
              
              }}
              
            >
              HELP
              {!isSidebarOpen ? <ChevronsDownIcon style={{rotate: '', color: 'var(--accent-color)'}} /> : ''}
            </h1>
              {/*
              <span className={`arrow-icon-text ${!isSidebarOpen ? "vertical" : ''}`}>
                {isSidebarOpen ? "Hide" : 'Show'}
              </span>*/}
           
            </div>
          </div>
          {isSidebarOpen && (
            <div className="sidebar-menu">
              <img 
                className={`arrow-icon`}
                width={'50px'} 
                src={`${process.env.PUBLIC_URL}/images/arrows.png`} 
                alt="arrow" 
                onClick={()=>{setSidebarOpen(!SidebarOpen)}}
              />
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
          //style={{ height: selectedTopic.name === 'help' && !isSmallScreen ? '100vh' : '40vh' }} 
          
          className="content-area"
          style={style}
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
