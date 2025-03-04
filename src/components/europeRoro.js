import React, { useState, useEffect } from 'react';

const EuropeRoroShippingTable = () => {
  const [shippingData, setShippingData] = useState([]);

  const columns = [
    'Company', 'Ship Name', 'Voyage', 'Yokohama', 'Kawasaki', 'Nagoya', 'Kobe', 
    'Osaka', 'Hakata', 'Kanda', 'Kisarazu', 'Nakanoseki', 'Hitachinaka', 
    'Jebel Ali', 'Karachi', 'Port Louis', 'Durban', 'Dar', 'Mombasa', 'Maput', 
    'Hambantota'
  ];

  const htmlTable = `
  <div id="list"><table class="main_h"><tbody><tr id="head_nh"><td>Company</td><td>Ship Name</td><td>Voyage</td><td>Yoko-<br>hama</td><td>Kawa-<br>saki</td><td>Nagoya</td><td>Kobe</td><td>Osaka</td><td>Hakata</td><td>Kanda</td><td>Kisa-<br>razu</td><td>Hitachi-<br>naka</td><td>Larnaca</td><td>Dublin</td><td>Southampton</td><td>Bremerhaven</td><td>Hanko</td><td>Limassol</td><td>Rotterdam</td><td>Valletta</td><td>Drammen</td><td>Le Havre</td><td>Antwerp</td><td>Amsterdam</td><td>Derince</td><td>Zeebrugge</td><td>Bristol</td><td>Newcastle</td>        </tr></tbody></table><div class="ship_c"><table class="main">
<tbody><tr class="row" bgcolor="#ffffff" nowrap=""><td>ARMACUP</td><td>SALOME</td><td>PE501</td><td>Jan<br>21</td><td>-</td><td>Jan<br>20</td><td>Jan<br>18</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>Mar<br>19</td><td>Mar<br>11</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>O</td><td>-</td><td>-</td></tr>
<tr class="row" bgcolor="#f3f3f3" nowrap=""><td>MOL</td><td>CELESTE ACE</td><td>0002A</td><td>-</td><td>-</td><td>Jan<br>22</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>O</td><td>O</td><td>O</td><td>-</td><td>-</td><td>O</td><td>-</td><td>-</td><td>-</td><td>-</td><td>O</td><td>-</td><td>O</td><td>O</td><td>O</td></tr>
<tr class="row" bgcolor="#ffffff" nowrap=""><td>ARMACUP</td><td>TAIPAN</td><td>PE502</td><td>Jan<br>25</td><td>-</td><td>Jan<br>27</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>Mar<br>18</td><td>Mar<br>16</td><td>-</td><td>-</td><td>-</td><td>-</td><td>Mar<br>22</td><td>-</td><td>-</td><td>-</td><td>-</td><td>Mar<br>21</td><td>Mar<br>15</td><td>-</td></tr>
<tr class="row" bgcolor="#f3f3f3" nowrap=""><td>ARMACUP</td><td>TAMESIS</td><td>PW501</td><td>Jan<br>27</td><td>-</td><td>Jan<br>26</td><td>Jan<br>24</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>O</td><td>Apr<br>14</td><td>Apr<br>9</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>O</td><td>O</td><td>-</td></tr>
<tr class="row" bgcolor="#ffffff" nowrap=""><td>ARMACUP</td><td>SALOME</td><td>PW501</td><td>-</td><td>-</td><td>-</td><td>Feb<br>3</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
<tr class="row" bgcolor="#f3f3f3" nowrap=""><td>HOEGH</td><td>HOEGH TRANSPORTER</td><td>176</td><td>-</td><td>-</td><td>Feb 08<br><span class="cut_date">Cut:Jan 17</span></td><td>Feb 14<br><span class="cut_date">Cut:Feb 03</span></td><td>-</td><td>-</td><td>-</td><td>-</td><td>Feb<br>9</td><td>-</td><td>Apr<br>8</td><td>Apr<br>2</td><td>Apr<br>6</td><td>O</td><td>-</td><td>-</td><td>-</td><td>-</td><td>Apr<br>2</td><td>-</td><td>Apr<br>3</td><td>-</td><td>Mar<br>28</td><td>-</td><td>Mar<br>31</td></tr>
<tr class="row" bgcolor="#ffffff" nowrap=""><td>HOEGH</td><td>HOEGH SHANGHAI</td><td>116</td><td>Feb 08<br><span class="cut_date">Cut:Jan 29</span></td><td>-</td><td>-</td><td>Feb 12<br><span class="cut_date">Cut:Jan 29</span></td><td>-</td><td>-</td><td>-</td><td>-</td><td>Jan<br>20</td><td>Apr<br>16</td><td>Apr<br>18</td><td>Apr<br>16</td><td>Apr<br>11</td><td>O</td><td>O</td><td>-</td><td>Mar<br>26</td><td>-</td><td>Apr<br>12</td><td>-</td><td>Apr<br>12</td><td>-</td><td>Apr<br>8</td><td>-</td><td>Apr<br>18</td></tr>
<tr class="row" bgcolor="#f3f3f3" nowrap=""><td>ARMACUP</td><td>TONGALA</td><td>PE503</td><td>Feb<br>14</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>O</td><td>O</td><td>O</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>Apr<br>7</td><td>O</td><td>-</td></tr>
<tr class="row" bgcolor="#ffffff" nowrap=""><td>MOL(INTEROCEAN）</td><td>TURQUOISE ACE</td><td>0003A</td><td>Feb 15<br><span class="cut_date">Cut:Feb 03</span></td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>Apr<br>9</td><td>Apr<br>15</td><td>Apr<br>25</td><td>-</td><td>-</td><td>Apr<br>20</td><td>-</td><td>-</td><td>-</td><td>-</td><td>Apr<br>10</td><td>-</td><td>Mar<br>31</td><td>Mar<br>27</td><td>Apr<br>10</td></tr>
<tr class="row" bgcolor="#f3f3f3" nowrap=""><td>MOL</td><td>TURQUOISE ACE</td><td>0003A</td><td>Feb 15<br><span class="cut_date">Cut:Feb 05</span></td><td>-</td><td>Feb 17<br><span class="cut_date">Cut:Jan 30</span></td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>Mar<br>31</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>Mar<br>28</td><td>Mar<br>26</td><td>-</td></tr>
<tr class="row" bgcolor="#ffffff" nowrap=""><td>NYK</td><td>HEROIC LEADER</td><td>094</td><td>Feb<br>20</td><td>-</td><td>Feb<br>22</td><td>Feb<br>24</td><td>Feb<br>23</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>O</td><td>-</td><td>-</td></tr>
<tr class="row" bgcolor="#f3f3f3" nowrap=""><td>ARMACUP</td><td>FIGARO</td><td>PE504</td><td>Feb<br>20</td><td>-</td><td>Feb<br>21</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>Apr<br>25</td><td>Apr<br>9</td><td>Apr<br>9</td><td>-</td><td>-</td><td>-</td><td>-</td><td>Apr<br>16</td><td>-</td><td>-</td><td>-</td><td>-</td><td>Apr<br>8</td><td>-</td><td>-</td></tr>
<tr class="row" bgcolor="#ffffff" nowrap=""><td>HOEGH</td><td>HOEGH TRAPPER</td><td>49</td><td>Feb 24<br><span class="cut_date">Cut:Feb 14</span></td><td>-</td><td>Feb 25<br><span class="cut_date">Cut:Feb 12</span></td><td>Feb 26<br><span class="cut_date">Cut:Feb 14</span></td><td>-</td><td>-</td><td>-</td><td>-</td><td>Feb<br>22</td><td>May<br>6</td><td>May<br>7</td><td>May<br>9</td><td>May<br>6</td><td>O</td><td>O</td><td>-</td><td>Apr<br>16</td><td>-</td><td>May<br>3</td><td>O</td><td>May<br>2</td><td>-</td><td>Apr<br>27</td><td>-</td><td>Apr<br>30</td></tr>
<tr class="row" bgcolor="#f3f3f3" nowrap=""><td>ARMACUP</td><td>PARSIFAL</td><td>PW502</td><td>Feb<br>24</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
<tr class="row" bgcolor="#ffffff" nowrap=""><td>K-LINE</td><td>BROOKLANDS</td><td>27</td><td>Feb 25<br><span class="cut_date">Cut:Feb 13</span></td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>May<br>2</td><td>-</td><td>Apr<br>22</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>Apr<br>18</td><td>Apr<br>15</td><td>-</td></tr>
<tr class="row" bgcolor="#f3f3f3" nowrap=""><td>ARMACUP</td><td>MORNING CAPO</td><td>PT501</td><td>-</td><td>-</td><td>Feb<br>27</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>May<br>5</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
<tr class="row" bgcolor="#ffffff" nowrap=""><td>K-LINE</td><td>BISHU HIGHWAY</td><td>126</td><td>Mar 11<br><span class="cut_date">Cut:Feb 28</span></td><td>-</td><td>-</td><td>Mar 14<br><span class="cut_date">Cut:Mar 03</span></td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>O</td><td>-</td><td>O</td><td>-</td><td>O</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>O</td><td>O</td><td>-</td></tr>
<tr class="row" bgcolor="#f3f3f3" nowrap=""><td>ARMACUP</td><td>TOSCANA</td><td>PE505</td><td>Mar<br>15</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>May<br>19</td><td>-</td><td>May<br>11</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>May<br>12</td><td>-</td><td>-</td><td>-</td><td>May<br>2</td><td>Apr<br>27</td><td>-</td></tr>
<tr class="row" bgcolor="#ffffff" nowrap=""><td>ARMACUP</td><td>TAMERLANE</td><td>PE502</td><td>Mar<br>15</td><td>-</td><td>Mar<br>13</td><td>Mar<br>12</td><td>-</td><td>-</td><td>-</td><td>-</td><td>Mar<br>18</td><td>-</td><td>Jun<br>5</td><td>May<br>8</td><td>Mar<br>4</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>Mar<br>19</td><td>May<br>15</td><td>-</td></tr>
<tr class="row" bgcolor="#f3f3f3" nowrap=""><td>HOEGH</td><td>HOEGH YOKOHAMA</td><td>134</td><td>Mar 18<br><span class="cut_date">Cut:Mar 07</span></td><td>-</td><td>-</td><td>-</td><td>Mar 15<br><span class="cut_date">Cut:Mar 05</span></td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>May<br>24</td><td>May<br>21</td><td>May<br>21</td><td>O</td><td>-</td><td>-</td><td>-</td><td>-</td><td>May<br>19</td><td>-</td><td>May<br>16</td><td>-</td><td>May<br>14</td><td>Apr<br>24</td><td>May<br>22</td></tr>
<tr class="row" bgcolor="#ffffff" nowrap=""><td>ARMACUP</td><td>OBERON</td><td>PE506</td><td>Mar<br>20</td><td>-</td><td>Mar<br>21</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>May<br>23</td><td>May<br>4</td><td>May<br>11</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>May<br>16</td><td>-</td><td>-</td><td>-</td><td>May<br>8</td><td>-</td><td>-</td></tr>
<tr class="row" bgcolor="#f3f3f3" nowrap=""><td>HOEGH</td><td>HOEGH TRIGGER</td><td>55</td><td>Mar 24<br><span class="cut_date">Cut:Mar 12</span></td><td>-</td><td>Mar 27<br><span class="cut_date">Cut:Mar 10</span></td><td>Mar 28<br><span class="cut_date">Cut:Mar 18</span></td><td>-</td><td>-</td><td>-</td><td>-</td><td>Mar<br>23</td><td>May<br>31</td><td>Jun<br>2</td><td>May<br>29</td><td>May<br>29</td><td>-</td><td>O</td><td>-</td><td>May<br>11</td><td>-</td><td>May<br>27</td><td>-</td><td>May<br>27</td><td>-</td><td>May<br>22</td><td>-</td><td>May<br>25</td></tr>
<tr class="row" bgcolor="#ffffff" nowrap=""><td>MOL</td><td>WISTERIA ACE</td><td>0140A</td><td>Mar 25<br><span class="cut_date">Cut:Mar 13</span></td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>May<br>10</td><td>May<br>30</td><td>May<br>30</td><td>-</td><td>Jun<br>10</td><td>May<br>7</td><td>-</td><td>-</td><td>Jun<br>5</td><td>May<br>25</td><td>May<br>30</td><td>-</td><td>May<br>9</td><td>May<br>4</td><td>May<br>25</td></tr>
<tr class="row" bgcolor="#f3f3f3" nowrap=""><td>ARMACUP</td><td>TALISMAN</td><td>PW503</td><td>Mar<br>26</td><td>-</td><td>Mar<br>24</td><td>Mar<br>23</td><td>-</td><td>-</td><td>-</td><td>-</td><td>Mar<br>28</td><td>-</td><td>O</td><td>O</td><td>O</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>O</td><td>O</td><td>-</td></tr>
<tr class="row" bgcolor="#ffffff" nowrap=""><td>MOL</td><td>MIRACULOUS ACE</td><td>sub</td><td>-</td><td>-</td><td>Mar 29<br><span class="cut_date">Cut:Mar 17</span></td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
<tr class="row" bgcolor="#f3f3f3" nowrap=""><td>ARMACUP</td><td>ARMACUP PENDING</td><td></td><td>O</td><td>-</td><td>O</td><td>O</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
		</tbody></table></div></div>
  `;

  useEffect(() => {
    const parseShippingData = () => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlTable, 'text/html');
      const rows = doc.querySelectorAll('tr.row');

      const parsedData = Array.from(rows).map(row => {
        const cells = row.querySelectorAll('td');
        return {
          company: cells[0].textContent,
          shipName: cells[1].textContent,
          voyage: cells[2].textContent,
          stops: Array.from(cells).slice(3).reduce((acc, cell, index) => {
            const column = columns[index + 3]; // Be sure columns array is adjusted accordingly
            const value = cell.textContent.trim();
            if (value !== '-') acc[column] = value;
            return acc;
          }, {})
        };
      });
      

      setShippingData(parsedData);
    };

    parseShippingData();
  }, []);

  return (
    <div className="shipping-table-container">
    <table className="shipping-table roro">
      <thead className="sticky-header">
        <tr>
          {columns.map((column, index) => (
            <th 
              key={index} 
              dangerouslySetInnerHTML={{
                __html: column.replace('-', '<br>')
              }} 
            />
          ))}
        </tr>
      </thead>
      <tbody className="scrollable-body">
        {shippingData.map((entry, index) => (
          <tr 
            key={index} 
            className="data-row"
            style={{
              backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9f9f9'
            }}
          >
            <td>{entry.company}</td>
            <td>{entry.shipName}</td>
            <td>{entry.voyage}</td>
            {columns.slice(3).map((column, colIndex) => (
              <td key={colIndex}>
                {entry.stops[column] || '-'}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
};

export default EuropeRoroShippingTable;