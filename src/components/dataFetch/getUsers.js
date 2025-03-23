import React, { useState, useEffect } from 'react';
import { useUser } from '../user/userContext'; // adjust the path as needed

const AdminUserList = () => {
  const { setUser } = useUser();
  const [users, setUsers] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [searchName, setSearchName] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [loading, setLoading] = useState(true);

  // API URL configuration
  const apiUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost/artisbay-backup/server'
      : '/server';

  useEffect(() => {
    fetch(`${apiUrl}/getUsers.php`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'success') {
          setUsers(data.users);
        } else {
          console.error('Error fetching users:', data.message);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
        setLoading(false);
      });
  }, [apiUrl]);

  // Function to impersonate a user
  const handleImpersonate = async (userId) => {
    try {
      const response = await fetch(`${apiUrl}/impersonate.php`, {
        method: 'POST',
        credentials: 'include', // Ensures session cookies are sent
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_id: userId })
      });
      const data = await response.json();
      if (response.ok && data.status === 'success') {
        // Update the user context with the impersonated user's details
        setUser(data.user);
        //console.log(data)
        window.open('/profile');

        // Optionally, redirect or update UI accordingly
        //window.location.href = '/'; // or simply let your UI re-render based on context
      } else {
        alert(data.error || data.message);
      }
    } catch (error) {
      console.error('Error during impersonation:', error);
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesId = searchId ? user.id.toString().includes(searchId) : true;
    const matchesName = searchName
      ? user.full_name.toLowerCase().includes(searchName.toLowerCase())
      : true;
    const userDate = user.joined_date ? user.joined_date.substring(0, 10) : '';
    const matchesDate = searchDate ? userDate === searchDate : true;
    return matchesId && matchesName && matchesDate;
  });

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Customers</h1>

      <div 
        className='filter-container' 
        style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}
      >
        <div>
          <label style={{ fontWeight: 'bold' }}>Search by ID: </label>
          <input
            type="text"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="User ID"
            style={{ padding: '5px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>
        <div>
          <label style={{ fontWeight: 'bold' }}>Search by Name: </label>
          <input
            type="text"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="User Name"
            style={{ padding: '5px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>
        <div>
          <label style={{ fontWeight: 'bold' }}>Search by Date: </label>
          <input
            type="date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            style={{ padding: '5px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>
      </div>

      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading users...</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table className='users-table' style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f0f0f0' }}>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>ID</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Full Name</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Email</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Phone number</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Country</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Address</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Date of Registration</th>
                {<th style={{ padding: '10px', border: '1px solid #ddd' }}>Action</th>}
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>{user.id}</td>
                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.full_name}</td>
                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.email}</td>
                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.phone}</td>
                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.country}</td>
                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.address}</td>
                    <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>
                      {user.joined_date ? user.joined_date.substring(0, 10) : ''}
                    </td>
                    {
                    <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>
                      <button
                        onClick={() => handleImpersonate(user.id)}
                        style={{
                          padding: '5px 10px',
                          cursor: 'pointer',
                          background: 'var(--primary-color)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '5px'
                        }}
                      >
                        Login as user
                      </button>
                    </td>
                  }
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminUserList;
