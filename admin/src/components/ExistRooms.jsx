import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import image1 from '../scenes/Users/assets/img5.png';
import image2 from '../scenes/Users/assets/img1.png';
import image3 from '../scenes/Users/assets/img4.png';
import image4 from '../scenes/Users/assets/img2.png';
import image5 from '../scenes/Users/assets/img3.png';
import profileImage1 from '../scenes/Users/assets/Profile-Male-PNG.png';
import RoomDetails from './RoomDetail';

const ExistingRooms = () => {
  const navigate = useNavigate(); 
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
    // Ajoutez d'autres rooms si l bdd
  ];
  const OtherRoomsData = [
    { id: 1, name: 'Sport', image :image4 },
    { id: 2, name: 'Game',image :image5 },
    // Ajoutez d'autres rooms si l bdd
  ];
  
  const [selectedRoom, setSelectedRoom] = useState(null);

  const handleSeeDetails = (roomId, roomName) => {
    const room = roomsData.find((room) => room.id === roomId && room.name === roomName);
    setSelectedRoom(room);
    navigate(`/Rooms/RoomDetails/${roomName}`);
    };

  const handleBackToRooms = () => {
    setSelectedRoom(null);
  };
  
  return (
    <div style={{ width: '100%', height: '100%' }}>
      {selectedRoom ? (
        <RoomDetails room={selectedRoom} onBack={handleBackToRooms} />
      ) : (
        <>
          <div className='BoxDefRoom' style={{ width: '100%' }}>
            <h2>Default Rooms</h2>
            {roomsData.map((room) => (
              <div key={room.id} className="room-container">
                <div className="box">
                  <h3>{room.name}</h3>
                  <img src={room.image} alt={`${room.name}`} />
                  <Link to={`/Rooms/RoomDetails/${room.name}`}>
                  <button onClick={() => handleSeeDetails(room.id, room.name)}>See Details</button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className='BoxOthRoom'>
            <h2>Other Rooms</h2>
            {OtherRoomsData.map((room) => (
              <div key={room.id} className="room-container">
                <div className="box">
                  <h3>{room.name}</h3>
                  <img src={room.image} alt={`${room.name}`} />
                  <Link to={`/Rooms/RoomDetails/${room.name}`}>
                  <button onClick={() => handleSeeDetails(room.id, room.name)}>See Details</button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );

};

export default ExistingRooms;