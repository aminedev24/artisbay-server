import React, { useState, useEffect } from 'react';
import '../css/accountancyForm.css';

const AccountancyForm = () => {
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [remitter, setRemitter] = useState('');
  const [country, setCountry] = useState('');
  const [consumptionType, setConsumptionType] = useState('car');
  const [consumptionValue, setConsumptionValue] = useState('');
  const [currencies, setCurrencies] = useState(['JPY', 'EUR', 'USD']);
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  // User selection state
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [newUserName, setNewUserName] = useState('');
      // API URL setup
      const apiUrl =
      process.env.NODE_ENV === 'development'
          ? 'http://localhost/artisbay-server/server'
          : '/server';

  // Fetch users on mount
  useEffect(() => {
    fetch(`${apiUrl}/getUsers.php`)
      .then(response => response.json())
      .then(data => {
        setUsers(data.users);
        console.log(data.users)
        if (data.users.length > 0) {
          // Default to the first user (convert to string for select element)
          setSelectedUser(data.users[0].full_name.toString());
        } else {
          // If no users available, default to "new"
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
      // When "new" is selected, send null for user_id and the new name in new_user.
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
      alert(result.message);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the form.');
    }
  };

  const getConsumptionLabel = () => {
    if (consumptionType === 'car') return 'Stock ID';
    if (consumptionType === 'guaranty') return 'Guaranty';
    if (consumptionType === 'extra') return 'Extra Guaranty';
    return 'Consumption';
  };

  return (
    <div className="accountancy-container">
      <h1>Income</h1>
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
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
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
          {getConsumptionLabel()}:
          <input
            type="text"
            value={consumptionValue}
            onChange={(e) => setConsumptionValue(e.target.value)}
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

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AccountancyForm;
