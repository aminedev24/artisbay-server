import React from 'react';
import '../../css/help/bankInfo.css'; // Import the CSS file
import {Link} from 'react-router-dom'; 
import Tooltip from "../utilities/toolTip";

const BankInformation = () => {
  const bankInfo = {
    beneficiaryName: 'Artisbay Inc',
    bankName: 'SUMISHIN SBI NET BANK',
    branchName: 'HOJIN DAI ICHI (BRANCH SORT CODE:106)',
    bankAddress: '3-2-1 Roppongi, Minato-ku, Tokyo-to',
    swiftCode: 'NTSSJPJT',
    accountNumber: '2628940',
    beneficiaryAddress: '5-10-44, Kasagami, Tagajyo, Miyagi, Japan',
  };

  return (
    <div className="bank-information terms-container">
        <h3 className='notice'>important</h3>
        <p>
            
            Kindly ensure that the bank’s branch name is included alongside the bank’s name and SWIFT code to avoid delays in processing your payment. 
            If you have any questions about the payment process, please don’t hesitate to<Link className='cta-link' to='/contact'>contact us</Link>.
        </p>

        <h4>Wise Banking Information <span className='cta-link'>Our preferred payment method:</span></h4>
        
        
        <div className='wise-info-container'>
        <table className="bank-info-table wise-info-table">
            <tbody>
                <tr>
                    <th style={{padding: '16px'}} colSpan='2'>To pay in JPY (Japanese Yen):</th>
                </tr>
                <tr>
                    <th>Beneficiary Name</th>
                    <td>{bankInfo.beneficiaryName}</td>
                </tr>
                <tr>
                    <th>IBAN</th>
                    <td>GB80 TRWI 2308 0126 4624 61</td>
                </tr>
                <tr>
                    <th>Swift/BIC</th>
                    <td>TRWIGB2LXXX</td>
                </tr>
                <tr>
                    <th>Bank name and address</th>
                    <td>Wise Payments Limited, 56 Shoreditch High Street, London, E1 6JJ, United Kingdom</td>
                </tr>
            </tbody>
        </table>

        <table className="bank-info-table wise-info-table">
            <tbody>
                <tr>
                    <th colSpan='2'>To pay in EUR:</th>
                </tr>
                <tr>
                    <th>Beneficiary Name</th>
                    <td>{bankInfo.beneficiaryName}</td>
                </tr>
                <tr>
                    <th>IBAN</th>
                    <td> BE47 9052 3539 7280</td>
                </tr>
                <tr>
                    <th>Swift/BIC</th>
                    <td>TRWIBEB1XXX <Tooltip                   
                    
                    message="Use when sending money from outside SEPA" /></td>
                </tr>
                <tr>
                    <th>Bank name and address</th>
                    <td>Wise, Rue du Trône 100, 3rd floor, Brussels, 1050, Belgium</td>
                </tr>
            </tbody>
        </table>

        </div>
     

        
        <h4>Sumishin SBI NET BANK:</h4>
        <table className="bank-info-table">
            <tbody>
                <tr>
                    <th>Beneficiary Name</th>
                    <td>{bankInfo.beneficiaryName}</td>
                </tr>
                <tr>
                    <th>Bank Name</th>
                    <td>{bankInfo.bankName}</td>
                </tr>
                <tr>
                    <th>Branch Name</th>
                    <td>{bankInfo.branchName}</td>
                </tr>
                <tr>
                    <th>Bank Address</th>
                    <td>{bankInfo.bankAddress}</td>
                </tr>
                <tr>
                    <th>SWIFT Code</th>
                    <td>{bankInfo.swiftCode}</td>
                </tr>
                <tr>
                    <th>Account Number</th>
                    <td>{bankInfo.accountNumber}</td>
                </tr>
                <tr>
                    <th>Beneficiary Address</th>
                    <td>{bankInfo.beneficiaryAddress}</td>
                </tr>
            </tbody>
        </table>
    </div>
  );
};

export default BankInformation;