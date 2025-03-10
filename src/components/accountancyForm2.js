import React, { useState, useEffect } from 'react';
import '../css/accountancyForm.css';
import Tooltip from './toolTip';
import Modal from './alertModal';

const AccountancyForm = () => {
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [remitter, setRemitter] = useState('');
  const [country, setCountry] = useState('');
  const [consumptionType, setConsumptionType] = useState('car');
  const [consumptionValue, setConsumptionValue] = useState('');
  const [swiftDetails, setSwiftDetails] = useState('');
  const [note, setNote] = useState('');
  const [staff, setStaff] = useState('');
  const [currencies] = useState(['JPY', 'USD', 'EUR']);
  // "selectedCurrency" represents the currency in which the amount is entered.
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [newUserName, setNewUserName] = useState('');
  const [showSwiftNote, setShowSwiftNote] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("");  // e.g., 'alert', 'confirmation', etc.

  const [bankFees, setBankFees] = useState(0);
  const [editingCurrency, setEditingCurrency] = useState(null);
  const [conversionEdits, setConversionEdits] = useState({});

  const apiUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost/artisbay-server/server'
      : '/server';

  // Conversion rates with JPY as the base currency
  const [conversionRates, setConversionRates] = useState({
    JPY: 1,
    USD: 147.12,
    EUR: 159.83,
  });

  // State for editing conversion rates
  const [editingRate, setEditingRate] = useState(null);
  const [rateEdits, setRateEdits] = useState({});

  // Function to compute converted value for a target currency.
  // The formula is: amount * (conversionRates[selectedCurrency] / conversionRates[targetCurrency])
  const getConvertedAmount = (targetCurrency) => {
    if (!amount) return 0;
    return amount * (conversionRates[selectedCurrency] / conversionRates[targetCurrency]);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const showAlert = (message, type = "alert") => {
    setTimeout(() => {
      setModalMessage(message);
      setModalType(type);
      setShowModal(true);
    }, 1000);
  };

  useEffect(() => {
    fetch(`${apiUrl}/getUsers.php`)
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.users);
        if (data.users.length > 0) {
          setSelectedUser(data.users[0].full_name.toString());
        } else {
          setSelectedUser('new');
        }
      })
      .catch((error) => console.error('Error fetching users:', error));
  }, [apiUrl]);

  // On form submission, you might want to include the conversion values.
  // Here, we build an object of conversion values for all currencies other than the selected one.
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const conversions = {};
    currencies.forEach((currency) => {
      if (currency !== selectedCurrency) {
        conversions[currency] =
          conversionEdits[currency] !== undefined
            ? Number(conversionEdits[currency])
            : getConvertedAmount(currency);
      }
    });

    const formData = {
      date,
      amount,
      remitter,
      country,
      consumptionType,
      consumptionValue,
      selectedCurrency,
      conversions, // include conversion values for the other currencies
      swiftDetails,
      note,
      bankFees,
      staff,
      name: selectedUser !== 'new' ? selectedUser : null,
      new_user: selectedUser === 'new' ? newUserName : null,
    };
  
    try {
      const response = await fetch(`${apiUrl}/insertDeposit.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      showAlert(result.message);
      resetForm();
    } catch (error) {
      console.error('Error submitting form:', error);
      showAlert('An error occurred while submitting the form.');
    }
  };
  

  const resetForm = () => {
    setDate('');
    setAmount('');
    setRemitter('');
    setCountry('');
    setConsumptionType('car');
    setConsumptionValue('');
    setSwiftDetails('');
    setNote('');
    setStaff('');
    setSelectedCurrency(currencies[0]);
    setSelectedUser(users.length ? users[0].full_name : 'new');
    setNewUserName('');
  };

// Dynamic number formatting based on the value's magnitude
const formatDynamicNumber = (value) => {
  let fractionDigits;
  if (value < 0.01) {
    fractionDigits = 4;
  } else if (value < 1) {
    fractionDigits = 3;
  } else if (value < 10) {
    fractionDigits = 2;
  } else if (value < 100) {
    fractionDigits = 2;
  } else if (value < 1000) {
    fractionDigits = 1;
  } else {
    fractionDigits = 0;
  }
  return new Intl.NumberFormat(undefined, {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value);
};




  return (
    <div className="accountancy-container">
      <h1>Income</h1>
      {showModal && (
        <Modal
          message={modalMessage}
          onClose={handleCloseModal}
          type={modalType}
        />
      )}
      <form onSubmit={handleSubmit} className="accountancyForm">
        <label>
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </label>

        <label>
          Amount:
          <input
            type="text"
            value={amount.toLocaleString()}
            onChange={(e) => {
              const rawValue = e.target.value.replace(/,/g, '');
              if (rawValue === '' || isNaN(rawValue)) {
                setAmount('');
              } else {
                setAmount(Number(rawValue));
              }
            }}
            required
          />
        </label>

        <label>
          Currency:
          <select
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value)}
            required
          >
            {currencies.map((currency, index) => (
              <option key={index} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </label>

        <label>
          Bank Fees:
          <input
            type="text"
            value={bankFees.toLocaleString()}
            onChange={(e) => {
              const rawValue = e.target.value.replace(/,/g, '');
              if (rawValue === '' || isNaN(rawValue)) {
                setBankFees('');
              } else {
                setBankFees(Number(rawValue));
              }
            }}
            required
          />
        </label>

        <div className="conversion-container">
        <label htmlFor='conversion-item'>Conversion Rate:</label>
          {currencies
            .filter((currency) => currency !== selectedCurrency)
            .map((targetCurrency, idx) => (
              <>
              
              <div key={idx} className="conversion-item">
                <strong>{targetCurrency}:</strong>
                
                <div className="conversion-values">
                  {/* Conversion Rate Section */}
                  {editingRate === targetCurrency ? (
                    <>
                      <input
                        type="text"
                        value={rateEdits[targetCurrency]}
                        onChange={(e) =>
                          setRateEdits({
                            ...rateEdits,
                            [targetCurrency]: e.target.value,
                          })
                        }
                        className="rate-edit-input"
                      />
                      <button
                        type="button"
                        className="conversion-edit-btn save"
                        onClick={() => {
                          const newRate = parseFloat(rateEdits[targetCurrency]);
                          if (!isNaN(newRate)) {
                            setConversionRates((prevRates) => ({
                              ...prevRates,
                              [targetCurrency]: newRate,
                            }));
                          }
                          setEditingRate(null);
                        }}
                      >
                        Save Rate
                      </button>
                      <button
                        type="button"
                        className="conversion-edit-btn cancel"
                        onClick={() => {
                          setEditingRate(null);
                          setRateEdits((prev) => {
                            const newEdits = { ...prev };
                            delete newEdits[targetCurrency];
                            return newEdits;
                          });
                        }}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <span>{conversionRates[targetCurrency]}</span>
                      <button
                        type="button"
                        className="conversion-edit-btn"
                        onClick={() => {
                          setEditingRate(targetCurrency);
                          setRateEdits({
                            ...rateEdits,
                            [targetCurrency]: conversionRates[targetCurrency].toString(),
                          });
                        }}
                      >
                        Edit Rate
                      </button>
                    </>
                  )}
                </div>
              </div>

              </>
            ))}
        </div>

        <div className="conversion-container">
        <label htmlFor='conversion-item'>Conversion Value:</label>
          {currencies
            .filter((currency) => currency !== selectedCurrency)
            .map((targetCurrency, idx) => (
              <div key={idx} className="conversion-item">
                <strong>{targetCurrency}:</strong>
                <div className="conversion-values">
                  {/* Conversion Value Section */}
                  {editingCurrency === targetCurrency ? (
                    <>
                      <input
                        type="text"
                        value={conversionEdits[targetCurrency]}
                        onChange={(e) =>
                          setConversionEdits({
                            ...conversionEdits,
                            [targetCurrency]: e.target.value,
                          })
                        }
                        className="conversion-edit-input"
                      />
                      <button
                        type="button"
                        className="conversion-edit-btn save"
                        onClick={() => setEditingCurrency(null)}
                      >
                        Save Value
                      </button>
                      <button
                        type="button"
                        className="conversion-edit-btn cancel"
                        onClick={() => {
                          setEditingCurrency(null);
                          setConversionEdits((prev) => {
                            const newEdits = { ...prev };
                            delete newEdits[targetCurrency];
                            return newEdits;
                          });
                        }}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <span>
                        {conversionEdits[targetCurrency] !== undefined
                          ? formatDynamicNumber(Number(conversionEdits[targetCurrency]))
                          : formatDynamicNumber(getConvertedAmount(targetCurrency))}
                      </span>
                      <button
                        type="button"
                        className="conversion-edit-btn"
                        onClick={() => {
                          setEditingCurrency(targetCurrency);
                          // Use toFixed(2) for editing if you want two decimals by default.
                          setConversionEdits({
                            ...conversionEdits,
                            [targetCurrency]: getConvertedAmount(targetCurrency).toFixed(2),
                          });
                        }}
                      >
                        Edit Value
                      </button>
                    </>
                  )}
                </div>
                
              </div>
            ))}
        </div>


        <label>
          Swift Details:
          <Tooltip message="This might appear on the SWIFT payment as the description and nature of the payment" />
          <input
            type="text"
            value={swiftDetails}
            onChange={(e) => setSwiftDetails(e.target.value)}
            required
          />
        </label>

        <label>
          Staff:
          <input
            type="text"
            value={staff}
            onChange={(e) => setStaff(e.target.value)}
            required
          />
        </label>

        <label>
          Remitter:
          <input
            type="text"
            value={remitter}
            onChange={(e) => setRemitter(e.target.value)}
            required
          />
        </label>

        <label>
          Country:
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </label>

        <label>
          Consumption Type:
          <select
            value={consumptionType}
            onChange={(e) => setConsumptionType(e.target.value)}
          >
            <option value="car">Car</option>
            <option value="guaranty">Guaranty</option>
            <option value="extra">Extra Guaranty</option>
          </select>
        </label>

        <label>
          {consumptionType === 'car'
            ? 'Stock ID'
            : consumptionType === 'guaranty'
            ? 'Guaranty'
            : 'Extra Guaranty'}
          :
          <input
            type="text"
            value={consumptionValue.toLocaleString()}
            onChange={(e) => {
              const rawValue = e.target.value.replace(/,/g, '');
              if (consumptionType === 'car') {
                setConsumptionValue(rawValue);
              } else {
                if (rawValue === '' || isNaN(rawValue)) {
                  setConsumptionValue('');
                } else {
                  setConsumptionValue(Number(rawValue));
                }
              }
            }}
            required
          />
        </label>

        <label>
          Select User:
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            required
          >
            {users.map((user) => (
              <option key={user.id} value={user.full_name}>
                {user.full_name}
              </option>
            ))}
            <option value="new">Other (New User)</option>
          </select>
        </label>

        {selectedUser === 'new' && (
          <label>
            New User Name:
            <input
              type="text"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
              required
            />
          </label>
        )}

        <label>
          Note:
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AccountancyForm;
