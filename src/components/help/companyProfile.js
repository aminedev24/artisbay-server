import React from 'react';
import '../../css/help/companyProfile.css';
import { Helmet } from 'react-helmet-async';
import ArtisbayOverview from './overview';
import { Link } from 'react-router-dom';

const CompanyProfile = (selectedTopic) => {
  const companyDetails = {
    name: "Artisbay Inc.",
    founded: "November 2024",
    address: "Cross Gate, 7th Floor, 1-101-1 Sakuragicho, Naka-ku, Yokohama, Kanagawa, Japan",
    mainBusiness: "An online-based platform for the sale and export of used vehicles and auto parts.",
    annualSales: "3,720,706 JPY",
    url: "https://artisbay.com",
    registeredinJapan: "Under the Yokohama Legal Affairs Bureau",
    email: 'contact@artisbay.com',
    business: 'Consulting in the export of used cars, automobile spare parts, agricultural equipment, etc.',
    secondHandDelear: 'From Kanagawa Prefectural Public Safety Commission Exporting area:  Africa, Asia, Europe, Oceania',
    exportingArea: 'Africa, Asia, Europe, Oceania',
    bankInformation: 'SUMISHIN SBI NET BANK'
  };

  return (
    <div className="company-profile-wrapper">
      <ArtisbayOverview />
      {/*<img src={`${process.env.PUBLIC_URL}/images/companyProfile.jpg`} alt={'company-profile'} className="topic-image" />*/}
     
      <div className="terms-container">
      <h2>Head Office</h2>
      <table className="bank-info-table">
        <tbody>
            <tr>
                <th>Company Name</th>
                <td>{companyDetails.name}</td>
            </tr>
            <tr>
                <th>Founded</th>
                <td>{companyDetails.founded}</td>
            </tr>
            <tr>
                <th>Address</th>
                <td>{companyDetails.address}</td>
            </tr>
            <tr>
                <th>Bank</th>
                <td>{companyDetails.bankInformation} <Link to='/help/artisbayInc/Bank-Information' className='cta-link'>(details)</Link></td>
            </tr>
            <tr>
                <th>Business</th>
                <td>{companyDetails.business}</td>
            </tr>
            <tr>
                <th>Main Business Activity</th>
                <td>{companyDetails.mainBusiness}</td>
            </tr>
            <tr>
                <th>annual Sales</th>
                <td>{companyDetails.annualSales}</td>
            </tr>
            <tr>
                <th>URL</th>
                <td>{companyDetails.url}</td>
            </tr>
            <tr>
                <th>Registered in Japan</th>
                <td>{companyDetails.registeredinJapan}</td>
            </tr>
            <tr>
                <th>License of Secondhand Dealer</th>
                <td>{companyDetails.secondHandDelear}</td>
            </tr>
            <tr>
                <th>Email</th>
                <td>{companyDetails.email}</td>
            </tr>
        </tbody>
    </table>
    <div className="location-container w-full">
      <h2>Location</h2>
      <iframe
        allowFullScreen=""
        className="w-full h-96"
        loading="lazy"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.997013509073!2d139.631673!3d35.451537!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60185c18c56d842b%3A0x38c3b299d8b3c18f!2sCross%20Gate%2C%207th%20Floor%2C%201-101-1%20Sakuragicho%2C%20Naka-ku%2C%20Yokohama%2C%20Kanagawa%2C%20Japan!5e0!3m2!1sen!2sjp!4v1633072800000!5m2!1sen!2sjp"
      >
      </iframe>
    </div>


      </div>
    </div>
  );
};

export default CompanyProfile;
