import React, {useState} from "react";
import "../css/namibiaAgent.css"; // Import the CSS file

const TanzainaAgent = () => {


    const faqs = [
      {
        question: "What local services are available in Tanzania?",
        answer: "Our local partners provide container clearance, RoRo (Roll-on/Roll-off) clearance, customs handling, private warehouse storage, inland and border delivery, and document processing services to ensure a smooth process for your shipments."
      },
      {
        question: "Can you assist with clearing my container or RoRo shipment at the port?",
        answer: "Yes, we support both container and RoRo shipments, handling customs clearance and duty processing through our local partners to ensure smooth and efficient clearance."
      },
      {
        question: "Do you provide warehouse storage?",
        answer: "We do not offer bonded warehouse storage, but our local partner has a private warehouse where goods can be stored securely before delivery."
      },
      {
        question: "Can you deliver my goods after customs clearance?",
        answer: "Yes, we provide inland deliveries to major cities such as Arusha and other key locations across Tanzania. We also provide border deliveries to neighboring countries, including DRC, Malawi, Burundi, Zambia, Uganda, and Zimbabwe."
      },
      {
        question: "How can I track my shipment?",
        answer: "We provide shipment tracking, keeping you updated on your container’s status. Once it arrives, clearance and delivery are handled by the clearing agent."
      },
      {
        question: "How quickly can you ship my car?",
        answer: "We ship your car as quickly as possible. If the vehicle and paperwork are ready, we book the earliest available shipment."
      },
      {
        question: "Do you handle all types of shipments?",
        answer: "We specialize in used cars, used and new tires, and used and new vehicle parts. We also select the best shipping options to ensure the cheapest and most efficient transport solutions for your needs."
      },
      {
        question: "How much do these services cost?",
        answer: "Pricing depends on the type of service, shipment size, and customs requirements. We can connect you with the right providers, who will give you a detailed cost estimate."
      },
      {
        question: "How do I get started?",
        answer: "Simply contact us, and we will connect you with our trusted local partners who specialize in customs clearance, storage, and local delivery."
      },
      {
        question: "Is an import permit required for vehicles in Tanzania?",
        answer: "No, Tanzania does not require an import permit for vehicle imports."
      },
      {
        question: "What are the year restrictions for cars imported into Tanzania?",
        answer: "Tanzania does not have a strict age limit for used vehicle imports. However, vehicles that are 8 years or older might be subject to an additional excise duty. Non-utility vehicles: 25% excise duty; Utility vehicles: 5% excise duty. Vehicles older than 10 years might be subject to a 30% dumping fee on the customs value. These regulations are subject to change, so we recommend checking with the Tanzanian Revenue Authority or a local customs agent for the latest requirements."
      },
      {
        question: "Do you offer assistance with import documentation?",
        answer: "Yes, we have a dedicated documentation center to handle House Bill of Lading (HBL) and other necessary import documents to ensure a smooth customs clearance process."
      },
      {
        question: "What if my question isn’t answered here?",
        answer: "If you have any questions that were not answered here, feel free to <a href='#/contact' class='cta-link'> contact us</a> we’ll be happy to assist you!",
        containsHtml: true
      }
    ];

    const renderAnswer = (answer, containsHtml) => {
      if (containsHtml) {
        return <p dangerouslySetInnerHTML={{ __html: answer }} />;
      } else {
        return <p>{answer}</p>;
      }
    }  

    const [showFaq, setShowFaq ] = useState(false);
  
    const handleShowFaq = () => {
      setShowFaq(!showFaq);
    }

  const scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="namibia-agent-container">
      <div className="banner">
        <img className="banner-image" alt="Header image with containers and trucks" src={`${process.env.PUBLIC_URL}/images/localServices/tanzaniabanner.png`}/>
      </div>
      <h1 className="main-title">
        Streamlined Logistics, Trusted Expertise
      </h1>
      <section className="intro-container">
        <div className="intro-content">
          <p>
          At Artisbay Inc., we understand that importing vehicles, tires, or parts into Tanzaina requires efficient and reliable clearing services. That’s why we’ve partnered with <strong>star Voyage Shippers Company Limited</strong>, a trusted clearing agent with over 10 years of experience, to offer you hassle-free logistics solutions in Dar Essalam.
          </p>
          <img alt="Image of a ship and containers" src={`${process.env.PUBLIC_URL}/images/localServices/smallbanner2.png`}/>
        </div>
      </section>
      
      <div className="nav">

        <a onClick={() => scrollToSection('contact-section')}>
        <img className="nav-icon" src={`${process.env.PUBLIC_URL}/images/localServices/agenticon.png`} alt='services icon'/>

        </a>

        <a onClick={() => scrollToSection('services')}>
          <img className="nav-icon" src={`${process.env.PUBLIC_URL}/images/localServices/servicesicon.png`} alt='services icon'/>
        </a>
        <a onClick={() => scrollToSection('packages')}>
        <img className="nav-icon" src={`${process.env.PUBLIC_URL}/images/localServices/stockicon.png`} alt='services icon'/>

        </a>
        <a href="#/help?topic=auction">
          <img className="nav-icon" src={`${process.env.PUBLIC_URL}/images/localServices/auctionicon.png`} alt='services icon'/>

        </a>

        <a onClick={() => scrollToSection('faq-list')}>
          <img className="nav-icon" src={`${process.env.PUBLIC_URL}/images/localServices/faqicon.png`} alt='services icon'/>

        </a>
     
      
      </div>

       {/* 
      <div className="banner why-choose-agent-section">
        <img className="banner-image" alt="namibia-agent-banner" src={`${process.env.PUBLIC_URL}/images/localServices/tanzaniaagent.png`}/>
      </div>
      */}


    

      <div className="background tanzania-agent">
            <div className="services-text">
                <strong>RELIABLE CLEARING AND IMPORT SERVICES IN DAR ESSALAM<br /></strong>
                <strong>Nationwide Delivery<br /></strong>
                Efficient delivery to major cities, including Dar es Salaam, Arusha, and beyond.<br />
                <strong>Border deliveries</strong> <br />
                 to DR-Congo, Zambia , Zimbabwe , Malawi, Uganda
            </div>
        </div>
      
      <section id="services" className="section-container">
        <h1 className="section-title">
          Container shipment services
        </h1>
        <div className="services">
          <h3>
          1. Consolidation Service
          </h3>
          <p>
          Our Consolidation Service allows vehicles from multiple customers to be combined into a single shared container, ensuring cost-efficient shipping and streamlined handling. This service is made possible through our collaboration with our trusted partner, <strong>StarVoyage Shippers Company Limited.</strong>
          </p>
          <h3>
          2. Customs Clearing and Documentation
          </h3>
          <p>
          • Hassle-free declaration and customs clearing.
          <br/>
          • Preparation of duty, permits, and all import paperwork for your goods.
          </p>
          <h3>
          3. Nationwide Delivery
          </h3>
          <p>
          • Efficient delivery to major cities, including Dar Essalam, Arusha and beyond.
          <br/>
          • Border deliveries to DR-Congo, Zambia, Malawi, Uganda, Zimbabwe.
          </p>
          <h3>
          4. Consignment Management
          </h3>
          <p>
          From unloading at the port to final delivery, we manage your goods every step of the way.
          </p>
        </div>
      </section>
      {/*
      
      */}


      <section id="packages" className="package-section">
        <div className="package-container">
          <div className="title">
            <h2>A Whole Package of Premium Services!</h2> 
            <span className="chevrons">
              <img 
                alt="Decorative chevrons" 
                src={`${process.env.PUBLIC_URL}/images/localServices/arrowscopy.png`} 
              />
            </span>
          </div>
          <div className="list">
            <div className="list-item">
              <strong>Reliable Clearing Agent:</strong> With over a decade of experience, StarVoyage Shippers 
              Company Limited ensures smooth customs clearance and dependable service.
            </div>
            <div className="list-item">
              <strong>Trusted Partner:</strong> Our long-standing partnership guarantees your goods are handled with care and expertise.
            </div>
            <div className="list-item">
              <strong>Bonded Warehouse:</strong> Safe and secure storage facilities for your consignments while clearing processes are completed.
            </div>
          </div>
        </div>
      </section>
   
     

      <section  className="contact-section-container">
        <div className="contact">
          <div className='contact-text'>
          <h2>
            We are your Partner for Stress-Free Imports
          </h2>
          <p>
            With<strong> Artisbay Inc. and</strong> <strong> StarVoyage Shippers Company 
            Limited.</strong>
            , you can rest assured that your goods are in safe hands. We take care of the paperwork, customs processes, and transportation so you can focus on your business.
            <strong>
            Get started today!
            </strong>
          </p>
          </div>
          <img alt="Image of a handshake and a ship with containers" height="200" src={`${process.env.PUBLIC_URL}/images/localServices/partner.png`} width="300"/>
        </div>
      </section>
      

    <section id="contact-section" className="contact-section-wrapper">
    <section className="contact-section-container">
        <img alt="Image of a handshake and a ship with containers"  src={`${process.env.PUBLIC_URL}/images/contactusblank.png`}/>
        <div className="contact-text-container">
          <p style={{maxWidth : '26%', position :'relative' , left : '1%'}} ><strong>Efficient Consolidation & Freight Services for the Best </strong></p>
          <p><strong>Secure Bonded Warehousing & Flexible Consignment Solutions  </strong></p>
          <p  style={{maxWidth : '26%'}}><strong>Seamless Customs & Duty Handling Stress-Free Import & Export</strong></p>
        </div>        
    </section>
    
    <section className="contact-cta-section">
          <p>For any inquiries about our services from Japan or locally in Namibia, feel free to contact us at <a className="cta-link" href="mailto:sales@artisbay.com">sales@artisbay.com</a>
          Our team is ready to assist you." </p>
    </section>
    </section>

    <div id="faq-list" className="faq-list">
      <button className="btn show-faq-btn" type="button" onClick={handleShowFaq}>{showFaq ? "Hide FAQ" : "Show faq"}</button>

      <h3>Frequently Asked Questions (FAQ)</h3>
        {showFaq && faqs.map((faq, index)=>(
          <div key={index}>
            <h4>{faq.question}</h4>
            {renderAnswer(faq.answer, faq.containsHtml)}          
          </div>
        ))}
    </div>
  
    {
      /*
        <div className="banner logistics-banner">
          <img
            src={`${process.env.PUBLIC_URL}/images/localServices/simplifylogisticsTitle.png`}
            className="banner"
            alt="Background"
          />
        <div id="agent"  className="logistics-container">
            <div className="section">
                <img alt="Star Voyage logo" src={`${process.env.PUBLIC_URL}/images/localServices/starvoyagerlogo2.png`} />
                <h5>
                Documents and paperwork:
                </h5>
                <p>
                StarVoyage Shippers Co.,Ltd
                </p>
                <p>
                Twiga House, 2nd floor, Office No.210,
                </p>
                <p>
                Samora Avenue, Dar es salaam, Tanzania.
                </p>
                <p>
                Tel: +255 752 650 650
                </p>
                <p>
                info@starvoyageshippers.com
                </p>
            </div>
            <div className="section">
                <img className='skybridge' alt="SkyBridge logo" src={`${process.env.PUBLIC_URL}/images/localServices/skybridgelogo.png`}/>
                <h5>
                Clearing and forwarding:
                </h5>
                <p>
                SkyBridge Logistics Co.Ltd
                </p>
                <p>
                Samora Tower, Samore Avenue,
                </p>
                <p>
                Dar Es Salaam
                </p>
                <p>
                Tel: +255 760 202 222
                </p>
                <p>
                sales@skybridgelg.com
                </p>
            </div>
        </div>
      </div>
      */
    }


    
    </div>
  );
};

export default TanzainaAgent;