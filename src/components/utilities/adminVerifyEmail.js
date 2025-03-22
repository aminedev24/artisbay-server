import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Helper to get query parameters from the URL
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const AdminVerifyEmail = () => {
  const [user, setUser] = useState(null); // No user data in cookies
  const query = useQuery();
  const navigate = useNavigate();
  const [message, setMessage] = useState('Verifying your email, please wait...');
  const apiUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost/artisbay-backup/server'
      : '/server';

  useEffect(() => {
    const token = query.get('token');
    if (!token) {
      setMessage('Invalid verification link.');
      return;
    }

    fetch(`${apiUrl}/adminVerifyEmail.php?token=${token}`, {
      method: 'GET',
      credentials: 'include', // Use this if your session is cookie-based
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success') {
          setMessage('Your email has been verified!');
          // Optionally, update your user context here with data.user
          // For example: setUser(data.user);
          // Redirect to a protected page (e.g., dashboard) after a short delay:
          setTimeout(() => {
            navigate('/');
            window.location.reload(); // Reload the page

          }, 3000);
         
        } else {
          setMessage(data.message || 'Verification failed. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Verification error:', error);
        setMessage('An error occurred during verification. Please try again later.');
      });
  }, [query, apiUrl, navigate]);

  return (
    <div className='verification-wrapper' style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Email Verification</h1>
      <p>{message}</p>
    </div>
  );
};

export default AdminVerifyEmail;
