import React, { useState } from "react";
import "../../css/artisbayPromo.css"; // Corresponding CSS file for styling
import { Link , useLocation} from "react-router-dom";

const translations = {
  en: {
    title: "Consult with Artisbay",
    tagline: "Join Artisbay to expand your business possibilities worldwide",
    intro:
      "Artisbay provides tailor-made consulting services for companies aiming for growth and efficiency. Our expertise in navigating global trade, optimizing operations, and exploring new markets supports your success. From renewable energy solutions to logistics consulting, we help you grow in competitive markets.",
    testimonials: [
      {
        text:
          "I was amazed by the results achieved through our collaboration with Artisbay Inc. Their strategic guidance and data-driven approach transformed our business, leading to significant revenue growth and improved efficiency.",
        author: "Niaz Q.",
        company: "Dragzine Motors CC (Namibia)"
      },
      {
        text: "A true game changer! Our business was transformed with Artisbay Inc.",
        author: "Edouard T.",
        company: "Ichinomiya Motors LLC (Japan)"
      },
      {
        text:
          "Outstanding expertise! Artisbay Inc. delivered results that exceeded our expectations.",
        author: "Hellen Salma",
        company: "HBI International LLC (Japan)"
      }
    ],
    consultingSupport:
      "Artisbay supports companies in expanding their markets and achieving operational excellence. From strategic planning to logistics optimization, renewable energy solutions, and one-on-one export training, we provide the expertise needed for success in the competitive global market. With reliable guidance, explore new opportunities, streamline operations, and achieve steady growth.",
    whyChooseUs: "Why Choose Artisbay Consulting?",
    strategicExpertise: "Key Strategic Expertise in Major Markets",
    markets: {
      eastAfrica: {
        title: "East & Southern Africa",
        description:
          "Leverage strategic hubs such as Dar es Salaam and Walvis Bay for cost-effective access to major business opportunities."
      },
      europe: {
        title: "Europe & France",
        description:
          "Procure high-quality products including bulk clothing, wholesale EV charging stations, new tires, and roof-mounted terrace installations."
      },
      global: {
        title: "Global Market Expansion",
        description:
          "Expand into international markets with practical strategies tailored to your business goals. Continuously explore new markets and proactively develop strategic partnerships for sustained growth and new global opportunities."
      }
    },
    gratitude:
      "We sincerely thank all our clients for their trust. Your success is our driving force, and we are honored to join you on your journey of growth and transformation.",
    contact: "CONTACT US NOW",
    flexibleOptions:
      "Flexible Consulting Options: Introductory Campaign – Limited Time Offer",
    newClients: {
      heading: "For New Clients:",
      freeConsulting:
        "Free Consulting: Enjoy a free 2-hour session to explore business opportunities and experience our support.",
      noMembershipFee:
        "No Membership Fee: Enjoy our services free of charge for the first 2 years."
    },
    existingClients: {
      heading: "For Existing Clients:",
      unlimitedConsulting:
        "Unlimited free consulting: Receive ongoing business support and expert advice tailored to your needs."
    },
    usedCarTraining: {
      title: "New! One-on-One Training on Exporting Used Cars from Japan",
      description:
        "Personalized training designed for all experience levels to master exporting used cars from Japan.",
      bulletPoints: [
        "Comprehensive Learning: Gain in-depth knowledge on auction procurement, dismantling, container bundling, and logistics.",
        "Personalized Guidance: Receive tailored expert advice, whether you're a beginner or experienced.",
        "Exclusive Resources: Access auction house databases, regulatory guidelines, and transportation strategies."
      ],
      callToAction:
        "Start your export business now with expert guidance and practical training!"
    },
    specialties: {
      title: "Specialties",
      items: [
        "Strategic Trade Advisory: Support for optimizing supply chains and logistics for global trade.",
        "Renewable Energy Solutions: Providing quality-checked solar panels and renewable energy products.",
        "Procurement of Consumer Goods: Bulk procurement of electronics, clothing, and other high-demand products.",
        "Specialized Products from France: EV Charging Stations (Wholesale), Terrace Roof Mounts, Factory-Direct New Tires, Bulk procurement of high-quality apparel, New vehicles with manufacturer warranty.",
        "Automotive Trade Advisory: Consulting for procuring used and new vehicles and assisting market entry in promising automotive sectors.",
        "One-on-One Used Car Export Training: Personalized training to deepen your expertise in exporting used cars from Japan."
      ]
    },
    bridge: {
      title:
        "Artisbay Inc. – A Bridge Connecting Japanese Companies with Global Markets",
      description:
        "Artisbay Inc. connects Japanese companies with international buyers, streamlining the export process and facilitating smooth transactions. Leveraging extensive expertise in Japan’s automotive and used parts industry, we link Japanese suppliers—such as auction vehicle providers, dismantlers, and tire wholesalers—with overseas businesses seeking high-quality Japanese products. We offer comprehensive support in procurement, logistics, and regulatory compliance to simplify access to the Japanese market and enhance the efficiency and reliability of global trade."
    },
    diversification: {
      title: "Thinking about diversifying your business?",
      description:
        "Partner with Artisbay to access customized consulting services and innovative solutions.",
      items: [
        "Solar Panels",
        "New Tires",
        "New Vehicles",
        "Used Cars",
        "Electronics",
        "Terrace Roof Mounts",
        "EV Charging Stations",
        "Machinery",
        "Agricultural Machinery"
      ]
    },
    finalCall:
      "Contact us now! Schedule your free consultation and discover your business's growth potential!"
  },
  jp: {
    title: "Artisbay に相談する",
    tagline: "Artisbay に参加して、ビジネスの可能性を世界へ広げましょう",
    intro:
      "Artisbay は、成長と効率化を目指す企業のために、オーダーメイドのコンサルティングサービスを提供しています。グローバル貿易のナビゲーション、業務の最適化、新市場の開拓など、私たちの専門知識があなたの成功を支えます。再生可能エネルギーソリューションから物流コンサルティングまで、多様なサービスで、競争の激しい市場での成長をサポートします。",
    testimonials: [
      {
        text:
          "Artisbay Inc. との協業によって得られた成果に感動しています。彼らの戦略的なガイダンスとデータ駆動型のアプローチは、私たちのビジネスを変革し、大幅な収益成長と業務効率の向上を実現しました。",
        author: "Niaz Q.",
        company: "Dragzine Motors CC (ナミビア)"
      },
      {
        text: "まさにゲームチェンジャー！Artisbay Inc. でビジネスが一変しました。",
        author: "Edouard T.",
        company: "Ichinomiya Motors LLC (日本)"
      },
      {
        text:
          "卓越した専門知識！Artisbay Inc. は期待を超える成果を届けてくれました。",
        author: "Hellen Salma",
        company: "HBI International LLC (日本)"
      }
    ],
    consultingSupport:
      "Artisbay は、企業が市場を拡大し、業務の卓越性を実現するための支援を行います。戦略的計画から物流最適化、再生可能エネルギーソリューション、マンツーマンの輸出トレーニングまで、競争の激しいグローバル市場で成功するための専門知識を提供します。信頼できるガイダンスのもと、新たな機会を開拓し、業務を効率化し、確かな成長を実現しましょう。",
    whyChooseUs: "なぜ Artisbay のコンサルティングを選ぶのか？",
    strategicExpertise: "主要市場における戦略的専門知識",
    markets: {
      eastAfrica: {
        title: "東アフリカ・南部アフリカ",
        description:
          "ダルエスサラームやウォルビスベイなどの戦略的ハブを活用し、コスト効率の高いアクセスで主要地域のビジネスチャンスを開拓しましょう。"
      },
      europe: {
        title: "ヨーロッパ・フランス",
        description:
          "衣類の大量仕入れ、電気自動車用充電スタンドの卸売、新品タイヤ、住宅テラスの屋根マウントなど、高品質な製品を調達できます。"
      },
      global: {
        title: "グローバル市場展開",
        description:
          "ビジネス目標に合わせた実践的な戦略で、国際市場へ拡大。新たな市場を常に探求し、戦略的パートナーを積極的に開拓することで、継続的な成長と新たなグローバル機会の創出を実現します。"
      }
    },
    gratitude:
      "私たちを信頼してくださったすべてのお客様に、深く感謝いたします。皆様の成功が私たちの原動力であり、成長と変革の旅にご一緒できることを光栄に思います。",
    contact: "今すぐお問い合わせください",
    flexibleOptions:
      "柔軟なコンサルティングオプション イントロダクトリーキャンペーン – 期間限定オファー",
    newClients: {
      heading: "新規クライアント向け:",
      freeConsulting:
        "無料コンサルティング: ビジネス機会を探り、私たちのサポートを体験できる2時間の無料セッションをご提供。",
      noMembershipFee:
        "会員費無料: 初めの2年間は会員費無料でサービスをお試しいただけます。"
    },
    existingClients: {
      heading: "既存クライアント向け:",
      unlimitedConsulting:
        "無制限の無料コンサルティング: 継続的なビジネスサポートと、ニーズに合わせた専門的なアドバイスを提供。"
    },
    usedCarTraining: {
      title: "新登場！日本からの中古車輸出に関するマンツーマントレーニング",
      description:
        "あらゆる経験レベルの方に向けた日本からの中古車輸出をマスターする個別指導を実施。",
      bulletPoints: [
        "総合的な学習: オークションでの仕入れ、解体、コンテナバニング（梱包）、物流について深く学べます。",
        "個別指導: 初心者から経験者まで、ニーズに合わせた専門的なアドバイスをご提供。",
        "限定リソース: オークションハウスのデータベース、法規制ガイドライン、輸送戦略など、特別な情報にアクセス可能。"
      ],
      callToAction:
        "専門的な指導と実践的な学習で、今すぐあなたの輸出ビジネスをスタートしましょう！"
    },
    specialties: {
      title: "専門分野",
      items: [
        "戦略的貿易アドバイザリー: グローバル貿易のためのサプライチェーンと物流の最適化を支援。",
        "再生可能エネルギーソリューション: 品質検査済みのソーラーパネルや再生可能エネルギー製品を提供。",
        "消費財の調達: 家電、衣類、その他の需要の高い商品を大量調達可能。",
        "フランスからの特化商品: EV充電スタンド（卸売）、テラス屋根マウント、工場出荷の新品タイヤ、高品質な衣類の大量仕入れ、メーカー保証付きの新車。",
        "自動車貿易アドバイザリー: 中古車・新車の調達と市場参入のコンサルティングを提供し、有望な自動車市場への進出を支援。",
        "マンツーマン中古車輸出トレーニング: 日本からの中古車輸出に関する専門知識を深める個別指導を実施。"
      ]
    },
    bridge: {
      title: "Artisbay Inc. – 日本企業と海外市場をつなぐ架け橋",
      description:
        "Artisbay Inc. は、日本企業と海外バイヤーを結びつけ、輸出プロセスをスムーズにし、取引の円滑化を支援します。日本の自動車・中古部品業界における豊富な専門知識を活かし、オークション車両の提供者、解体業者、タイヤ卸売業者などの日本のサプライヤーを、高品質な日本製品を求める海外ビジネスとつなげます。仕入れ、物流、法規制対応を一括でサポートし、日本市場へのアクセスを簡素化。グローバル貿易をより効率的かつ信頼性の高いものにします。"
    },
    diversification: {
      title: "ビジネスの多角化をお考えですか？",
      description:
        "Artisbay と提携し、カスタマイズされたコンサルティングサービスと革新的なソリューションにアクセスしましょう。",
      items: [
        "ソーラーパネル",
        "新品タイヤ",
        "新車",
        "中古車",
        "家電製品",
        "テラス屋根マウント",
        "EV充電ステーション",
        "機械",
        "農業機械"
      ]
    },
    finalCall:
      "今すぐお問い合わせください！無料コンサルティングを予約し、ビジネス成長の可能性を発見しましょう！"
  }
};


const ArtisbayPromo = () => {


  const [language, setLanguage] = useState("en");
  const t = translations[language];

  const location = useLocation();

  return (
    <div class="ab-consulting max-w-4xl mx-auto p-6">
      <h1 class="text-3xl font-bold text-center text-yellow-600 mb-6">
        {t.title}
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
            Dragzine Motors CC (Namibia)
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
          <Link to="/contact?from=consulting" className="cta-link">
            <button>Contact us now</button>
          </Link>


            
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
        <Link to="/contact?from=consulting"  className="cta-link">
            <button>Contact us now</button>
        </Link>
        to schedule your free consultation and discover how we can help your
        business grow!
      </p>
    </div>
  );
};

export default ArtisbayPromo;
