import {React,useState} from 'react';
import { useParams, Link, useNavigate} from 'react-router-dom';
import { FaTrash } from 'react-icons/fa'; 
import { FiChevronLeft } from 'react-icons/fi';
import image1 from '../assets/img5.png';
import image2 from '../assets/img1.png';
import image3 from '../assets/img4.png';
import image4 from '../assets/img2.png';
import image5 from '../assets/img3.png';
import profileImage1 from '../assets/Profile-Male-PNG.png';

const RoomDetails = () => {
  const { roomName } = useParams();
  const navigate = useNavigate();

  const roomDetails = getRoomDetailsByName(roomName);
  const [hoveredUserIds, setHoveredUserIds] = useState([]);

const handleMouseEnter = (userId) => {
  setHoveredUserIds((prevHoveredUserIds) => [...prevHoveredUserIds, userId]);
};

const handleMouseLeave = (userId) => {
  setHoveredUserIds((prevHoveredUserIds) => prevHoveredUserIds.filter((id) => id !== userId));
};
  const [deletedUserIds, setDeletedUserIds] = useState([]);
  if (!roomDetails) {
    return <div>Room not found</div>;
  }

  const handleBackToRooms = () => {
    navigate('/Rooms');
  };

  const handleDeleteUser = (userId) => {
    console.log('Deleting user with id:', userId);
    setDeletedUserIds((prevDeletedUserIds) => [...prevDeletedUserIds, userId]);
  };
  

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', margin: '20px' }}>
        <Link to="/Rooms" style={{ color: 'var(--blue)' }}>
          <FiChevronLeft onClick={handleBackToRooms} /> 
        </Link>
        <h3>
          {roomDetails.name} 
        </h3> <br />
      </div>
      <h4 style={{marginLeft:'30px',color:'var(--blue-claire)'}}>
        {roomDetails.admin.fullName} -  {roomDetails.admin.email}
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
          {roomDetails.users.map((user) => (
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
                className={`${deletedUserIds.includes(user.id) ? 'deleted' : ''} ${hoveredUserIds.includes(user.id) ? 'hovered' : ''}`}
                />              
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const getRoomDetailsByName = (roomName) => {
  const OtherRoomsData = [
    { 
      id: 1, 
      name: 'Sport', 
      image: image4,
      admin: {
        fullName: 'Eduard',
        email: 'eduard@sport.com',
      },
      users: [
        {
          id: 1,
          fullName: 'Wail Ninou',
          email: 'wail@estin.dz',
          dateJoining: '2023-01-01',
          profileImage: profileImage1,
        },
      ],
    },
    { 
      id: 2, 
      name: 'Game', 
      image: image5,
      admin: {
        fullName: 'Admin Game',
        email: 'admin@game.com',
      },
      users: [
        {
          id: 1,
          fullName: 'Wail Ninou',
          email: 'wail@estin.dz',
          dateJoining: '2023-01-01',
          profileImage: profileImage1,
        },
      ],
    },
  ];

  const roomsData = [
    { 
      id: 1, 
      name: 'Lost Objects', 
      image: image1,
      admin: {
        fullName: 'islam',
        email: 'islam@lostobjects.com',
      },
      users: [
        {
          id: 1,
          fullName: 'Wail Ninou',
          email: 'wail@estin.dz',
          dateJoining: '2023-01-01',
          profileImage: profileImage1,
        },
        {
          id: 2,
          fullName: 'Amel Mamal',
          email: 'amel@estin.dz',
          dateJoining: '2023-03-01',
          profileImage: profileImage1,
        },
      ],
    },
    { 
      id: 2, 
      name: 'Found Objects', 
      image: image2,
      admin: {
        fullName: 'Admin Found Objects',
        email: 'admin@foundobjects.com',
      },
      users: [
        {
          id: 1,
          fullName: 'Wail Ninou',
          email: 'wail@estin.dz',
          dateJoining: '2023-01-01',
          profileImage: profileImage1,
        },
      ],
    },
    { 
      id: 3, 
      name: 'Shop', 
      image: image3,
      admin: {
        fullName: 'Admin Shop',
        email: 'admin@shop.com',
      },
      users: [
        {
          id: 2,
          fullName: 'Amel Mamal',
          email: 'amel@estin.dz',
          dateJoining: '2023-03-01',
          profileImage: profileImage1,
        },
      ],
    },
  ];

  const roomDetailsInRoomsData = roomsData.find((room) => room.name === roomName);
  const roomDetailsInOtherRoomsData = OtherRoomsData.find((room) => room.name === roomName);

  return roomDetailsInRoomsData || roomDetailsInOtherRoomsData || null;
};

export default RoomDetails;