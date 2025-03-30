import React, { useState, useEffect } from 'react';
import { useUser } from '../user/userContext'; // adjust the path as needed
import AdminAddUser from '../forms/addUser';
import CustomerRegistrationForm from '../forms/addCustomer';
import useCheckScreenSize from '../utilities/screenSize';

const AdminUserList = () => {
  const { setUser } = useUser();
  const [users, setUsers] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [searchName, setSearchName] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isSmallScreen } = useCheckScreenSize();


  // API URL configuration
  const apiUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost/artisbay-backup/server'
      : '/server';

  const fetchUsers = () => {
    setLoading(true);
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
  };

  useEffect(() => {
    fetchUsers();
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
        setUser(data.user);
        window.location.href = '/profile/settings';
      } else {
        alert(data.error || data.message);
      }
    } catch (error) {
      console.error('Error during impersonation:', error);
    }
  };

  // Callback after a user is added successfully
  const handleUserAdded = () => {
    fetchUsers();
    //setIsModalOpen(false);
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

      {/* Filter Inputs */}
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

      {/* Add User Button */}
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <button
          onClick={() => setIsModalOpen(true)}
          style={{
            padding: '10px 20px',
            backgroundColor: 'var(--primary-color)',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Add User
        </button>
      </div>

      {/* Users Table */}
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
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Action</th>
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

      {/* Modal for Adding a User */}
      {isModalOpen && (
        <div className='alert-modal-overlay'>
          <div  style={{
            position: 'relative',
            height: isSmallScreen ? '65dvh': ''
          }}  className='alert-modal-content add-customer'>
            <button style={modalStyles.closeButton} onClick={() => setIsModalOpen(false)}>
              X
            </button>
            <CustomerRegistrationForm onUserAdded={handleUserAdded} />
          </div>
        </div>
      )}
    </div>
  );
};

const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '4px',
    position: 'relative',
    minWidth: '300px'
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    border: 'none',
    background: 'var(--primary-color)',
    fontSize: '16px',
    cursor: 'pointer',
    zIndex: 5
  }
};

export default AdminUserList;
