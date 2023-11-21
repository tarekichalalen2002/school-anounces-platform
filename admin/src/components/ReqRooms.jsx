import React from 'react';
import '../scenes/Users/style.css';

const ReqRooms = () =>{
   
    
      const pendingRequestsData = [
        {
          id: 1,
          title: 'Religious content',
          createdBy: 'amel',
          date: '2023-11-10',
          approvedUsers: 30,
          totalUsers: 50,
          theme: 'thème de la demande',
        },
      ];
      
      const progressWidth = (pendingRequestsData[0].approvedUsers / pendingRequestsData[0].totalUsers) * 100;

      const handleApprove = (requestId) => {
        // Logique pour approuver la demande avec l'ID requestId
        console.log(`Demande approuvée avec l'ID : ${requestId}`);
      };
    
      const handleReject = (requestId) => {
        // Logique pour rejeter la demande avec l'ID requestId
        console.log(`Demande rejetée avec l'ID : ${requestId}`);
      };
    
      return (
          <div>
    
            {pendingRequestsData.map((request) => (
              <div key={request.id} className='request-container'>
                <h3>{request.title}</h3>
                <p>
                  <strong>By:</strong> {request.createdBy} | <strong>Date:</strong> {request.date}
                </p>
                <p>
                  <strong>Approuved invitations by users:</strong>
                </p>
                <div className="progress-bar" style={{ height: '10px', width:'10rem',backgroundColor: 'var(--blue-claire)' }}>
                 <div
                 className="progress-bar-filled"
                style={{ height: '10px', width: `${progressWidth}%`, backgroundColor: 'var(--red)' }}
                ></div>
                </div>
                <p>
                  {request.approvedUsers}/{request.totalUsers} 
                </p>
                
                <p>
                  <strong>Theme:</strong> {request.theme}
                </p>
                <button onClick={() => handleApprove(request.id)}>Approve</button>
                <button onClick={() => handleReject(request.id)}>Reject</button>
              </div>
            ))}
          </div>
      );
    };
    
   


export default ReqRooms;