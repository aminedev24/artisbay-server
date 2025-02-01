import React, { useState, useEffect } from 'react';

const AfricaShippingTable = () => {
  const [shippingData, setShippingData] = useState([]);
  const [error, setError] = useState(null);

  const columns = [
    'Company', 'Ship Name', 'Voyage', 'Yokohama', 'Kawasaki', 'Nagoya', 'Kobe', 
    'Osaka', 'Hakata', 'Kanda', 'Kisarazu', 'Nakanoseki', 'Hitachinaka', 
    'Jebel Ali', 'Karachi', 'Port Louis', 'Durban', 'Dar', 'Mombasa', 'Maput', 
    'Hambantota'
  ];

  const htmlTable =`
  <div id="list"><table class="main_h"><tbody><tr id="head_nh"><td>Company</td><td>Ship Name</td><td>Voyage</td><td>Yoko-<br>hama</td><td>Nagoya</td><td>Kobe</td><td>Osaka</td><td>Tokyo</td><td>Hakata</td><td>Hitachi-<br>naka</td><td>Mombasa</td><td>Dar Es Salaam</td><td>Port Louis</td><td>Matadi</td><td>Walvis Bay</td><td>Nacala</td><td>Maputo</td><td>Durban</td><td>Berbera</td><td>Beira</td>        </tr></tbody></table><div class="ship_c"><table class="main">
<tbody><tr class="row" bgcolor="#ffffff" nowrap=""><td>MSC</td><td>MSC BASEL V</td><td>HI452A</td><td>Dec<br>20</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>O</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
<tr class="row" bgcolor="#f3f3f3" nowrap=""><td>MSC</td><td>MSC MANHATTAN V</td><td>HI450A</td><td>Dec<br>20</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>O</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
<tr class="row" bgcolor="#ffffff" nowrap=""><td>MSC</td><td>MSC ULSAN III</td><td>HG451A</td><td>-</td><td>-</td><td>Dec<br>21</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>O</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
<tr class="row" bgcolor="#f3f3f3" nowrap=""><td>MSC</td><td>MSC LILOU III</td><td>HG451A</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>Dec<br>21</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>O</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
<tr class="row" bgcolor="#ffffff" nowrap=""><td>MSC</td><td>MSC PRECISION V</td><td>HW449R</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>Dec<br>21</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>O</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
<tr class="row" bgcolor="#f3f3f3" nowrap=""><td>MSC</td><td>MSC DURBAN IV</td><td>HI452A</td><td>Dec<br>23</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>O</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
<tr class="row" bgcolor="#ffffff" nowrap=""><td>MSC</td><td>MSC LILOU III</td><td>HG452A</td><td>-</td><td>-</td><td>Dec<br>25</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>O</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
<tr class="row" bgcolor="#f3f3f3" nowrap=""><td>MSC</td><td>MSC SHAHAR IV</td><td>HI452A</td><td>Dec<br>27</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>O</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
<tr class="row" bgcolor="#ffffff" nowrap=""><td>MSC</td><td>MSC DURBAN IV</td><td>HI501A</td><td>Dec<br>31</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>O</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
<tr class="row" bgcolor="#f3f3f3" nowrap=""><td>MSC</td><td>MSC ADU V</td><td>HI503A</td><td>Jan<br>14</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>O</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
<tr class="row" bgcolor="#ffffff" nowrap=""><td>MSC</td><td>MSC LILOU III</td><td>HG503A</td><td>-</td><td>-</td><td>Jan<br>15</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>O</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
<tr class="row" bgcolor="#f3f3f3" nowrap=""><td>MAERSK</td><td>IRENES RALLY</td><td>504S</td><td>Jan<br>21</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>O</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
<tr class="row" bgcolor="#ffffff" nowrap=""><td>MSC</td><td>MSC COLETTE III</td><td>HG504A</td><td>-</td><td>-</td><td>Jan<br>22</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>O</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
<tr class="row" bgcolor="#f3f3f3" nowrap=""><td>MSC</td><td>MSC LILOU III</td><td>HG504A</td><td>-</td><td>-</td><td>Jan<br>22</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>O</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
<tr class="row" bgcolor="#ffffff" nowrap=""><td>MSC</td><td>MSC ADU V</td><td>HI504A</td><td>Jan<br>24</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>O</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
<tr class="row" bgcolor="#f3f3f3" nowrap=""><td>MSC</td><td>MSC SHAULA</td><td>HI505A</td><td>Jan<br>28</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>O</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
<tr class="row" bgcolor="#ffffff" nowrap=""><td>MSC</td><td>MSC ALABAMA III</td><td>HI505A</td><td>Jan<br>28</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>O</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
<tr class="row" bgcolor="#f3f3f3" nowrap=""><td>MSC</td><td>MSC LILOU III</td><td>HG505A</td><td>-</td><td>-</td><td>Jan<br>29</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>O</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
<tr class="row" bgcolor="#ffffff" nowrap=""><td>MSC</td><td>CAPTAIN THANASIS I</td><td>HG505A</td><td>-</td><td>-</td><td>Feb<br>1</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>O</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
<tr class="row" bgcolor="#f3f3f3" nowrap=""><td>MSC</td><td>MSC MANHATTAN V</td><td>HI504A</td><td>Feb<br>2</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>O</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
<tr class="row" bgcolor="#ffffff" nowrap=""><td>MSC</td><td>CAPTAIN THANASIS I</td><td>HG506A</td><td>-</td><td>-</td><td>Feb<br>6</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>O</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
<tr class="row" bgcolor="#f3f3f3" nowrap=""><td>MSC</td><td>MSC ADU V</td><td>HI507A</td><td>Feb<br>11</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>O</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
<tr class="row" bgcolor="#ffffff" nowrap=""><td>MSC</td><td>CAPTAIN THANASIS I</td><td>HG507A</td><td>-</td><td>-</td><td>Feb<br>13</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>O</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
		</tbody></table></div></div>`;

  useEffect(() => {
    const parseShippingData = () => {
      try {
        // Create a temporary div to parse HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlTable;
        
        // Find all rows with class 'row'
        const rows = tempDiv.querySelectorAll('tr.row');

        if (rows.length === 0) {
          throw new Error('No rows found in the table');
        }

        const parsedData = Array.from(rows).map(row => {
          const cells = row.querySelectorAll('td');
          
          // Verify we have enough cells
          if (cells.length < 3) {
            console.warn('Row with insufficient cells:', row);
            return null;
          }

          return {
            company: cells[0]?.textContent || '',
            shipName: cells[1]?.textContent || '',
            voyage: cells[2]?.textContent || '',
            stops: columns.slice(3).reduce((acc, column, index) => {
              // Adjust index to account for first 3 columns
              const cellValue = cells[index + 3]?.textContent?.trim() || '-';
              if (cellValue !== '-') acc[column] = cellValue;
              return acc;
            }, {})
          };
        }).filter(entry => entry !== null); // Remove any null entries

        setShippingData(parsedData);
      } catch (err) {
        console.error('Error parsing shipping data:', err);
        setError(err.message);
      }
    };

    parseShippingData();
  }, []);

  if (error) {
    return <div>Error loading shipping data: {error}</div>;
  }

  return (
    <div className="shipping-table-container">
      <table className="shipping-table con">
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

export default AfricaShippingTable;