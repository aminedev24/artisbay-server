import React from "react";
import "../../css/artisbayPromo.css"; // Corresponding CSS file for styling

const ArtisbayPromo = () => {
  return (
    <div class="ab-consulting max-w-4xl mx-auto p-6">
      <h1 class="text-3xl font-bold text-center text-yellow-600 mb-6">
        Consult with Artisbay
      </h1>
      <h2 class="text-xl font-bold mb-4">
        Join Artisbay and Expand Your Business Potential Globally
      </h2>
      <p class="mb-4">
        Artisbay specializes in providing tailored consulting services for
        businesses seeking growth and efficiency. Whether you’re navigating
        global trade, optimizing operations, or exploring new markets, our
        expertise ensures your success. With a diverse range of services, from
        renewable energy solutions to logistics advisory, we empower businesses
        to thrive in today’s competitive landscape.
      </p>
      <h3 class="text-lg font-bold mb-4">
        Here are a few inspiring testimonials from our valued clients:
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-14 mb-6">
        <div class="md:col-span-1">
          <p class="italic">
            "We are thrilled with the outcomes achieved through our
            collaboration with Artisbay Inc. Their strategic guidance and
            data-driven approach have transformed our business, resulting in
            significant revenue growth and improved operational efficiency."
          </p>
          <p class="mt-2 font-bold">
            - Niaz Q.
            <br />
            Dragzine LLC (Namibia)
          </p>
        </div>
        <div class="md:col-span-2 space-y-6">
          <div>
            <p class="italic">
              "Game-changers! Our business transformed with Artisbay Inc."
            </p>
            <p class="mt-2 font-bold">
              - Edouard T.
              <br />
              Ichinomiya Motors LLC (Japan)
            </p>
          </div>
          <div>
            <p class="italic">
              "Outstanding expertise! Artisbay Inc delivered beyond
              expectations."
            </p>
            <p class="mt-2 font-bold">
              - Hellen Salma
              <br />
              HBI International LLC (Japan)
            </p>
          </div>
        </div>
      </div>
      <hr class="divider" />
      <div className="section-container">
        <div className="section-text">
          <p>
            Artisbay empowers businesses to expand their reach and achieve
            operational excellence. From strategic planning to logistics
            optimization, renewable energy solutions, and one-on-one export
            training, we provide the expertise you need to thrive in competitive
            global markets. With our trusted guidance, you’ll unlock new
            opportunities, streamline your operations, and achieve measurable
            growth.
          </p>
        </div>
        <div className="section-image">
          <img
            alt="Two business professionals shaking hands in an office setting"
            src="/artisbay-server/images/consulting/handshake.png"
            width="300"
            height="200"
          />
        </div>
      </div>

      {/*  part 2 */}

      <div>
        <h1 className="heading-primary">
          Why Choose Artisbay for consultation?
        </h1>
        <div className="mb-8">
          <h2 className="heading-secondary">
            Strategic Expertise for Key Markets
          </h2>
          <div className="content-section">
            <div className="text-content">
              <h3 className="heading-tertiary">East and Southern Africa:</h3>
              <p>
                Unlock opportunities in key regions, leveraging strategic hubs
                like Dar es Salaam and Walvis Bay for cost-efficient access.
              </p>
            </div>
            <div className="image-content">
              <img
                src={`${process.env.PUBLIC_URL}/images/consulting/africa.png`}
                alt="Outline map of Africa"
              />
              <p>AFRICA</p>
            </div>
          </div>
          <div className="content-section">
            <div className="text-content">
              <h3 className="heading-tertiary">Europe, France:</h3>
              <p>
                Source high-quality products such as bulk clothes, wholesale EV
                charging stands for electric cars, brand-new tires, house
                terrace roof mounts, and other innovative solutions.
              </p>
            </div>
            <div className="image-content">
              <img
                src={`${process.env.PUBLIC_URL}/images/consulting/europeflag.png`}
                alt="Flag of the European Union"
              />

              {/*<img src="https://placehold.co/100x100" alt="Flag of the European Union" />*/}
              <p>EUROPE</p>
            </div>
          </div>
          <div className="content-section">
            <div className="text-content">
              <h3 className="heading-tertiary">Global Market Reach:</h3>
              <p>
                Expand internationally with actionable strategies tailored to
                your business goals. We are constantly searching for new markets
                and actively seeking strategic partners to expand our reach,
                ensuring continuous growth and unlocking new
                global opportunities.
              </p>
            </div>
            <div className="image-content">
              <img
                src={`${process.env.PUBLIC_URL}/images/consulting/globe.png`}
                alt="Globe showing global market reach"
              />
              <p>GLOBAL</p>
            </div>
          </div>
        </div>
        <div className="footer-section">
          <p>
            We extend our heartfelt gratitude to all our clients who have placed
            their trust in us. Your success is our motivation, and we are
            honored to be a part of your journey towards growth and
            transformation.
          </p>
          <div className="cta">
            <a href="#/contact" className="cta-link">
              {" "}
              <button>Contact us now</button>
            </a>
          </div>
        </div>
      </div>

      {/* part 3 */}

      <h1 class="text-3xl font-bold text-center text-yellow-600 mb-6">
        Flexible Consultation Options
      </h1>
      <div class="image-container">
        <img
          src={`${process.env.PUBLIC_URL}/images/consulting/discussion.png`}
          alt="A man and a woman having a discussion in a professional setting"
        />

        {/*<img src="https://placehold.co/800x400" alt="A man and a woman having a discussion in a professional setting" />*/}
      </div>
      <div class="text-lg">
        <h2 class='heading-secondary'>Introductory Campaign – Limited-Time Offer</h2>
        <p>Take advantage of our exclusive introductory campaign designed to support new and existing clients.</p>
        <p class="font-bold">For New Clients:</p>
        <ul class='list-disc list-inside'>
          <li><span class="font-bold">Complimentary Consultation:</span> Enjoy a free 2-hour session to explore business opportunities and discover how we can assist you.</li>
          <li><span class="font-bold">No Membership Fees: </span> Experience our services with no membership fees for the first two years.</li>
        </ul>
        <p class="font-bold mt-4">For Regular Clients:</p>
        <ul class='list-disc list-inside'>
          <li><span class="font-bold">Unlimited Free Consultations:</span> Stay ahead with ongoing business support and expert insights tailored to your needs.</li>
        </ul>
      </div>

      <div class="mt-6">
        <p class="font-bold text-lg">
          New! One-on-One Training for Car Exporting from Japan
        </p>
        <p>
         Master the art of exporting cars from Japan with personalized training sessions designed for all experience levels.
        </p>
        <ul class="list-disc list-inside mt-2">
          <li>
            <span class="font-bold">Comprehensive Learning:</span>  Gain in-depth knowledge of auction sourcing, dismantling,
             container vanning, and logistics.
          </li>
          <li>
            <span class="font-bold">Tailored Guidance:</span>Perfect for beginners and professionals looking to refine their expertise.
          </li>
          <li>
            <span class="font-bold">Exclusive Resources:</span> Access a curated database of auction houses, compliance guidelines, and shipping strategies.
          </li>
        </ul>
        <p>Start your journey today with expert guidance and hands-on learning!</p>
      </div>

      <h1 class="text-3xl font-bold text-center text-yellow-600 mb-6">
        Fields of Expertise
      </h1>

      <div class="expertise-content">
        <ol>
          <li>Strategic Trade Advisory</li>
          <p>Optimize supply chains and logistics for global trade.</p>
          <li>Renewable Energy Solutions</li>
          <p>
            Access quality-tested solar panels and renewable energy products.
          </p>
          <li>Consumer Goods Sourcing</li>
          <p>
            Source home appliances, clothes, and other high-demand goods in
            bulk.
          </p>
          <li>Specialized Products from France</li>
          <ul class='special-products-list'>
            <li>Wholesale EV charging stands</li>
            <li>Terrace roof mounts</li>
            <li>Factory-fresh tires</li>
            <li>High-quality bulk clothes</li>
            <li>Brand-new cars under factory warranty</li>
          </ul>
          <li>Automotive Trade Advisory</li>
          <p>
            Expand into lucrative automotive markets with consulting and
            sourcing for used and brand-new cars.
          </p>
          <li>One-on-One Car Export Training</li>
          <p>Gain in-depth knowledge about car exporting from Japan.</p>
        </ol>
      </div>
      <hr class="divider" />

      {/* part 4 */}

      <div>
        <div class="image-container">
          <img
            src={`${process.env.PUBLIC_URL}/images/consulting/abbridge.png`}
            alt="an image showcasing network graph"
          />

          {/*<img src="https://placehold.co/800x400" alt="A man and a woman having a discussion in a professional setting" />*/}
        </div>
        <div class="why-artisbay">
          <h3>Artisbay Inc. Bridging Japanese Businesses with Overseas Markets</h3>
          <p>
            Artisbay Inc. serves as a crucial link between Japanese businesses and international buyers, 
            streamlining exports and ensuring seamless transactions. With deep expertise in Japan’s 
            automotive and used parts industries, Artisbay Inc. connects local suppliers—ranging from 
            auction-sourced vehicle providers to dismantlers and tire wholesalers—with overseas businesses 
            seeking high-quality Japanese products. By handling sourcing, logistics, and compliance, 
            Artisbay Inc. simplifies access to Japan’s trusted market, making global trade more efficient and reliable
          </p>
        </div>
     
      </div>

      {/* part 5 */}
      <h3>Ready to Diversify Your Business?</h3>
      <p>
        Partner with Artisbay to access tailored consulting services and
        innovative solutions including:
      </p>
      <ul>
        <li>Solar panels</li>
        <li>Brand-new tires</li>
        <li>Brand-new cars</li>
        <li>Home appliances</li>
        <li>Terrace roof mounts</li>
        <li>EV charging stations</li>
      </ul>

      <p className="cta">
          <a href="#/contact" className="cta-link">
            {" "}
            <button>Contact us now</button>
          </a>
        to schedule your free consultation and discover how we can help your
        business grow!
      </p>
    </div>
  );
};

export default ArtisbayPromo;
