import React, { useState, useEffect } from 'react';

const AdminUserList = () => {
  const [users, setUsers] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [searchName, setSearchName] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [loading, setLoading] = useState(true);

  // API URL configuration
  const apiUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost/artisbay-server/server'
      : '/server';

  // Fetch user data when component mounts
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

  // Filter users based on search criteria
  const filteredUsers = users.filter((user) => {
    const matchesId = searchId ? user.id.toString().includes(searchId) : true;
    const matchesName = searchName
      ? user.full_name.toLowerCase().includes(searchName.toLowerCase())
      : true;
    // Extract the date portion (YYYY-MM-DD) from the registration_date
    const userDate = user.joined_date ? user.joined_date.substring(0, 10) : '';
    const matchesDate = searchDate ? userDate === searchDate : true;
    return matchesId && matchesName && matchesDate;
  });

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Admin - User List</h1>

      <div 
        className='filter-container' 
        style={{ 
          marginBottom: '20px', 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '20px',
          flexWrap: 'wrap'
        }}
      >
        <div>
          <label style={{ fontWeight: 'bold' }}>Search by ID: </label>
          <input
            type="text"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="User ID"
            style={{
              padding: '5px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
        </div>
        <div>
          <label style={{ fontWeight: 'bold' }}>Search by Name: </label>
          <input
            type="text"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="User Name"
            style={{
              padding: '5px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
        </div>
        <div>
          <label style={{ fontWeight: 'bold' }}>Search by Date: </label>
          <input
            type="date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            style={{
              padding: '5px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
        </div>
      </div>

      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading users...</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f0f0f0' }}>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>ID</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Full Name</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Email</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Date of Registration</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>{user.id}</td>
                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.full_name}</td>
                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.email}</td>
                    <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>
                      {user.joined_date ? user.joined_date.substring(0, 10) : ''}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>
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
