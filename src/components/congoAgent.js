import React, {useState} from "react";
import "../css/congoAgent.css"; // Import the CSS file
import ImageWithLoader from "./imageWithLoader";
const CongoAgent = () => {


const faqs = [
  {
    question: 'Puis-je acheter une seule voiture et dois-je payer pour un conteneur complet ?',
    answer: 'Oui, vous pouvez acheter une seule voiture sans payer un conteneur entier, car nous offrons un service de consolidation. Cela signifie que votre véhicule sera chargé avec d’autres voitures dans un conteneur, ce qui réduit les frais d’expédition.'
  },
  {
    question: 'Ai-je besoin d’un permis d’importation pour importer une voiture en RDC ?',
    answer: 'Non, un permis d’importation n’est pas requis pour importer des voitures d’occasion en RDC.'
  },
  {
    question: 'Quelle est la limite d’âge pour les véhicules importés ?',
    answer: 'Les véhicules importés peuvent avoir jusqu’à 20 ans.'
  },
  {
    question: 'Quels sont les documents nécessaires pour l’importation ?',
    answer: 'Pour importer une voiture en RDC, les documents suivants sont généralement requis : Connaissement maritime (Bill of Lading - BL), Facture commerciale, Certificat d’exportation (annulation d’immatriculation du pays d’origine).'
  },
  {
    question: 'Combien de temps faut-il pour recevoir mon véhicule ?',
    answer: 'Le délai de livraison dépend du calendrier des navires et des itinéraires empruntés. En général, le temps de transit maritime entre le Japon et la RDC est de 50 à 60 jours.'
  },
  {
    question: 'Quels sont les droits de douane et taxes applicables ?',
    answer: 'Les droits et taxes d’importation varient en fonction du type de véhicule, de la cylindrée du moteur et de la valeur en douane. Nous recommandons de consulter un agent de dédouanement local pour obtenir une estimation précise des coûts.'
  },
  {
    question: 'Peut-on importer des véhicules avec conduite à droite (volant à droite) ?',
    answer: 'Oui, l’importation de véhicules avec volant à droite est autorisée en RDC.'
  },
  {
    question: 'Proposez-vous des inspections avant l’expédition ?',
    answer: 'Oui, nous inspectons tous les véhicules avant expédition. Nous fournissons des photos détaillées, mais nous ne proposons pas de vidéos.'
  },
  {
    question: 'Offrez-vous des services de transport en conteneur et de consolidation ?',
    answer: 'Oui, nous proposons des expéditions en conteneur et des services de consolidation pour optimiser l’espace et réduire les coûts de transport.'
  },
  {
    question: 'Quels sont les modes de paiement disponibles ?',
    answer: 'Nous acceptons les paiements via virement bancaire international (T/T) et PayPal. Le paiement doit être effectué en totalité avant l’expédition.'
  },
  {
    question: 'Comment puis-je suivre mon expédition ?',
    answer: 'Nous fournissons un suivi d’expédition, mais nous ne garantissons pas l’obtention d’une copie du Bill of Lading (BL).'
  },
  {
    question: 'Pouvez-vous aider avec le dédouanement et l’immatriculation locale ?',
    answer: 'Nous ne nous occupons pas directement du dédouanement, mais nous avons un agent de dédouanement de confiance qui peut vous assister.'
  }
]

    const [showFaq, setShowFaq ] = useState(false);
  
    const handleShowFaq = () => {
      setShowFaq(!showFaq);
    }

  return (
    <div className="congo-agent-container">
      
      {/* Banner Section */}
      <div className="banner">
      <ImageWithLoader
          src={`${process.env.PUBLIC_URL}/images/localServices/congoBanner.png`}
          className="banner-image"
          alt="Congo Agent Banner"
        />
        {/*
        <img
          src={`${process.env.PUBLIC_URL}/images/localServices/congoBanner.png`}
          alt="Congo Agent Banner"
          className="banner-image"
        />
        */}
      </div>

      <h1 class="main-title">
       Une Relation de Confiance Établie
      </h1>

   

      <section className="intro-container">
        
        <div class="intro-content">
          <p>
          Depuis plus de 7 ans, nous avons bâti un partenariat fondé sur la confiance mutuelle et une expertise reconnue, offrant à nos clients de Kinshasa et ses environs un service fiable et de haute qualité. Grâce à notre engagement envers l’excellence, nous garantissons des prestations adaptées aux besoins spécifiques de chaque client, avec un souci constant de professionnalisme et d’efficacité.          </p>
          <ImageWithLoader
              src={`${process.env.PUBLIC_URL}/images/localServices/smallbanner2.png`}
              alt="Image of a ship and containers"
        />
        </div>
      </section>

              
      <section className="agent-section">
        <div className="background congo-agent">
              <div className="services-text">
                  <span><strong>SERVICES FIABLES DE DÉDOUANEMENT ET
                                D'IMPORTATION AU PORT DE MATADI<br /></strong></span>
                  <div className="sub-text">                  <span>Dégagement de conteneur<br /></span>
                    <span>Dédouanement Immatriculation<br /> </span>
                    <span>et même une consultation gratuite<br /></span>
                    <span>avec un expert dans l'importation <br/></span>
                    <span>de véhicule et les pièces de rechange</span>
                  </div>

              </div>
        </div>

      </section>

      {/* Services Section */}

      <section id="services" className="section-container">
        <h1 class="section-title">
          Services d'expédition de conteneurs        
        </h1>
        <div class="services">
          <h3>
          1. Livraison Fiable et Sécurisée
          </h3>
          <p>
            Nous assurons une livraison rapide et sécurisée de vos véhicules à Kinshasa et dans ses 
            environs. Grâce à notre expertise logistique, vos commandes arrivent toujours dans les 
            délais convenus et en parfait état.
          </p> 
          <h3>
          2. Dégagement de Conteneurs à Tarifs Compétitifs
          </h3>
          <p>
          • Bénéficiez des tarifs les plus compétitifs du marché pour le dégagement de vo
          conteneurs, tout en profitant d’un service de qualité et d’une efficacité optimale.

          </p>
          <h3>
            3. Dédouanement Efficace et Abordabble

          </h3>
          <p>
          • Nous proposons un service de dédouanement rapide et conforme aux réglementations 
          locales, au meilleur prix du marché.
          </p>
          <h3>
          4. Partage de Conteneur pour Réduire Vos Coûts
          </h3>
          <p>
          • Optimisez vos dépenses grâce à notre service de partage de conteneurs, parfaitement 
            adapté aux petites commandes, tout en assurant une gestion Efficace          
          </p>
          <h3>
          5. Assistance Personnalisée à Chaque Étape
          </h3>
          <p>
          • De l’importation à la livraison, notre équipe vous accompagne avec des solutions sur 
          mesure pour simplifier vos opérations logistiques et garantir une expérience sans souci.        
          </p>
        </div>
      </section>
     {
     /* 
              <div className="services">
            <div className="service">
                <i className="fas fa-shield-alt"></i>
                <div>
                    <h2>Livraison Fiable et Sécurisée</h2>
                    <p>Nous assurons une livraison rapide et sécurisée de vos véhicules à Kinshasa et dans ses 
                      environs. Grâce à notre expertise logistique, vos commandes arrivent toujours dans les 
                      délais convenus et en parfait état.
                    </p>
                </div>
            </div>
            <div className="service">
                <i className="fas fa-chart-line"></i>
                <div>
                    <h2>Dédouanement Efficace et Abordable</h2>
                    <p>Nous proposons un service de dédouanement rapide et conforme aux réglementations locales, au meilleur prix du marché.</p>
                </div>
            </div>
            <div className="service">
                <i className="fas fa-box"></i>
                <div>
                    <h2>Partage de Conteneur pour Réduire Vos Coûts</h2>
                    <p>Optimisez vos dépenses grâce à notre service de partage de conteneurs, parfaitement adapté aux petites commandes, tout en assurant une gestion efficace.</p>
                </div>
            </div>
            <div className="service">
                <i className="fas fa-truck-loading"></i>
                <div>
                    <h2>Dégagement de Conteneurs à Tarifs Compétitifs</h2>
                    <p>Bénéficiez des tarifs les plus compétitifs du marché pour le dégagement de vos conteneurs, tout en profitant d’un service de qualité et d’une efficacité optimale.</p>
                </div>
            </div>
            <div className="service">
                <i className="fas fa-headset"></i>
                <div>
                    <h2>Assistance Personnalisée à Chaque Étape</h2>
                    <p>De l’importation à la livraison, notre équipe vous accompagne avec des solutions sur mesure pour simplifier vos opérations logistiques et garantir une expérience sans souci.</p>
                </div>
            </div>
        </div>
     */}


      {/* Automated Invoice System Section */}

      <div className="invoice-section">
        <h1>Générez Vos Factures en Toute Simplicité</h1>
        <div className="invoice-section-content">
          <p>
           <strong> Simplifiez vos transactions grâce à notre système automatisé de facturation :</strong>
          </p>
          <ul>
            <li>Rapide et Facile : Créez, modifiez et téléchargez vos factures en quelques clics.</li>
            <li>Multi-Devises : Générez des factures dans la devise de votre choix pour faciliter vos paiements internationaux.</li>
            <li>Descriptions Claires pour les Banques : Ajustez les descriptions pour répondre aux exigences bancaires, garantissant un traitement fluide de vos paiements.</li>
          </ul>
          <a href="#invoice-generator" className="invoice-link">
            Accédez au Générateur de Factures Automatisées
          </a>
        </div>
        
      </div>

    <section className="contact-section-wrapper">
    <section className="contact-section-container">
        <ImageWithLoader
              src={`${process.env.PUBLIC_URL}/images/contactusblank.png`}              className="banner-image"
              alt="Image of a handshake and a ship with containers" 
        />
        <div className="contact-text-container">
          <p><strong>Services de consolidation et de fret efficaces pour une valeur optimale</strong></p>
          <p><strong>Entrepôt sous douane sécurisé et solutions de consignation flexibles</strong></p>
          <p style={{maxWidth : '26%'}}><strong>Gestion fluide des douanes et des droits – Importation et exportation sans stress</strong></p>
        </div>        
    </section>
    
    <section className="contact-cta-section">
          <p>Pour toute question sur nos services depuis le Japon ou localement en Namibie, n’hésitez pas à nous contacter à <a className="cta-link" href="mailto:sales@artisbay.com">sales@artisbay.com</a>
            Notre équipe est à votre disposition.
           </p>
    </section>
    </section>

    <div id="faq-list" className="faq-list">
    <button className="btn show-faq-btn" type="button" onClick={handleShowFaq}>{showFaq ? "Hide FAQ" : "Show faq"}</button>

      <h1>FAQ – Foire aux Questions</h1>
      {showFaq && faqs.map((faq, index) => (
        <div key={index}>
          <h4>{faq.question}</h4>
          <p>{faq.answer}</p>
        </div>
      ))}
    </div>
    {
      /*
      <section className="contact-section-container">
        <div class="contact">
          <div className='contact-text'>
          <h2>
            Contactez Notre Partenaire Local
          </h2>
          <p>
            Pour plus de détails sur nos services de partage de conteneur, contactez notre partenaire <strong>Agence R.T.A</strong> au port de Matadi.<br/>
            Mr Pascal Masamba<br/>
            WhatsApp: +243 891 655 033
          </p>
          </div>
          <img alt="Image of a handshake and a ship with containers"  src={`${process.env.PUBLIC_URL}/images/localServices/partner.png`}/>
        </div>
      </section>
      */
    }


    </div>
  );
};

export default CongoAgent;