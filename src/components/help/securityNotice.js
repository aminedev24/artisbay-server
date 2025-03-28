import React from 'react';
import { Link } from 'react-router-dom';
const PaymentPolicy = () => {
  return (
    <div className='security-notice'>
      <h3>Security Notice for Payments</h3>
      <p><strong>Be careful, avoid being scammed!</strong> Confirm our correct bank account before you send your money!</p>
      <ul>
        <li>The beneficiary for all of our accounts is Artisbay Inc, and we only use the details listed<Link to='/help/ArtisbayInc/Bank-Information' className='cta-link'>HERE.</Link></li>
        <li>We do not use any payment services such as Western Union.</li>
        <li>Please be cautious of fake or fraudulent emails pretending to be from Artisbay Inc. Verify that the email address ends with @artisbay.com, as this is the only domain we use.</li>
      </ul>
      <h3>Payment Policy</h3>
      <ol>
        <li><strong>No Third-Party Transactions:</strong> Artisbay Inc. does not allow local partners, clients, or external parties to collect payments on our behalf. Additionally, staff are strictly prohibited from conducting any type of transactions, including TT transfers, on behalf of clients.</li>
        <li><strong>Responsibility Disclaimer:</strong> Any payment made, received, or transferred outside our authorized channels is at the sole discretion and responsibility of the individuals involved. Artisbay Inc. accepts no liability for any costs, losses, or disputes arising from such unauthorized activities.</li>
        <li><strong>Company Rights:</strong> In cases where this policy is violated, Artisbay Inc. reserves the right to cancel, terminate, modify, or suspend any ongoing transactions or deals with the concerned customer.</li>
      </ol>
      <p>For your security, always confirm details directly with us and use only our authorized payment channels. If you have any concerns, <Link className='cta-link' to='/contact'>contact us immediately.</Link></p>

    <div className="safety-container">
      <hr className="divider" />

      <h2 className="warning-icon">🚫 Don’t Be a Victim</h2>
      <p className="intro-text">Avoid the Two Biggest Risks in the Online Used Car Market</p>
      
      <hr className="divider" />

      <div className="notice-section">
        <h3 className="notice-section-title">⚠ 1. Scammers (Two Types)</h3>
        <div className="scammer-section">
          <div className="scammer-type">
            <h4 className="notice-section-sub-title">• Fake Exporters:</h4>
            <p>
              They pose as Japanese used car sellers and offer unbelievably low prices. Using Japan’s reputation for trust, they trick you into sending money—then disappear.
            </p>
          </div>
          <div className="scammer-type">
            <h4 className="notice-section-sub-title">• Money Scammers:</h4>
            <p>
              Some contact you through social media, offering to exchange your money or help you send funds to Japan.
              They may ask to trade currencies or use Bitcoin (BTC) or similar methods.
              Whether their service is fake or even real, you carry all the risk—including the risk of:
            </p>
            <ul>
              <li>Getting scammed</li>
              <li>Money being held or blocked</li>
              <li>No proof of payment or legal recourse</li>
            </ul>
            <p>
              Never send your money through unverified people or social media offers. Always use official, traceable methods.
            </p>
          </div>
        </div>
      </div>

      <hr className="divider" />

      <div className="notice-section">
        <h3 className="notice-section-title">⚠ 2. Dishonest Real Dealers</h3>
        <p>
          Some are real companies—but after you send your deposit, they start making up extra charges.
          They might blame things like:
        </p>
        <ul>
          <li>“Auction price changes”</li>
          <li>“Unexpected shipping fees”</li>
          <li>“Storage or documentation issues”</li>
        </ul>
        <p>
          Their goal is to pressure you into topping up more money just to avoid losing your first deposit.
        </p>
      </div>

      <hr className="divider" />

      <div className="notice-section">
        <h3 className="notice-section-title">✅ How to Stay Safe</h3>
        <ul>
          <li>Deal with a reputable, well-established company.</li>
          <li>Ask for a referral from someone who has already imported a car.</li>
          <li>Avoid anything that feels too good to be true—it usually is.</li>
          <li>Never trust social media for financial transactions related to your car purchase.</li>
        </ul>
      </div>

      <hr className="divider" />

      <div className="closing-message">
        <p>Your hard-earned money deserves protection.</p>
        <p>Be informed. Be cautious. Import with confidence.</p>
      </div>
      
      <hr className="divider" />
    </div>
    </div>
  );
};

export default PaymentPolicy;
