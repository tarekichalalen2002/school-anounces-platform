import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { FiChevronLeft } from 'react-icons/fi';
import profileImage1 from '../assets/Profile-Male-PNG.png';

const RoomDetails = () => {
  const { roomName } = useParams();
  const navigate = useNavigate();

  const [roomDetails, setRoomDetails] = useState(null);
  const [hoveredUserIds, setHoveredUserIds] = useState([]);
  const [deletedUserIds, setDeletedUserIds] = useState([]);

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/room/${roomName}`);
        const data = await response.json();
        setRoomDetails(data.getaRoom);
      } catch (error) {
        console.error('Error fetching room details:', error);
      }
    };

    fetchRoomDetails();
  }, [roomName]);

  const handleMouseEnter = (userId) => {
    setHoveredUserIds((prevHoveredUserIds) => [...prevHoveredUserIds, userId]);
  };

  const handleMouseLeave = (userId) => {
    setHoveredUserIds((prevHoveredUserIds) => prevHoveredUserIds.filter((id) => id !== userId));
  };

  const handleBackToRooms = () => {
    navigate('/Rooms');
  };

  const handleDeleteUser = (userId) => {
    console.log('Deleting user with id:', userId);
    setDeletedUserIds((prevDeletedUserIds) => [...prevDeletedUserIds, userId]);
  };

  if (!roomDetails) {
    return <div>Loading...</div>; // ou un message d'erreur approprié
  }

  return (
    <div style={{ width: '77%', height: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', margin: '20px' }}>
        <Link to="/Rooms" style={{ color: 'var(--blue)' }}>
          <FiChevronLeft onClick={handleBackToRooms} />
        </Link>
        <h3>{roomDetails.name}</h3> <br />
      </div>
      <h4 style={{ marginLeft: '30px', color: 'var(--blue-claire)' }}>
        {roomDetails.roomadmin.fullName} - {roomDetails.roomadmin.email}
      </h4>
      <br />
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Nom Users</th>
            <th>Email Users</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {roomDetails.students.map((user) => (
            <tr key={user.id}>
              <td>
                <img src={user.profileImage} alt={user.fullName} />
              </td>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td>
                <FaTrash
                  onClick={() => handleDeleteUser(user.id)}
                  onMouseEnter={() => handleMouseEnter(user.id)}
                  onMouseLeave={() => handleMouseLeave(user.id)}
                  className={`${deletedUserIds.includes(user.id) ? 'deleted' : ''} ${
                    hoveredUserIds.includes(user.id) ? 'hovered' : ''
                  }`}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoomDetails;