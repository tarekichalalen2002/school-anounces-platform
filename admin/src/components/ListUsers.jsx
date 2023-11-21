import React,{useState} from 'react';
import '../App.css';
import '../scenes/Users/style.css';
import { FaSearch } from 'react-icons/fa';
import profileImage1 from '../scenes/Users/assets/Profile-Male-PNG.png';


const sampleUsers = [
    {
      id: 1,
      fullName: 'Wail Factory',
      email: 'wail@estin.dz',
      dateJoining: '2023-01-01',
      profileImage: profileImage1,
    },
    {
      id: 2,
      fullName: 'Amel mam',
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
  
    const handleSearch = (e) => {
      setSearchTerm(e.target.value);
    };
  
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
  
    // const handlePerformAction = () => {
    //   if (selectedAction === 'delete') {
    //     // Logique pour supprimer les utilisateurs sélectionnés
    //     console.log(`Supprimer les utilisateurs : ${selectedUsers.join(', ')}`);
    //     // Appeler une fonction pour supprimer les utilisateurs dans votre application
    //   } else if (selectedAction === 'updateRole') {
    //     // Logique pour mettre à jour le rôle des utilisateurs sélectionnés
    //     console.log(`Mettre à jour le rôle des utilisateurs : ${selectedUsers.join(', ')}`);
    //     // Appeler une fonction pour mettre à jour le rôle dans votre application
    //   }
    // };
  
    return (
      <div style={{height:'81.2%'}}>
        <div className='top-container'>
        <div id="search-container">
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
              <select value={selectedAction} onChange={handleActionChange} style={{}}>
                <option value="">Actions</option>
                <option value="action1">DELETE</option>
                <option value="action2">Add to room</option>
              </select>
            </label>
            {/* <button onClick={handlePerformAction}>Perform Action</button> */}
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
            
            {sampleUsers
              .filter(
                (user) =>
                  user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  user.email.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((user) => (
                <tr key={user.id}
                >
                  <td>
                    <img src={user.profileImage} alt={`${user.fullName}`} />
                  </td>
                  <td style={{ color: selectedUsers.includes(user.id) ?'var(--red)':'var(--green)' }}>{user.fullName}</td>
                  <td style={{ color: selectedUsers.includes(user.id) ?'var(--red)':'var(--green)' }}>{user.email}</td>
                  <td style={{ color: selectedUsers.includes(user.id) ?'var(--red)':'var(--green)' }}>{user.dateJoining}</td>
                  <td>
                    <label>
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => handleSelectUser(user.id)}
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