import React from 'react';
import '../scenes/Users/style.css'; 

const Notifications = ({ onClose }) => {
  const notifications = [
    { id: 1, message: 'nouvelle notification 1' },
    { id: 2, message: 'nouvelle notification 2' },
    // ... d'autres notifications
  ];
  const style = {
    position: 'fixed',
    top: '8%',
    left: '8%',
    backgroundColor: 'var(--white-light)',
    border: '1px solid #ddd',
    padding: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
    width: '15rem',
    borderRadius: '0 10px 10px 10px',
};

  return (
    <div className="notifications-container" style={style}>
      <div className="notifications-header">
      </div>
      <ul style={{listStyle:'none', margin: '0', padding: '0',fontSize:'1rem' }}>
        {notifications.map((notification) => (
          <li key={notification.id} style={{marginBottom:'5px'}}>{notification.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
