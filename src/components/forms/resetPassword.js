﻿import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../css/forms/forgotPassword.css';

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [passwordCriteriaMet, setPasswordCriteriaMet] = useState({ criteriaMet: 0, totalCriteria: 5 });

  // Extract token from URL using BrowserRouter's location
  const token = location.pathname.split('/')[2];

  const evaluatePasswordStrength = (password) => {
    let strength = 'Weak';
    const lengthCriteria = password.length >= 8;
    const numberCriteria = /[0-9]/.test(password);
    const specialCharCriteria = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const uppercaseCriteria = /[A-Z]/.test(password);
    const lowercaseCriteria = /[a-z]/.test(password);

    const criteriaMet = [lengthCriteria, numberCriteria, specialCharCriteria, uppercaseCriteria, lowercaseCriteria]
      .filter(Boolean).length;

    if (criteriaMet >= 4) {
      strength = 'Strong';
    } else if (criteriaMet === 3) {
      strength = 'Medium';
    }

    return { strength, criteriaMet, totalCriteria: 5 };
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    const { strength, criteriaMet, totalCriteria } = evaluatePasswordStrength(newPassword);
    setPassword(newPassword);
    setPasswordStrength(strength);
    setPasswordCriteriaMet({ criteriaMet, totalCriteria });
  };

  const apiUrl = process.env.NODE_ENV === 'development'
    ? 'http://localhost/artisbay-backup/server'
    : '/server';

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (passwordStrength === 'Weak') {
      setMessage('Your password is too weak. Please choose a stronger password.');
      setMessageType('error');
      return;
    }

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      setMessageType('error');
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/reset_password.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();

      setMessage(data.message);
      setMessageType(data.status);

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      setMessage('Something went wrong. Please try again.');
      setMessageType('error');
    }
  };

  return (
    <div className="reset-password-container">
      <form onSubmit={handleResetPassword}>
        <img src={`${process.env.PUBLIC_URL}/images/logo3new.png`} alt="Logo" className="logo-form" />
        <h2>Reset Password</h2>

        <div className='input-group password'>
          <input
            type="password"
            placeholder="Enter new password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <label htmlFor='password'>
            Password <span className="required">*</span>
          </label>
          {password && <div className="password-strength">Strength: {passwordStrength}</div>}
        </div>

        <div className="password-criteria">
          <ul>
            <li className={password.length >= 8 ? "green" : "red"}>At least 8 characters</li>
            <li className={/[A-Z]/.test(password) ? "green" : "red"}>Contains an uppercase letter</li>
            <li className={/[a-z]/.test(password) ? "green" : "red"}>Contains a lowercase letter</li>
            <li className={/[0-9]/.test(password) ? "green" : "red"}>Contains a number</li>
            <li className={/[!@#$%^&*(),.?":{}|<>]/.test(password) ? "green" : "red"}>Contains a special character</li>
          </ul>
        </div>

        <div className='input-group password confirm-password'>
          <input
            type="password"
            placeholder="Confirm new password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <label htmlFor='confirmPassword'>
            Confirm Password <span className="required">*</span>
          </label>
        </div>

        <button type="submit">Reset Password</button>
        {message && <p className={`message ${messageType}`}>{message}</p>}
      </form>
    </div>
  );
};

export default ResetPassword;
