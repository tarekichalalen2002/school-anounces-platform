import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import image1 from '../scenes/Users/assets/img5.png';
import image2 from '../scenes/Users/assets/img1.png';
import image3 from '../scenes/Users/assets/img4.png';
import image4 from '../scenes/Users/assets/img2.png';
import image5 from '../scenes/Users/assets/img3.png';
import profileImage1 from '../scenes/Users/assets/Profile-Male-PNG.png';

const RoomDetails = () => {
  const { roomName } = useParams();
  const navigate = useNavigate();

  const roomDetails = getRoomDetailsByName(roomName);

  if (!roomDetails) {
    return <div>Room not found</div>;
  }

  const handleBackToRooms = () => {
    navigate('/Rooms');
  };

  return (
    <div style={{width:'100%',height:'100%'}}>
      <h2>Room Details</h2>
      <h3>{roomDetails.name}</h3>
      <img src={roomDetails.image} alt={roomDetails.name} style={{ width: '20%' }} />
      <h3>Users in this room:</h3>
      <table>
        <thead>
          <tr>
            <th></th>
            <th></th>
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
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/Rooms">
        <button onClick={handleBackToRooms} style={{ marginTop: '12rem',marginLeft:'2rem' }}>Back to Rooms</button>
      </Link>
    </div>
  );
};

const getRoomDetailsByName = (roomName) => {
  const OtherRoomsData = [
    { id: 1, name: 'Sport', image: image4 ,users: [
        {id: 1,
        fullName: 'Wail ninou',
        email: 'wail@estin.dz',
        dateJoining: '2023-01-01',
        profileImage: profileImage1,
      }, ]},
    { id: 2, name: 'Game', image: image5 ,users: [
        {id: 1,
        fullName: 'Wail ninou',
        email: 'wail@estin.dz',
        dateJoining: '2023-01-01',
        profileImage: profileImage1,
      }, ]},
  ];

  const roomsData = [
    { id: 1, name: 'Lost Objects', image :image1,
    users: [
      {id: 1,
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
    }]},
    { id: 2, name: 'Found Objects',image :image2 ,
    users: [
      {id: 1,
        fullName: 'Wail ninou',
        email: 'wail@estin.dz',
        dateJoining: '2023-01-01',
        profileImage: profileImage1,
      }
    ]},
    { id: 3, name: 'Shop', image :image3 ,
    users: [
      {
        id: 2,
        fullName: 'Amel mamal',
        email: 'amel@estin.dz',
        dateJoining: '2023-03-01',
        profileImage: profileImage1,
      }
    ]},
  ];

  const roomDetailsInRoomsData = roomsData.find((room) => room.name === roomName);
  const roomDetailsInOtherRoomsData = OtherRoomsData.find((room) => room.name === roomName);

  return roomDetailsInRoomsData || roomDetailsInOtherRoomsData || null;
};

export default RoomDetails;
