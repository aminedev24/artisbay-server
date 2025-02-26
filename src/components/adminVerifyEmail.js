import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

// Helper to get query parameters from the URL
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const AdminVerifyEmail = () => {
  const query = useQuery();
  const [message, setMessage] = useState('Verifying your email, please wait...');
  // Define your API URL (adjust as needed)
  const apiUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost/artisbay-server/server'
      : '/server';

  useEffect(() => {
    // Get the token from the URL query parameters
    const token = query.get('token');
    if (!token) {
      setMessage('Invalid verification link.');
      return;
    }

    // Call your backend endpoint to verify the token
    fetch(`${apiUrl}/adminVerifyEmail.php?token=${token}`, {
      method: 'GET',
      credentials: 'include', // if you need cookies
    })
      .then((response) => response.json())
      .then((data) => {
        // Assuming your PHP endpoint returns a JSON response with a status and message
        if (data.status === 'success') {
          setMessage('Your email has been successfully verified! You can now log in.');
          // Redirect after a delay using window.location.href
          setTimeout(() => {
            window.location.href = '/#/login';
          }, 3000);
        } else {
          setMessage(data.message || 'Verification failed. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Verification error:', error);
        setMessage('An error occurred during verification. Please try again later.');
      });
  }, [query, apiUrl]);

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Email Verification</h1>
      <p>{message}</p>
    </div>
  );
};

export default AdminVerifyEmail;
