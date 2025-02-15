import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../css/japanExports.css'; // Import the CSS file
import Contact from '../contact';

const PdfContent = () => {
  const [language, setLanguage] = useState('ja');
  const [japanExports,setJapanExports] = useState(true);

  const content = {
    en: `
      <h4>Unlock Overseas Opportunities with Artisbay Inc.</h4>
      <p>Japanese sports cars are in high demand worldwide, from classic JDM icons to the latest high-performance models. However, reaching international buyers can be complex—logistics, regulations, and market access can be significant barriers.</p>
      <p>At Artisbay Inc., we specialize in import and export business consulting, helping businesses expand into global markets. Our expertise spans Japanese sports cars, sport bikes, solar panels, and house structure extensions such as terraces and more. Whether you need seamless logistics, trusted buyers, or auction sourcing, we have you covered.</p>
      <h4>Why Work with Artisbay Inc.?</h4>
      <ul>
        <li>We manage all aspects of shipping, customs, and compliance, ensuring a hassle-free export process.</li>
        <li>Our expertise guarantees your vehicles and bikes reach buyers in Europe, the USA, and beyond quickly and securely.</li>
        <li>We connect you with verified global dealers, collectors, and enthusiasts actively seeking Japanese sports cars.</li>
        <li>Expand beyond local markets and maximize profitability with strategic international sales.</li>
        <li>We help you source the most in-demand models from Japan’s leading auctions.</li>
        <li>Optimize your inventory for higher sales and faster turnover in global markets.</li>
        <li>Whether you want to sell your stock or source new vehicles, we can connect you with trusted buyers and suppliers to help you grow your business.</li>
      </ul>
      <h4>Who Can Benefit?</h4>
      <ul>
        <li>Japanese sports car dealers looking to expand overseas.</li>
        <li>Auction participants who want to sell directly to global buyers.</li>
        <li>Collectors and specialty vehicle businesses seeking international growth.</li>
      </ul>
      <p>Expand beyond Japan. Sell your sports cars to a worldwide audience. Join forces with Artisbay Inc. and unlock your global potential today.</p>
      <p><a class='cta-link' href='#/contact'> Contact us </a> now to explore international opportunities!</p>
      <div class='image-container'>
        <img src='${process.env.PUBLIC_URL}/images/consultwithabchart.png' alt='Consult with Artisbay' />
      </div>
    `,
    ja: `
    <div class="banner">
        <img src='${process.env.PUBLIC_URL}/images/consultwithabhelp.png' alt='Consult with Artisbay' />
    </div>
    <div class='japan-exports'>
    
      <h3>アーティスベイ株式会社と共に海外市場を開拓しましょう</h3>
      <p>日本のスポーツカーは、クラシックなJDMモデルから最新のハイパフォーマンス車まで、 世界中で高い需要があります。しかし、海外の購入者に販売するには、物流、規制、市場 参入の壁など、さまざまな課題があります。</p>
      <p>アーティスベイ株式会社は、輸出入ビジネスコンサルティングを専門とし、日本の企業が海外市場に進出するサポートを提供します。私たちは、日本のスポーツカー、スポーツバイク、ソーラーパネル、テラスなどの住宅構造拡張を取り扱い、物流、信頼できるバイヤー、オークションでの仕入れなど、あらゆるニーズに対応いたします。</p>
      <h3>アーティスベイ株式会社を選ぶ理由</h3>
      <ol class='ordered-list'>
       <li><strong>スムーズな海外輸出と物流サポート</strong></li>
      <ul>
       
        <li>輸送、通関、各国の規制対応をすべて管理し、手間のかからない輸出プロセスを実現します。</li>
        <li>日本の車両やバイクを、ヨーロッパやアメリカなど世界中のバイヤーへ迅速かつ確実に届けます。</li>
      </ul>
      <li><strong>海外バイヤーへの直接販売が可能</strong></li>
      <ul>
        
        <li>世界中の信頼できるディーラー、コレクター、愛好家と直接つながることができます。</li>
        <li>国内市場を超えて販売の可能性を広げ、収益の最大化を実現します。</li>
      </ul>
        <li><strong>オークション＆在庫管理のサポート</strong></li>
      <ul>
        <li>日本の主要オークションから、需要の高いモデルを仕入れるお手伝いをします。</li>
        <li>在庫の最適化を行い、海外市場での販売効率を向上させます。</li>
        <li>在庫を売りたい場合でも、新しく車両を仕入れたい場合でも、最適なバイヤーや仕入先を紹介し、事業拡大をサポートします。</li>
      </ul>
      </ol>
      <div class='image-container'>
        <img src='${process.env.PUBLIC_URL}/images/consultwithabchartjp.png' alt='Consult with Artisbay' />
      </div>
      <h3>こんな方におすすめ</h3>
      <ul class='check-list'>
        <li>✅海外市場に進出したい日本のスポーツカーディーラー</li>
        <li>✅オークションを活用し、海外のバイヤーへ直接販売したい方</li>
        <li>✅コレクターや特殊車両を扱うビジネスオーナー</li>
      </ul>
      <p>日本国内だけでなく、世界中のバイヤーへスポーツカーを販売しませんか？アーティスベイ株式会社と共に、新たな市場を開拓しましょう！</p>
    
      <p>今すぐお問い合わせください！</p>
    
    </div>
    `
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ja' : 'en');
  };

  return (
    <div className='pdf-content-container'>
      {/*
      <button style={buttonStyle} onClick={toggleLanguage}>
        {language === 'en' ? '日本語に切り替え' : 'Switch to English'}
      </button>
      */}
      <div dangerouslySetInnerHTML={{ __html: content[language] }} />
      <Contact japanExports={japanExports} />
    </div>
  );
};

export default PdfContent;