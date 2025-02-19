import React from "react";
import "../css/namibiaAgent.css"

const NamibiaAgent = () => {

  const faqs = [
    {
      question: "What local services are available in Namibia?",
      answer: "Our local partners provide container clearance, customs handling, bonded warehouse storage, and local delivery services to ensure a smooth process for your shipments."
    },
    {
      question: "Can you assist with clearing my container at the port?",
      answer: "Yes, customs and duty services are handled by our local partners, ensuring smooth clearance and avoiding unnecessary delays."
    },
    {
      question: "Do you provide bonded warehouse storage?",
      answer: "Yes, our local partners offer bonded warehouse storage, allowing you to store goods securely while deferring duty payments until they are ready for sale or delivery."
    },
    {
      question: "Can you deliver my goods after customs clearance?",
      answer: "Yes, local delivery services are available to transport your goods from the port or warehouse to your preferred location."
    },
    {
      question: "How can I track my shipment?",
      answer: "We provide shipment tracking, keeping you updated on your container’s status. Once it arrives, clearance and delivery are handled by the clearing agent."
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
      answer: "Simply contact us, and we will connect you with our trusted local partners who specialize in customs clearance, bonded storage, and local delivery."
    },
    {
      question: "What is the import permit?",
      answer: "An import permit is an official authorization required by Namibian customs to allow vehicles to be imported. It ensures compliance with local import regulations and is necessary for customs clearance."
    },
    {
      question: "Is the import permit required per car, or does one permit cover multiple vehicles?",
      answer: "Each imported car requires a separate import permit. One permit cannot be used for multiple vehicles."
    },
    {
      question: "Can you help me get the import permit?",
      answer: "Yes, our local partners can assist with the import permit process, guiding you through the necessary steps and documentation required for approval."
    },
    {
      question: "What are the year restrictions for cars imported into Namibia?",
      answer: "Currently, used cars must not be older than 12 years at the time of import. However, buses and trucks do not have age restrictions."
    }
  ];

  const [showFaq, setShowFaq ] = useState(false);

  const handleShowFaq = () => {
    setShowFaq(!showFaq);
  }

  const scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="namibia-agent-container">
      <div class="banner">
        <img className="banner-image" alt="Header image with containers and trucks" src={`${process.env.PUBLIC_URL}/images/localServices/namibiaBanner.png`}/>
      </div>
      <h1 class="main-title">
        Streamlined Logistics, Trusted Expertise
      </h1>
      <section className="intro-container">
        <div class="intro-content">
          <p>
          At Artisbay Inc., we understand that importing vehicles, tires, or parts into Namibia requires efficient and reliable clearing services. That’s why we’ve partnered with <strong>IT Import and Export CC</strong>, a trusted clearing agent with over 10 years of experience, to offer you hassle-free logistics solutions in Walvis Bay.
          </p>
          <img alt="Image of a ship and containers" src={`${process.env.PUBLIC_URL}/images/localServices/smallBanner.png`} />
        </div>
      </section>
      
      <div class="nav">

        <a onClick={() => scrollToSection('contact-section')}>
        <img className="nav-icon" src={`${process.env.PUBLIC_URL}/images/localServices/agenticon.png`} alt='services icon'/>

        </a>

        <a onClick={() => scrollToSection('services')}>
          <img className="nav-icon" src={`${process.env.PUBLIC_URL}/images/localServices/servicesicon.png`} alt='services icon'/>
        </a>
        <a onClick={() => scrollToSection('packages')}>
        <img className="nav-icon" src={`${process.env.PUBLIC_URL}/images/localServices/stockicon.png`} alt='services icon'/>

        </a>
        <a href='#/help?topic=auction'>
          <img className="nav-icon" src={`${process.env.PUBLIC_URL}/images/localServices/auctionicon.png`} alt='services icon'/>

        </a>
        <a onClick={() => scrollToSection('faq-list')}>
          <img className="nav-icon" src={`${process.env.PUBLIC_URL}/images/localServices/faqicon.png`} alt='services icon'/>

        </a>
      
      </div>
      {/*
        <div  class="banner why-choose-agent-section">
          <img className="banner-image" alt="namibia-agent-banner" src={`${process.env.PUBLIC_URL}/images/localServices/whynamibiaagent2.png`}/>
        </div>
      */}
      
      <section className="agent-section">
        <div className="background namibia-agent">
              <div className="services-text">
                  <span><strong>RELIABLE CLEARING AND IMPORT SERVICES IN WALVIS BAY<br /></strong></span>
                  <span><strong>Nationwide Delivery<br /></strong></span>
                  <span>Efficient delivery to major cities<br /> </span>
                  <span>including Swakopmund, Windhoek, and beyond.<br /></span>
                  <span><strong>Border deliveries</strong> <br/></span>
                  <span>to Botswana, Angola, and Zambia</span>
              </div>
        </div>

      </section>
      
      
      <section id="services" className="section-container">
        <h1 class="section-title">
          Container shipment services
        </h1>
        <div class="services">
          <h3>
          1. Consolidation Service
          </h3>
          <p>
          Our Consolidation Service allows vehicles from multiple customers to be combined into a single shared container, ensuring cost-efficient shipping and streamlined handling. This service is made possible through our collaboration with our trusted partner, IT Import and Export CC.
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
          • Efficient delivery to major cities, including Swakopmund, Windhoek, and beyond.
          <br/>
          • Border deliveries to Botswana, Angola, and Zambia.
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
    
              <img 
                alt="Decorative chevrons" 
                src={`${process.env.PUBLIC_URL}/images/localServices/arrowscopy.png`} 
              />
       
          </div>
          <div className="list">
            <div className="list-item">
              <strong>Reliable Clearing Agent:</strong> With over a decade of experience, IT Import and Export CC ensures smooth customs clearance and dependable service.
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

      <section id="contact-section" className="contact-section-container">
        <div class="contact">
          <div className='contact-text'>
          <h2>
            We are your Partner for Stress-Free Imports
          </h2>
          <p>
            With<strong> Artisbay Inc.</strong> <strong>and IT Import and Export CC</strong>
            , you can rest assured that your goods are in safe hands. We take care of the paperwork, customs processes, and transportation so you can focus on your business.
            <strong>
            Get started today!
            </strong>
          </p>
         
          </div>
          <img alt="Image of a handshake and a ship with containers"  src={`${process.env.PUBLIC_URL}/images/localServices/partner.png`}/>
        </div>
      </section>
      
      {/* 
        <div className="banner logistics-banner">
          <img
            src={`${process.env.PUBLIC_URL}/images/localServices/simplifylogistics2.png`}
            className="banner"
            alt="Background"
          />
      
      </div>
      */}
    <section className="contact-section-wrapper">
    <section className="contact-section-container">
        <img alt="Image of a handshake and a ship with containers"  src={`${process.env.PUBLIC_URL}/images/contactusblank.png`}/>
        <div className="contact-text-container">
          <p style={{maxWidth : '26%', position :'relative' , left : '1%'}}><strong>Efficient Consolidation & Freight Services for the Best </strong></p>
          <p><strong>Secure Bonded Warehousing & Flexible Consignment Solutions  </strong></p>
          <p  style={{maxWidth : '26%'}}><strong>Seamless Customs & Duty Handling Stress-Free Import & Export</strong></p>
        </div>        
    </section>
    
    <section className="contact-cta-section">
          <p>For any inquiries about our services from Japan or locally in Namibia, feel free to contact us at <a className="cta-link" href="mailto:sales@artisbay.com">sales@artisbay.com</a>
          Our team is ready to assist you. </p>
    </section>
    </section>
    <div id="faq-list" className="faq-list">
      <button className="btn show-faq-btn" type="button" onClick={handleShowFaq}>{showFaq ? "Hide FAQ" : "Show faq"}</button>

      <h1>Frequently Asked Questions (FAQ)</h1>
      {showFaq && faqs.map((faq, index) => (
        <div key={index}>
          <h4>{faq.question}</h4>
          <p>{faq.answer}</p>
        </div>
      ))}
    </div>
    
    
      {
      /*
      <div id="agent" className="logistics background">
           
            <div className="logistics-agent-info">
               Contact Us: <a href="mailto:contact@artisbay.com">contact@artisbay.com</a><br />

                Or Contact our agent:<br />
                IT IMPORT AND EXPORT CC<br />
                CEO: Isak Titus<br />
                Phone/WhatsApp: 264 812 294 597<br />
                Address: CORNER OFFICE, SAM NUYOMA STREET, OPPOSITE KFC, WALVIS BAY, NAMIBIA
            </div>
      </div>
      */

      }


    </div>
  );
};

export default NamibiaAgent;