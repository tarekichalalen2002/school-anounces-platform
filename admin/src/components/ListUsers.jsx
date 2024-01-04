import React, { useState, useEffect } from 'react';
import '../App.css';
import '../scenes/Users/style.css';
import { FaSearch } from 'react-icons/fa';
import profileImage1 from '../assets/Profile-Male-PNG.png';

const sampleUsers = [
    {
      id: 1,
      fullName: 'Wail ninou',
      email: 'wail@estin.dz',
      dateJoining: '2023-01-01',
      profileImage: profileImage1,
    },
    {
      id: 2,
      fullName: 'Amel mamal',
      
     
      email: 'amel@estin.dz',
      dateJoining: '2023-03-01',
      profileImage: profileImage1,
    },
    {
      id: 3,
      fullName: 'asoum sas',
      email: 'amel@estin.dz',
      dateJoining: '2023-03-01',
      profileImage: profileImage1,
    },
    {
      id: 4,
      fullName: 'messi mississoun',
      email: 'amel@estin.dz',
      dateJoining: '2023-03-01',
      profileImage: profileImage1,
    },
  ];
  
  const ListUsers = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectAll, setSelectAll] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [selectedAction, setSelectedAction] = useState('');
    const [users, setUsers] = useState([]);
    const [isAddToRoomHovered, setIsAddToRoomHovered] = useState(false);

    useEffect(() => {
      fetch('http://localhost:5000/api/user')  
        .then(response => response.json())
        .then(data => setUsers(data))
        .catch(error => console.log(error));
    }, []);
    const handleSearch = (e) => {
      setSearchTerm(e.target.value);
    };
    
    const handleDeleteUser = () => {
      // Vérifie si l'action est DELETE et des utilisateurs sont sélectionnés
      if (selectedAction === 'action1' && selectedUsers.length > 0) {
        // Envoie une requête pour supprimer les utilisateurs sélectionnés
        selectedUsers.forEach(userId => {
          fetch(`http://localhost:5000/api/user/${userId}`, {
            method: 'DELETE',
          })
            .then(response => {
              if (response.ok) {
                // Met à jour la liste des utilisateurs après la suppression
                setUsers(users.filter(user => user._id !== userId));
              } else {
                console.error('Erreur lors de la suppression de l\'utilisateur');
              }
            })
            .catch(error => console.error('Erreur réseau:', error));
        });
  
        // Réinitialise la liste des utilisateurs sélectionnés
        setSelectedUsers([]);
      }
    }
    const handleSelectAll = () => {
      setSelectAll(!selectAll);
      setSelectedUsers(selectAll ? [] : sampleUsers.map((user) => user.id));
    };
    
    const handleSelectUser = (userId) => {
      if (selectedUsers.includes(userId)) {
        setSelectedUsers(selectedUsers.filter((id) => id !== userId));
      } else {
        setSelectedUsers([...selectedUsers, userId]);
      }
    };
  
    const handleActionChange = (e) => {
      setSelectedAction(e.target.value);
    };
    
    return (
      <div style={{height:'81.2%'}}>
        <div className='top-container'>
        <div id="search-container" style={{margin:'2rem'}}>
          <input
            type="text"
            placeholder="Search in users ..."
            value={searchTerm}
            onChange={handleSearch}
          />
            <FaSearch className="search-icon" />
          </div>
          <div className='actions'>
          <label style={{display:'flex',justifyContent:'space-around',alignItems:'center',}}>
          <input type="checkbox" checked={selectAll} onChange={handleSelectAll} style={{width:'20px'}} />
            Select All
          </label>
          <div id='options'>
            <label >
            <select
           value={selectedAction}
           onChange={handleActionChange}
           onMouseEnter={() => setIsAddToRoomHovered(true)}
           onMouseLeave={() => setIsAddToRoomHovered(false)}
          >      
                <option value="">Actions</option>
                <option value="action1">DELETE</option>
                <option value="action2">Add to room</option>
              </select>
            </label>
        {isAddToRoomHovered && selectedAction === 'action2' && (
          <div className='room-list'>
            <ul style={{  listStyle: 'none'}}>
              <li >Room 1</li>
              <li>Room 2</li>
            </ul>
          </div>
        )}
        <button onClick={handleDeleteUser} style={{margin:'10px',width:'80px',height:'30px'}}>Apply</button>
            </div>
          </div>
        </div>
  
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Joining Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            
          {users
  .filter(
    (user) =>
      user.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )
  .map((user) => (
    <tr key={user._id}>
      <td>
        <img src={user.profileImage} alt={`${user.firstname} ${user.lastname}`} />
      </td>
      <td style={{ color: selectedUsers.includes(user._id) ? 'var(--red)' : 'var(--green)' }}>{`${user.firstname} ${user.lastname}`}</td>
      <td style={{ color: selectedUsers.includes(user._id) ? 'var(--red)' : 'var(--green)' }}>{user.email}</td>
      <td style={{ color: selectedUsers.includes(user._id) ? 'var(--red)' : 'var(--green)' }}>{user.createdAt}</td>
      <td>
        <label>
          <input
            type="checkbox"
            checked={selectedUsers.includes(user._id)}
            onChange={() => handleSelectUser(user._id)}
          />
        </label>
      </td>
    </tr>
  ))}

          </tbody>
        </table>
      </div>
    );
  }
  export default ListUsers;