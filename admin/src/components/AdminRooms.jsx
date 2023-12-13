import React,{useState} from 'react';
import '../App.css';
import '../scenes/Users/style.css';
import { FaSearch } from 'react-icons/fa';
import profileImage1 from '../scenes/Users/assets/Profile-Male-PNG.png';
import { FaEllipsisV, FaTrash, FaExchangeAlt } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const sampleAdmins = [
    {
      id: 1,
      fullName: 'amel am',
      email: 'amel@estin.dz',
      adminOfRoom: 'Shop',
      sinceDate: '2023-03-06',
      profileImage: profileImage1,
    },
  ];
  const AdminRooms = () =>{
    const [searchTerm, setSearchTerm] = useState('');
  
    const handleSearchChange = (e) => {
      setSearchTerm(e.target.value);
    };
    const [openMenuId, setOpenMenuId] = useState(null);
  
    const handleToggleMenu = (adminId) => {
      setOpenMenuId(openMenuId === adminId ? null : adminId);
    };
    return (
      <div>
         <div id="search-container">
          <input
            type="text"
            placeholder="Search in users ..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
            <FaSearch className="search-icon" />
          </div>
  
          <table className="admin-table">
          <tbody>
            {sampleAdmins
              .filter(
                (admin) =>
                  admin.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  admin.email.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((admin) => (
                <tr key={admin.id}>
                  <td>
                    <img src={admin.profileImage} alt={`${admin.fullName}`} />
                  </td>
                  <td><span style={{fontWeight:'bold'}}>{admin.fullName}</span></td>
                  <td>{admin.email}</td>
                  <td>
                  admin of{' '}
                  <Link to={`/Rooms/RoomDetails/${admin.adminOfRoom}`} style={{ fontWeight: 'bold' ,textDecoration:'none',color:'var(--blue)'}}>
                    {admin.adminOfRoom} 
                  </Link>{' '}
                  room
                  </td>                  
                  <td>{admin.sinceDate}</td>
                  <td>
                  <div className="ellipsis-container">
      <FaEllipsisV
        className="ellipsis-icon"
        onClick={() => handleToggleMenu(admin.id)}
      />
      {openMenuId === admin.id && (
        <div className="options-menu">
          <ul>
            <li>
              <FaTrash /> Delete
            </li>
            <li>
              <FaExchangeAlt /> Replace
            </li>
            <li>
            <FontAwesomeIcon icon={faCommentDots} /> Room details
            </li>
          </ul>
        </div>
      )}
    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
  export default AdminRooms;