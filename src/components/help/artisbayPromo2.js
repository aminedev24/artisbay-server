import React, { useState } from "react";
import "../../css/artisbayPromo.css";
import { Link, useLocation } from "react-router-dom";

const translations = {
  en: {
    title: "Consult with Artisbay",
    subtitle: "Join Artisbay and Expand Your Business Potential Globally",
    intro:
      "Artisbay specializes in providing tailored consulting services for businesses seeking growth and efficiency. Whether you’re navigating global trade, optimizing operations, or exploring new markets, our expertise ensures your success. With a diverse range of services, from renewable energy solutions to logistics advisory, we empower businesses to thrive in today’s competitive landscape.",
    testimonialsIntro:
      "Here are a few inspiring testimonials from our valued clients:",
    testimonials: [
      {
        text:
          "We are thrilled with the outcomes achieved through our collaboration with Artisbay Inc. Their strategic guidance and data-driven approach have transformed our business, resulting in significant revenue growth and improved operational efficiency.",
        author: "- Niaz Q.",
        company: "Dragzine Motors CC (Namibia)",
      },
      {
        text: "Game-changers! Our business transformed with Artisbay Inc.",
        author: "- Edouard T.",
        company: "Ichinomiya Motors LLC (Japan)",
      },
      {
        text:
          "Outstanding expertise! Artisbay Inc delivered beyond expectations.",
        author: "- Hellen Salma",
        company: "HBI International LLC (Japan)",
      },
    ],
    consultingSupport:
      "Artisbay empowers businesses to expand their reach and achieve operational excellence. From strategic planning to logistics optimization, renewable energy solutions, and one-on-one export training, we provide the expertise you need to thrive in competitive global markets. With our trusted guidance, you’ll unlock new opportunities, streamline your operations, and achieve measurable growth.",
    sectionImageAlt:
      "Two business professionals shaking hands in an office setting",
    whyChooseTitle: "Why Choose Artisbay for consultation?",
    strategicExpertise: "Strategic Expertise for Key Markets",
    market1: {
      title: "East and Southern Africa:",
      description:
        "Unlock opportunities in key regions, leveraging strategic hubs like Dar es Salaam and Walvis Bay for cost-efficient access.",
      imageAlt: "Outline map of Africa",
      imageLabel: "AFRICA",
    },
    market2: {
      title: "Europe, France:",
      description:
        "Source high-quality products such as bulk clothes, wholesale EV charging stands for electric cars, brand-new tires, house terrace roof mounts, and other innovative solutions.",
      imageAlt: "Flag of the European Union",
      imageLabel: "EUROPE",
    },
    market3: {
      title: "Global Market Reach:",
      description:
        "Expand internationally with actionable strategies tailored to your business goals. We are constantly searching for new markets and actively seeking strategic partners to expand our reach, ensuring continuous growth and unlocking new global opportunities.",
      imageAlt: "Globe showing global market reach",
      imageLabel: "GLOBAL",
    },
    footerText:
      "We extend our heartfelt gratitude to all our clients who have placed their trust in us. Your success is our motivation, and we are honored to be a part of your journey towards growth and transformation.",
    contactButton: "Contact us now",
    flexibleOptionsTitle: "Flexible Consultation Options",
    discussionImageAlt:
      "A man and a woman having a discussion in a professional setting",
    introCampaignTitle: "Introductory Campaign – Limited-Time Offer",
    introCampaignDescription:
      "Take advantage of our exclusive introductory campaign designed to support new and existing clients.",
    newClientsTitle: "For New Clients:",
    complimentaryConsultationLabel: "Complimentary Consultation:",
    complimentaryConsultationText:
      "Enjoy a free 2-hour session to explore business opportunities and discover how we can assist you.",
    noMembershipFeesLabel: "No Membership Fees:",
    noMembershipFeesText:
      "Experience our services with no membership fees for the first two years.",
    regularClientsTitle: "For Regular Clients:",
    unlimitedConsultationsLabel: "Unlimited Free Consultations:",
    unlimitedConsultationsText:
      "Stay ahead with ongoing business support and expert insights tailored to your needs.",
    trainingTitle:
      "New! One-on-One Training for Car Exporting from Japan",
    trainingDescription:
      "Master the art of exporting cars from Japan with personalized training sessions designed for all experience levels.",
    trainingBullet1Label: "Comprehensive Learning:",
    trainingBullet1Text:
      "Gain in-depth knowledge of auction sourcing, dismantling, container vanning, and logistics.",
    trainingBullet2Label: "Tailored Guidance:",
    trainingBullet2Text:
      "Perfect for beginners and professionals looking to refine their expertise.",
    trainingBullet3Label: "Exclusive Resources:",
    trainingBullet3Text:
      "Access a curated database of auction houses, compliance guidelines, and shipping strategies.",
    trainingCallToAction:
      "Start your journey today with expert guidance and hands-on learning!",
    fieldsOfExpertiseTitle: "Fields of Expertise",
    expertise: [
      {
        title: "Strategic Trade Advisory",
        description: "Optimize supply chains and logistics for global trade.",
      },
      {
        title: "Renewable Energy Solutions",
        description:
          "Access quality-tested solar panels and renewable energy products.",
      },
      {
        title: "Consumer Goods Sourcing",
        description:
          "Source home appliances, clothes, and other high-demand goods in bulk.",
      },
      {
        title: "Specialized Products from France",
        items: [
          "Wholesale EV charging stands",
          "Terrace roof mounts",
          "Factory-fresh tires",
          "High-quality bulk clothes",
          "Brand-new cars under factory warranty",
        ],
      },
      {
        title: "Automotive Trade Advisory",
        description:
          "Expand into lucrative automotive markets with consulting and sourcing for used and brand-new cars.",
      },
      {
        title: "One-on-One Car Export Training",
        description:
          "Gain in-depth knowledge about car exporting from Japan.",
      },
    ],
    bridgeImageAlt: "An image showcasing network graph",
    bridgeTitle:
      "Artisbay Inc. Bridging Japanese Businesses with Overseas Markets",
    bridgeText:
      "Artisbay Inc. serves as a crucial link between Japanese businesses and international buyers, streamlining exports and ensuring seamless transactions. With deep expertise in Japan’s automotive and used parts industries, Artisbay Inc. connects local suppliers—ranging from auction-sourced vehicle providers to dismantlers and tire wholesalers—with overseas businesses seeking high-quality Japanese products. By handling sourcing, logistics, and compliance, Artisbay Inc. simplifies access to Japan’s trusted market, making global trade more efficient and reliable.",
    diversifyTitle: "Ready to Diversify Your Business?",
    diversifyText:
      "Partner with Artisbay to access tailored consulting services and innovative solutions including:",
    diversifyItems: [
      "Solar panels",
      "Brand-new tires",
      "Brand-new cars",
      "Home appliances",
      "Terrace roof mounts",
      "EV charging stations",
    ],
    finalContactButton: "Contact us now",
    finalContactText:
      " to schedule your free consultation and discover how we can help your business grow!",
  },
  jp: {
    title: "Artisbay に相談する",
    subtitle: "Artisbay に参加して、ビジネスの可能性を世界へ広げましょう",
    intro: 
      `Artisbay は、成長と効率化を目指す企業のために、オーダーメイドのコンサルティングサービスを
      提供しています。グローバル貿易のナビゲーション、業務の最適化、新市場の開拓など、私たちの
      専門知識があなたの成功を支えます。再生可能エネルギーソリューションから物流コンサルティン
      グまで、多様なサービスで、競争の激しい市場での成長をサポートします。`,
    testimonialsIntro: "お客様からの感動的な声をご紹介します：",
    testimonials: [
      {
        text:
          `「Artisbay Inc. との協業によって得られた成果に感動しています。彼らの戦略的なガイダンスと データ駆動型のアプローチは、私たちのビジネスを変革し、大幅な収益成長と業務効率の向上を 実現しました。」`,
        author: "- Niaz Q.",
        company: "Dragzine Motors CC (ナミビア)",
      },
      {
        text:
          "「まさにゲームチェンジャー！Artisbay Inc. でビジネスが一変しました。」",
        author: "- Edouard T.",
        company: "Ichinomiya Motors LLC (日本)",
      },
      {
        text:
          "「卓越した専門知識！Artisbay Inc. は期待を超える成果を届けてくれました。」",
        author: "- Hellen Salma",
        company: "HBI International LLC (日本)",
      },
    ],
    consultingSupport:
      `Artisbay は、企業が市場を拡大し、業務の卓越性を実現するための支援を行います。戦略的計画
      から物流最適化、再生可能エネルギーソリューション、マンツーマンの輸出トレーニングまで、競
      争の激しいグローバル市場で成功するための専門知識を提供します。信頼できるガイダンスのも
      と、新たな機会を開拓し、業務を効率化し、確かな成長を実現しましょう。`,
    sectionImageAlt:
      "オフィス環境で握手する二人のビジネスプロフェッショナル",
    whyChooseTitle: "なぜ Artisbay のコンサルティングを選ぶのか？",
    strategicExpertise: "主要市場における戦略的専門知識",
    market1: {
      title: "東アフリカ・南部アフリカ:",
      description:
        "ダルエスサラームやウォルビスベイなどの戦略的ハブを活用し、コスト効率の高いアクセスで主要 地域のビジネスチャンスを開拓しましょう。",
      imageAlt: "アフリカ大陸のアウトライン",
      imageLabel: "AFRICA",
    },
    market2: {
      title: "ヨーロッパ・フランス:",
      description:
        `衣類の大量仕入れ、電気自動車用充電スタンドの卸売、新品タイヤ、住宅テラスの屋根マウントな
        ど、高品質な製品を調達できます。`,
      imageAlt: "欧州連合の旗",
      imageLabel: "EUROPE",
    },
    market3: {
      title: "グローバル市場展開:",
      description:
        `ビジネス目標に合わせた実践的な戦略で、国際市場へ拡大。新たな市場を常に探求し、戦略的
        パートナーを積極的に開拓することで、継続的な成長と新たなグローバル機会の創出を実現します`,
      imageAlt: "グローバルな市場展開を示す地球儀",
      imageLabel: "GLOBAL",
    },
    footerText:
      "私たちを信頼してくださったすべてのお客様に、深く感謝いたします。皆様の成功が私たちの原動力であり、成長と変革の旅にご一緒できることを光栄に思います。",
    contactButton: "今すぐお問い合わせください",
    flexibleOptionsTitle: "柔軟なコンサルティングオプション",
    discussionImageAlt: "プロフェッショナルな環境で議論する男女",
    introCampaignTitle: "イントロダクトリーキャンペーン – 期間限定オファー",
    introCampaignDescription:
      "新規および既存のお客様をサポートするための特別キャンペーンをぜひご活用ください。",
    newClientsTitle: "新規クライアント向け:",
    complimentaryConsultationLabel: "無料コンサルティング:",
    complimentaryConsultationText:
      "ビジネス機会を探り、私たちのサポートを体験できる2時間の無料セッションをご提供。",
    noMembershipFeesLabel: "会員費無料:",
    noMembershipFeesText:
      "初めの2年間は会員費無料でサービスをお試しいただけます。",
    regularClientsTitle: "既存クライアント向け:",
    unlimitedConsultationsLabel: "無制限の無料コンサルティング:",
    unlimitedConsultationsText:
      "継続的なビジネスサポートと、ニーズに合わせた専門的なアドバイスを提供。",
    trainingTitle:
      "新登場！日本からの中古車輸出に関するマンツーマントレーニング",
    trainingDescription:
      "あらゆる経験レベルの方に向けた日本からの中古車輸出をマスターする個別指導を実施。",
    trainingBullet1Label: "総合的な学習:",
    trainingBullet1Text:
      "オークションでの仕入れ、解体、コンテナバニング（梱包）、物流について深く学べます。",
    trainingBullet2Label: "個別指導:",
    trainingBullet2Text:
      "初心者から経験者まで、ニーズに合わせた専門的なアドバイスをご提供。",
    trainingBullet3Label: "限定リソース:",
    trainingBullet3Text:
      "オークションハウスのデータベース、法規制ガイドライン、輸送戦略など、特別な情報にアクセス可能。",
    trainingCallToAction:
      "専門的な指導と実践的な学習で、今すぐあなたの輸出ビジネスをスタートしましょう！",
    fieldsOfExpertiseTitle: "専門分野",
    expertise: [
      {
        title: "戦略的貿易アドバイザリー",
        description:
          "グローバル貿易のためのサプライチェーンと物流の最適化を支援。",
      },
      {
        title: "再生可能エネルギーソリューション",
        description:
          "品質検査済みのソーラーパネルや再生可能エネルギー製品を提供。",
      },
      {
        title: "消費財の調達",
        description:
          "家電、衣類、その他の需要の高い商品を大量調達可能。",
      },
      {
        title: "フランスからの特化商品",
        items: [
          "EV充電スタンド（卸売）",
          "テラス屋根マウント",
          "工場出荷の新品タイヤ",
          "高品質な衣類の大量仕入れ",
          "メーカー保証付きの新車",
        ],
      },
      {
        title: "自動車貿易アドバイザリー",
        description:
          "中古車・新車の調達と市場参入のコンサルティングを提供し、有望な自動車市場への進出を支援。",
      },
      {
        title: "マンツーマン中古車輸出トレーニング",
        description:
          "日本からの中古車輸出に関する専門知識を深める個別指導を実施。",
      },
    ],
    bridgeImageAlt: "ネットワークグラフを示す画像",
    bridgeTitle:
      "Artisbay Inc. – 日本企業と海外市場をつなぐ架け橋",
    bridgeText:
      "Artisbay Inc. は、日本企業と海外バイヤーを結びつけ、輸出プロセスをスムーズにし、取引の円滑化を支援します。日本の自動車・中古部品業界における豊富な専門知識を活かし、オークション車両の提供者、解体業者、タイヤ卸売業者などの日本のサプライヤーを、高品質な日本製品を求める海外ビジネスとつなげます。仕入れ、物流、法規制対応を一括でサポートし、日本市場へのアクセスを簡素化。グローバル貿易をより効率的かつ信頼性の高いものにします。",
    diversifyTitle: "ビジネスの多角化をお考えですか？",
    diversifyText:
      "Artisbay と提携し、カスタマイズされたコンサルティングサービスと革新的なソリューションにアクセスしましょう。",
    diversifyItems: [
      "ソーラーパネル",
      "新品タイヤ",
      "新車",
      "家電製品",
      "テラス屋根マウント",
      "EV充電ステーション",
    ],
    finalContactButton: "今すぐお問い合わせください",
    finalContactText:
      " 無料コンサルティングを予約し、ビジネス成長の可能性を発見しましょう！",
  },
  
  
};

