import React,{useState} from 'react';
import '../App.css';
import '../scenes/Users/style.css';
import { FaSearch } from 'react-icons/fa';
import profileImage1 from '../scenes/Users/assets/Profile-Male-PNG.png';
import { FaEllipsisV, FaTrash, FaExchangeAlt } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';


const sampleAdmins = [
    {
      id: 1,
      fullName: 'amel am',
      email: 'amel@estin.dz',
      adminOfRoom: 'Game',
      sinceDate: '2023-03-06',
      profileImage: profileImage1,
    },
    // Ajoutez d'autres administrateurs ici
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
                  <td>admin of <span style={{fontWeight:'bold'}}>{admin.adminOfRoom} </span>room</td>
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
            {/* Ajoutez d'autres options ici */}
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