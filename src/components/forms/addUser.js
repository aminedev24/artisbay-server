import React, { useState } from 'react';
import styles from '../../css/forms/AdminAddUser.module.css';

const AdminAddUser = ({ onUserAdded }) => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    country: '',
    phone: '',
    company: '',
    address: ''
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [messageType, setMessageType] = useState('');
  // API URL configuration
  const apiUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost/artisbay-backup/server'
      : '/server';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch(`${apiUrl}/addUser.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok && data.message) {
        setMessage(data.message);
        if (onUserAdded) onUserAdded();
        setFormData({
          full_name: '',
          email: '',
          country: '',
          phone: '',
          company: '',
          address: ''
        });
        setMessageType('success');
      } else {
        setMessage(data.error || 'An error occurred while adding the user.');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Error adding user:', error);
      setMessage('An error occurred while adding the user.');
    }
    setLoading(false);
  };

  return (
    <div className={'signup-form'}>
    <h2 className={styles.adminAddUserTitle}>Customer Registration</h2>
    {message && <p className={`${styles.adminAddUserMessage} ${messageType}`}>{message}</p>}
    <form className={styles.adminAddUserForm} onSubmit={handleSubmit}>
      {Object.entries(formData).map(([key, value]) => (
        <div className={`input-group `} key={key}>
          <label className={styles.adminAddUserLabel}>{key.replace('_', ' ').toUpperCase()}:</label>
          <input
            className={styles.adminAddUserInput}
            type={key === 'email' ? 'email' : 'text'}
            name={key}
            value={value}
            onChange={handleChange}
            required={key !== 'company'}
          />
        </div>
      ))}
      <button className={styles.adminAddUserButton} type='submit' disabled={loading}>
        {loading ? 'Adding...' : 'Add User'}
      </button>
    </form>
  </div>
  );
};

export default AdminAddUser;
