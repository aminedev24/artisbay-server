import React, { useEffect, useState } from 'react';
import { useLocation , useNavigate} from 'react-router-dom';

// Custom hook to parse URL query parameters
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const UserEmailVerification = () => {
  const query = useQuery();
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  
  const apiUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost/artisbay-server/server'
    : '/server';
  
  useEffect(() => {
    const token = query.get('token');
    if (token) {
      // Call the PHP verification endpoint with the token
      fetch(`${apiUrl}/getUserEmailVerification.php?token=${token}`, {
      method: 'GET',
      credentials: 'include', // Use this if your session is cookie-based
    })
        .then(res => res.json())
        .then(data => {
           setStatus(data.status);
           setMessage(data.message);
           setTimeout(() => {
            navigate('/profile');
            window.location.reload(); // Reload the page

          }, 3000);
           
        })
        .catch(err => {
           setStatus("error");
           setMessage("Verification failed due to an unexpected error.");
        });
    } else {
      setStatus("error");
      setMessage("No token provided.");
    }
  }, [query]);
  
  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h1>Email Verification</h1>
      {status ? (
        <div>
          <p>Status: <strong>{status}</strong></p>
          <p>{message}</p>
        </div>
      ) : (
        <p>Verifying your email...</p>
      )}
    </div>
  );
};

export default UserEmailVerification;
