import React, { useState, useEffect } from 'react';

const AfricaRoroShippingTable = () => {
  const [shippingData, setShippingData] = useState([]);

  const columns = [
    'Company', 'Ship Name', 'Voyage', 'Yokohama', 'Kawasaki', 'Nagoya', 'Kobe', 
    'Osaka', 'Hakata', 'Kanda', 'Kisarazu', 'Nakanoseki', 'Hitachinaka', 
    'Jebel Ali', 'Karachi', 'Port Louis', 'Durban', 'Dar', 'Mombasa', 'Maput', 
    'Hambantota'
  ];

  const htmlTable = `
  <div id="list"><table class="main_h"><tbody><tr id="head_nh"><td>Company</td><td>Ship Name</td><td>Voyage</td><td>Yoko-<br>hama</td><td>Kawa-<br>saki</td><td>Nagoya</td><td>Kobe</td><td>Osaka</td><td>Hakata</td><td>Kanda</td><td>Kisa-<br>razu</td><td>Nakano-<br>seki</td><td>Hitachi-<br>naka</td><td>Jebel Ali</td><td>Karachi</td><td>Port Louis</td><td>Durban</td><td>Dar</td><td>Mombasa</td><td>Maput</td><td>Hambantota</td>        </tr></tbody></table><div class="ship_c"><table class="main">
<tbody><tr class="row" bgcolor="#ffffff" nowrap=""><td>NYK</td><td>AQUARIUS LEADER</td><td>062</td><td>Dec<br>20</td><td>-</td><td>Dec<br>19</td><td>Dec<br>23</td><td>Dec<br>24</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>Jan<br>18</td><td>Jan<br>25</td><td>Jan<br>27</td><td>-</td><td>-</td></tr>
<tr class="row" bgcolor="#f3f3f3" nowrap=""><td>SEVEN SEALS CO.,LTD</td><td>VIKING DRIVE</td><td>27</td><td>Dec 23<br><span class="cut_date">Cut:Dec 17</span></td><td>-</td><td>Dec 24<br><span class="cut_date">Cut:Dec 13</span></td><td>Dec<br>26</td><td>Dec 25<br><span class="cut_date">Cut:Dec 16</span></td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>Jan<br>12</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
<tr class="row" bgcolor="#ffffff" nowrap=""><td>NYK</td><td>TRITON LEADER</td><td>105</td><td>Dec<br>24</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>Jan<br>15</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
<tr class="row" bgcolor="#f3f3f3" nowrap=""><td>NYK</td><td>VIRGO LEADER</td><td>063</td><td>-</td><td>-</td><td>Dec<br>25</td><td>Dec<br>26</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>Jan<br>15</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
<tr class="row" bgcolor="#ffffff" nowrap=""><td>THE KEIHIN CO., LTD.</td><td>TARIFA</td><td>146</td><td>Dec<br>27</td><td>-</td><td>Dec<br>28</td><td>Dec<br>29</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>Jan<br>21</td><td>Jan<br>24</td><td>-</td><td>-</td></tr>
<tr class="row" bgcolor="#f3f3f3" nowrap=""><td>SEVEN SEALS CO.,LTD(INTEROCEAN)</td><td>SIERRA NEVADA HIGHWAY</td><td>173</td><td>Jan<br>6</td><td>-</td><td>Jan<br>5</td><td>Jan<br>9</td><td>Jan<br>8</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>Feb<br>10</td><td>Feb<br>11</td><td>-</td><td>-</td></tr>
<tr class="row" bgcolor="#ffffff" nowrap=""><td>SEVEN SEALS CO.,LTD</td><td>SIERRA NEVADA HIGHWAY</td><td>173</td><td>Jan<br>6</td><td>-</td><td>Jan<br>5</td><td>Jan<br>9</td><td>Jan<br>8</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>Feb<br>10</td><td>Feb<br>11</td><td>-</td><td>-</td></tr>
<tr class="row" bgcolor="#f3f3f3" nowrap=""><td>MOL</td><td>PARADISE ACE</td><td>0156A</td><td>Jan<br>13</td><td>-</td><td>Jan<br>12</td><td>Jan<br>16</td><td>-</td><td>-</td><td>-</td><td>Jan<br>14</td><td>Jan<br>17</td><td>-</td><td>-</td><td>-</td><td>Feb<br>1</td><td>Feb<br>7</td><td>Feb<br>14</td><td>Feb<br>16</td><td>Feb<br>8</td><td>-</td></tr>
<tr class="row" bgcolor="#ffffff" nowrap=""><td>NYK</td><td>GOLIATH LEADER</td><td>119</td><td>Jan<br>15</td><td>-</td><td>Jan<br>20</td><td>Jan<br>17</td><td>Jan<br>18</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>Feb<br>22</td><td>Feb<br>15</td><td>Feb<br>13</td><td>-</td><td>-</td></tr>
<tr class="row" bgcolor="#f3f3f3" nowrap=""><td>HOEGH</td><td>GRAND DAHLIA</td><td>4</td><td>Jan<br>16</td><td>-</td><td>-</td><td>-</td><td>Jan<br>14</td><td>-</td><td>-</td><td>-</td><td>-</td><td>Jan<br>17</td><td>-</td><td>-</td><td>-</td><td>Feb<br>24</td><td>Feb<br>17</td><td>Feb<br>15</td><td>Feb<br>22</td><td>-</td></tr>
<tr class="row" bgcolor="#ffffff" nowrap=""><td>THE KEIHIN CO., LTD.</td><td>ARABIAN SEA</td><td>031</td><td>Jan<br>19</td><td>-</td><td>Jan<br>20</td><td>Jan<br>21</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>Feb<br>16</td><td>Feb<br>19</td><td>-</td><td>-</td></tr>
<tr class="row" bgcolor="#f3f3f3" nowrap=""><td>MOL(SUN PHOENIX）</td><td>MIRACULOUS ACE</td><td>0134A</td><td>Jan<br>26</td><td>-</td><td>Feb<br>2</td><td>Jan<br>31</td><td>-</td><td>-</td><td>-</td><td>Jan<br>28</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>O</td><td>O</td><td>O</td><td>O</td><td>-</td></tr>
<tr class="row" bgcolor="#ffffff" nowrap=""><td>MOL</td><td>MIRACULOUS ACE</td><td>0134A</td><td>Jan<br>26</td><td>-</td><td>Feb<br>2</td><td>Jan<br>31</td><td>-</td><td>-</td><td>-</td><td>Jan<br>28</td><td>-</td><td>-</td><td>-</td><td>-</td><td>O</td><td>-</td><td>O</td><td>O</td><td>-</td><td>-</td></tr>
<tr class="row" bgcolor="#f3f3f3" nowrap=""><td>NYK</td><td>PHOENIX LEADER</td><td>056</td><td>-</td><td>-</td><td>Jan<br>27</td><td>Jan<br>29</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>Feb<br>19</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
<tr class="row" bgcolor="#ffffff" nowrap=""><td>THE KEIHIN CO., LTD.</td><td>TREASURE</td><td>062</td><td>Feb<br>3</td><td>-</td><td>Feb<br>4</td><td>Feb<br>5</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>Mar<br>14</td><td>Mar<br>6</td><td>Mar<br>8</td><td>-</td><td>-</td></tr>
<tr class="row" bgcolor="#f3f3f3" nowrap=""><td>NYK</td><td>PROMETHEUS LEADER</td><td>067</td><td>Feb<br>6</td><td>-</td><td>Feb<br>7</td><td>Feb<br>8</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>Mar<br>11</td><td>Mar<br>4</td><td>Mar<br>2</td><td>-</td><td>-</td></tr>
<tr class="row" bgcolor="#ffffff" nowrap=""><td>SEVEN SEALS CO.,LTD</td><td>AMERICAN HIGHWAY</td><td>220</td><td>Feb<br>6</td><td>-</td><td>Feb<br>7</td><td>Feb<br>9</td><td>Feb<br>8</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>Mar<br>10</td><td>Mar<br>12</td><td>-</td><td>-</td></tr>
<tr class="row" bgcolor="#f3f3f3" nowrap=""><td>SEVEN SEALS CO.,LTD(INTEROCEAN)</td><td>AMERICAN HIGHWAY</td><td>220</td><td>Feb<br>6</td><td>-</td><td>Feb<br>7</td><td>Feb<br>9</td><td>Feb<br>8</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>Mar<br>11</td><td>Mar<br>13</td><td>-</td><td>-</td></tr>
<tr class="row" bgcolor="#ffffff" nowrap=""><td>NYK</td><td>TAURUS LEADER</td><td>078</td><td>Feb<br>11</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>Mar<br>5</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
<tr class="row" bgcolor="#f3f3f3" nowrap=""><td>MOL</td><td>PRIME ACE</td><td>0088A</td><td>Feb<br>12</td><td>-</td><td>Feb<br>11</td><td>Feb<br>15</td><td>-</td><td>-</td><td>-</td><td>Feb<br>13</td><td>Feb<br>16</td><td>-</td><td>-</td><td>-</td><td>Mar<br>2</td><td>Mar<br>7</td><td>Mar<br>13</td><td>Mar<br>17</td><td>Mar<br>9</td><td>-</td></tr>
<tr class="row" bgcolor="#ffffff" nowrap=""><td>NYK</td><td>JUPITER LEADER</td><td>069</td><td>-</td><td>-</td><td>-</td><td>-</td><td>Feb<br>13</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>Mar<br>16</td><td>Mar<br>9</td><td>Mar<br>7</td><td>-</td><td>-</td></tr>
<tr class="row" bgcolor="#f3f3f3" nowrap=""><td>NYK</td><td>HEROIC LEADER</td><td>094</td><td>Feb<br>15</td><td>-</td><td>Feb<br>16</td><td>Feb<br>20</td><td>Feb<br>17</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>Mar<br>22</td><td>Mar<br>16</td><td>Mar<br>14</td><td>-</td><td>-</td></tr>
<tr class="row" bgcolor="#ffffff" nowrap=""><td>HOEGH</td><td>HOEGH YOKOHAMA</td><td>134</td><td>Feb<br>16</td><td>-</td><td>-</td><td>-</td><td>Feb<br>18</td><td>-</td><td>-</td><td>-</td><td>-</td><td>Feb<br>15</td><td>-</td><td>-</td><td>-</td><td>Mar<br>20</td><td>Mar<br>19</td><td>Mar<br>17</td><td>Mar<br>24</td><td>-</td></tr>
<tr class="row" bgcolor="#f3f3f3" nowrap=""><td>MOL(SUN PHOENIX）</td><td>MARTORELL</td><td>0173A</td><td>Feb<br>17</td><td>-</td><td>Feb<br>16</td><td>-</td><td>Feb<br>15</td><td>-</td><td>-</td><td>Feb<br>18</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>Mar<br>7</td><td>-</td><td>-</td><td>-</td></tr>
<tr class="row" bgcolor="#ffffff" nowrap=""><td>NYK</td><td>OCEANUS LEADER</td><td>090</td><td>-</td><td>-</td><td>Feb<br>17</td><td>Feb<br>19</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>Mar<br>12</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
<tr class="row" bgcolor="#f3f3f3" nowrap=""><td>THE KEIHIN CO., LTD.</td><td>PAGANELLA</td><td></td><td>Feb<br>18</td><td>-</td><td>Feb<br>19</td><td>Feb<br>20</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>Mar<br>16</td><td>Mar<br>18</td><td>-</td><td>-</td></tr>
<tr class="row" bgcolor="#ffffff" nowrap=""><td>THE KEIHIN CO., LTD.</td><td>MORNING CAPO</td><td></td><td>Feb<br>26</td><td>-</td><td>Feb<br>27</td><td>Feb<br>28</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>Apr<br>6</td><td>Mar<br>28</td><td>Mar<br>30</td><td>-</td><td>-</td></tr>
<tr class="row" bgcolor="#f3f3f3" nowrap=""><td>SEVEN SEALS CO.,LTD</td><td>SL-SEALS FEB</td><td>end</td><td>O</td><td>-</td><td>O</td><td>O</td><td>O</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>O</td><td>O</td><td>-</td><td>-</td></tr>
<tr class="row" bgcolor="#ffffff" nowrap=""><td>SEVEN SEALS CO.,LTD(INTEROCEAN)</td><td>IN-SEALS FEB</td><td>end</td><td>O</td><td>-</td><td>O</td><td>O</td><td>O</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>O</td><td>O</td><td>-</td><td>-</td></tr>
		</tbody></table></div></div>`;

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
          stops: columns.slice(3).reduce((acc, column, index) => {
            const value = cells[index + 3].textContent.trim();
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

export default AfricaRoroShippingTable;