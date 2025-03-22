import React, { useState, useEffect } from 'react';
import '../../css/components/accountancyForm.css';
import Tooltip from '../utilities/toolTip';
import Modal from '../common/alertModal';

const AccountancyForm = () => {
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [remitter, setRemitter] = useState('');
  const [country, setCountry] = useState('');
  const [consumptionType, setConsumptionType] = useState('car');
  const [consumptionValue, setConsumptionValue] = useState('');
  const [rate, setRate] = useState('');
  const [swiftDetails, setSwiftDetails] = useState('');
  const [note, setNote] = useState('');
  const [staff, setStaff] = useState('');
  const [currencies, setCurrencies] = useState(['JPY', 'EUR', 'USD']);
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [newUserName, setNewUserName] = useState('');
  const [showSwiftNote, setShowSwiftNote] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [modalType, setModalType] = useState("");  // Could be 'alert', 'confirmation', or 'clear_all'
  

  const apiUrl = process.env.NODE_ENV === 'development' ? 'http://localhost/artisbay-server/server' : '/server';
  
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const showAlert = (message, type = "alert") => {
    setTimeout(() => {
      setModalMessage(message);
      setModalType(type);
      setShowModal(true);
    }, 1000); // Delay for 1 second
  };

  useEffect(() => {
    fetch(`${apiUrl}/getUsers.php`)
      .then(response => response.json())
      .then(data => {
        setUsers(data.users);
        if (data.users.length > 0) {
          setSelectedUser(data.users[0].full_name.toString());
        } else {
          setSelectedUser('new');
        }
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      date,
      amount,
      remitter,
      country,
      consumptionType,
      consumptionValue,
      selectedCurrency,
      rate,
      swiftDetails,
      note,
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
      //alert(result.message);
    } catch (error) {
      console.error('Error submitting form:', error);
      showAlert('An error occurred while submitting the form.');
      //alert('An error occurred while submitting the form.');
    }
  };

  const resetForm = () => {
    setDate(''); setAmount(''); setRemitter(''); setCountry('');
    setConsumptionType('car'); setConsumptionValue(''); setRate('');
    setSwiftDetails(''); setNote(''); setStaff('');
    setSelectedCurrency(currencies[0]); 
    setSelectedUser(users.length ? users[0].full_name : 'new'); 
    setNewUserName('');
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
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </label>

        <label>
          Amount:
          <input type="text" value={amount.toLocaleString()} 
            onChange={(e) => {
              const rawValue = e.target.value.replace(/,/g, ""); // Remove commas
              if (rawValue === "" || isNaN(rawValue)) {
                setAmount(""); // Allow empty input
              } else {
                setAmount(Number(rawValue)); // Store as number
              }
            }}
          required />
        </label>

        <label>
          Currency:
          <select value={selectedCurrency} onChange={(e) => setSelectedCurrency(e.target.value)} required>
            {currencies.map((currency, index) => (
              <option key={index} value={currency}>{currency}</option>
            ))}
          </select>
        </label>

        <label>
          Rate:
          <input type="text" value={rate.toLocaleString()} 
              onChange={(e) => {
                const rawValue = e.target.value.replace(/,/g, ""); // Remove commas
                if (rawValue === "" || isNaN(rawValue)) {
                  setRate(""); // Allow empty input
                } else {
                  setRate(Number(rawValue)); // Store as number
                }
              }}
            required />
        </label>

        <label>
          Swift Details:{<Tooltip message="This might appear on the SWIFT payment as the description and nature of the payment" />}
          <input type='text' value={swiftDetails} onChange={(e) => setSwiftDetails(e.target.value)} required />


        </label>

        <label>
          Staff:
          <input type="text" value={staff} onChange={(e) => setStaff(e.target.value)} required />
        </label>

        <label>
          Remitter:
          <input type="text" value={remitter} onChange={(e) => setRemitter(e.target.value)} required />
        </label>

        <label>
          Country:
          <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} required />
        </label>

        <label>
          Consumption Type:
          <select value={consumptionType} onChange={(e) => setConsumptionType(e.target.value)}>
            <option value="car">Car</option>
            <option value="guaranty">Guaranty</option>
            <option value="extra">Extra Guaranty</option>
          </select>
        </label>

        <label>
          {consumptionType === "car"
            ? "Stock ID"
            : consumptionType === "guaranty"
            ? "guaranty"
            : "Extra Guaranty"}
          :
          <input
            type="text"
            value={consumptionValue.toLocaleString()}
            onChange={(e) => {
              const rawValue = e.target.value.replace(/,/g, ""); // Remove commas
             
              if (consumptionType === "car") {
                setConsumptionValue(rawValue); // Allow text input for "car"
              } else {
                if (rawValue === "" || isNaN(rawValue)) {
                  setConsumptionValue(""); // Allow empty input for numbers
                } else {
                  setConsumptionValue(Number(rawValue)); // Store as number
                }
              }
            }}
            required
          />
        </label>

        
        <label>
          Select User:
          <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)} required>
            {users.map((user) => (
              <option key={user.id} value={user.full_name}>{user.full_name}</option>
            ))}
            <option value="new">Other (New User)</option>
          </select>
        </label>

        {selectedUser === 'new' && (
          <label>
            New User Name:
            <input type="text" value={newUserName} onChange={(e) => setNewUserName(e.target.value)} required />
          </label>
        )}

        <label>
          Note:
          <textarea value={note} onChange={(e) => setNote(e.target.value)} />
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AccountancyForm;
