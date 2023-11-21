import React, { useState } from 'react';
import image1 from '../scenes/Users/assets/Profile-Male-PNG.png';

const ExistingRooms = () => {
  const roomsData = [
    { id: 1, name: 'Room 1', image :image1 },
    { id: 2, name: 'Room 2',image :image1 },
    { id: 3, name: 'Room 3', image :image1 },
    // Ajoutez d'autres rooms si l bdd
  ];

  const [selectedRoom, setSelectedRoom] = useState(null);

  const handleSeeDetails = (roomId) => {
    const room = roomsData.find(room => room.id === roomId);
    setSelectedRoom(room);
  };

  const handleBackToRooms = () => {
    setSelectedRoom(null);
  };

  return (
    <div 
    style={{width:'100%',height:'100%'}}
    >
      {selectedRoom ? (
        <RoomDetails room={selectedRoom} onBack={handleBackToRooms} />
      ) : (
        <>
        <div className='BoxDefRoom'>
          <h2>Default Rooms</h2>
          {roomsData.map(room => (
            <div key={room.id} className="room-container">
              <h3>{room.name}</h3>
              <img src={room.image} alt={`Image of ${room.name}`} />
              <button onClick={() => handleSeeDetails(room.id)}>See Details</button>
              
            </div>
            
          ))}
          </div>
          <div className='BoxOthRoom'>
          <h2>Other Rooms</h2>
          {roomsData.map(room => (
            <div key={room.id} className="room-container">
              <h3>{room.name}</h3>
              <img src={room.image} alt={`Image of ${room.name}`} />
              <button onClick={() => handleSeeDetails(room.id)}>See Details</button>
              
            </div>
            
          ))}
          </div>
        </>
      )}
    </div>
  );
};

const RoomDetails = ({ room, onBack }) => {
    //cela pour afficher les details de rooms
  return (
    <div>
      <h2>Room Details</h2>
      <h3>{room.name}</h3>
      <img src={room.image} alt={`Image of ${room.name}`} />
      {/* affichez d'autres détails de rooms dagi apres ateneqadagh */}
      <button onClick={onBack}>Back to Rooms</button>
    </div>
  );
};

export default ExistingRooms;