const ArtisbayPromo = () => {
  const location = useLocation();
  const [language, setLanguage] = useState("jp");
  const t = translations[language];

  return (
    <div className="ab-consulting max-w-4xl mx-auto p-6">
      {/* Language Switcher */}
      <div className="language-switcher mb-4">
        <button
          onClick={() => setLanguage("en")}
          className={language === "en" ? "active" : ""}
        >
          English
        </button>
        <button
          onClick={() => setLanguage("jp")}
          className={language === "jp" ? "active" : ""}
        >
          日本語
        </button>
      </div>


      {/* Part 1 */}
      <h1 className="text-3xl font-bold text-center text-yellow-600 mb-6">
        {t.title}
      </h1>
      <h2 className="text-xl font-bold mb-4">{t.subtitle}</h2>
      <p className="mb-4">{t.intro}</p>
      <h3 className="text-lg font-bold mb-4">{t.testimonialsIntro}</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-14 mb-6">
        <div className="md:col-span-1">
          <p className="italic">{t.testimonials[0].text}</p>
          <p className="mt-2 font-bold">
            {t.testimonials[0].author}
            <br />
            {t.testimonials[0].company}
          </p>
        </div>
        <div className="md:col-span-2 space-y-6">
          <div>
            <p className="italic">{t.testimonials[1].text}</p>
            <p className="mt-2 font-bold">
              {t.testimonials[1].author}
              <br />
              {t.testimonials[1].company}
            </p>
          </div>
          <div>
            <p className="italic">{t.testimonials[2].text}</p>
            <p className="mt-2 font-bold">
              {t.testimonials[2].author}
              <br />
              {t.testimonials[2].company}
            </p>
          </div>
        </div>
      </div>
      <hr className="divider" />
      <div className="section-container">
        <div className="section-text">
          <p>{t.consultingSupport}</p>
        </div>
        <div className="section-image">
          <img
            alt={t.sectionImageAlt}
            src="/artisbay-server/images/consulting/handshake.png"
            width="300"
            height="200"
          />
        </div>
      </div>

      {/* Part 2 */}
      <div>
        <h1 className="heading-primary">{t.whyChooseTitle}</h1>
        <div className="mb-8">
          <h2 className="heading-secondary">{t.strategicExpertise}</h2>
          <div className="content-section">
            <div className="text-content">
              <h3 className="heading-tertiary">{t.market1.title}</h3>
              <p>{t.market1.description}</p>
            </div>
            <div className="image-content">
              <img
                src={`${process.env.PUBLIC_URL}/images/consulting/africa.png`}
                alt={t.market1.imageAlt}
              />
              <p>{t.market1.imageLabel}</p>
            </div>
          </div>
          <div className="content-section">
            <div className="text-content">
              <h3 className="heading-tertiary">{t.market2.title}</h3>
              <p>{t.market2.description}</p>
            </div>
            <div className="image-content">
              <img
                src={`${process.env.PUBLIC_URL}/images/consulting/europeflag.png`}
                alt={t.market2.imageAlt}
              />
              <p>{t.market2.imageLabel}</p>
            </div>
          </div>
          <div className="content-section">
            <div className="text-content">
              <h3 className="heading-tertiary">{t.market3.title}</h3>
              <p>{t.market3.description}</p>
            </div>
            <div className="image-content">
              <img
                src={`${process.env.PUBLIC_URL}/images/consulting/globe.png`}
                alt={t.market3.imageAlt}
              />
              <p>{t.market3.imageLabel}</p>
            </div>
          </div>
        </div>
        <div className="footer-section">
          <p>{t.footerText}</p>
          <div className="cta">
          <Link to={`/contact?from=consulting&lang=${language}`} className="cta-link">
            <button>{t.contactButton}</button>
          </Link>

          </div>
        </div>
      </div>

      {/* Part 3 */}
      <h1 className="text-3xl font-bold text-center text-yellow-600 mb-6">
        {t.flexibleOptionsTitle}
      </h1>
      <div className="image-container">
        <img
          src={`${process.env.PUBLIC_URL}/images/consulting/discussion.png`}
          alt={t.discussionImageAlt}
        />
      </div>
      <div className="text-lg">
        <h2 className="heading-secondary">{t.introCampaignTitle}</h2>
        <p>{t.introCampaignDescription}</p>
        <p className="font-bold">{t.newClientsTitle}</p>
        <ul className="list-disc list-inside">
          <li>
            <span className="font-bold">
              {t.complimentaryConsultationLabel}
            </span>{" "}
            {t.complimentaryConsultationText}
          </li>
          <li>
            <span className="font-bold">{t.noMembershipFeesLabel}</span>{" "}
            {t.noMembershipFeesText}
          </li>
        </ul>
        <p className="font-bold mt-4">{t.regularClientsTitle}</p>
        <ul className="list-disc list-inside">
          <li>
            <span className="font-bold">
              {t.unlimitedConsultationsLabel}
            </span>{" "}
            {t.unlimitedConsultationsText}
          </li>
        </ul>
      </div>

      <div className="mt-6">
        <p className="font-bold text-lg">{t.trainingTitle}</p>
        <p>{t.trainingDescription}</p>
        <ul className="list-disc list-inside mt-2">
          <li>
            <span className="font-bold">
              {t.trainingBullet1Label}
            </span>{" "}
            {t.trainingBullet1Text}
          </li>
          <li>
            <span className="font-bold">
              {t.trainingBullet2Label}
            </span>{" "}
            {t.trainingBullet2Text}
          </li>
          <li>
            <span className="font-bold">
              {t.trainingBullet3Label}
            </span>{" "}
            {t.trainingBullet3Text}
          </li>
        </ul>
        <p>{t.trainingCallToAction}</p>
      </div>

      {/* Part 4 */}
      <h1 className="text-3xl font-bold text-center text-yellow-600 mb-6">
        {t.fieldsOfExpertiseTitle}
      </h1>
      <div className="expertise-content">
        <ol>
          <li>{t.expertise[0].title}</li>
          <p>{t.expertise[0].description}</p>
          <li>{t.expertise[1].title}</li>
          <p>{t.expertise[1].description}</p>
          <li>{t.expertise[2].title}</li>
          <p>{t.expertise[2].description}</p>
          <li>{t.expertise[3].title}</li>
          <ul className="special-products-list">
            {t.expertise[3].items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <li>{t.expertise[4].title}</li>
          <p>{t.expertise[4].description}</p>
          <li>{t.expertise[5].title}</li>
          <p>{t.expertise[5].description}</p>
        </ol>
      </div>
      <hr className="divider" />

      {/* Part 4 - Bridge */}
      <div>
        <div className="image-container">
          <img
            src={`${process.env.PUBLIC_URL}/images/consulting/abbridge.png`}
            alt={t.bridgeImageAlt}
          />
        </div>
        <div className="why-artisbay">
          <h3>{t.bridgeTitle}</h3>
          <p>{t.bridgeText}</p>
        </div>
      </div>

      {/* Part 5 */}
      <h3>{t.diversifyTitle}</h3>
      <p>{t.diversifyText}</p>
      <ul>
        {t.diversifyItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <p className="cta">
        <Link to="/contact?from=consulting" className="cta-link">
          <button>{t.finalContactButton}</button>
        </Link>
        {t.finalContactText}
      </p>
    </div>
  );
};

export default ArtisbayPromo;
