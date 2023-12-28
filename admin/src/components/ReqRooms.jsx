import React, { useState }  from 'react';
import '../scenes/Users/style.css';
import { FaRegTrashAlt } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
const ReqRooms = () =>{
  
  const text ='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.'
  const [expanded, setExpanded] = useState(false);
  const [containerHeight, setContainerHeight] = useState('auto');

  const toggleExpanded = () => {
    setExpanded(!expanded);
    setContainerHeight(expanded ? 'auto' : 'auto');
  };
 
  

  class MyComponent extends React.Component {
    state = {
      width: 100,
    };
  
    handleSeeMore() {
      this.setState({
        width: this.state.width + 100,
      });
    }
  
    render() {
      const { width } = this.state;
  
      return (
        <div
          className="my-div"
          width={width}
          onClick={() => this.handleSeeMore()}
        >
          Ce texte est tronqué avec trois points (`...`) si il dépasse la taille du div.
        </div>
      );
    }
  }    
  
      const pendingRequestsData = [
        {
          id: 1,
          title: 'Religious content',
          createdBy: 'amel',
          date: '2023/11/10',
          approvedUsers: 20,
          totalUsers: 50,
          theme: 'thème de la demande',
        },
      ];
      
      const progressWidth = (pendingRequestsData[0].approvedUsers / pendingRequestsData[0].totalUsers) * 100;

      const handleApprove = (requestId) => {
        console.log(`Demande approuvée avec l'ID : ${requestId}`);
      };
    
      const handleReject = (requestId) => {
        console.log(`Demande rejetée avec l'ID : ${requestId}`);
      };
    
      return (
          <div>
    
            {pendingRequestsData.map((request) => (
              <div key={request.id} className='request-container' style={{ height: containerHeight }}>
                {/*====================part 1 =====================*/} 
              <div className='request-container-header'>
                <h3 className='request-title'>{request.title}</h3>
                <p className='request-creator' style={{color:'var(--blue)'}}>
                  By {request.createdBy}   {request.date}
                </p>
                <div className='request-pourcentage'>
                <div className='request-pourcentage-text'>
                  <p className='left'>
                    <strong>Approuved invitations by users:</strong>
                  </p>
                  <p className='right'>
                    {request.approvedUsers}/{request.totalUsers} 
                  </p>
                </div>
                <div className="progress-bar" style={{ height: '10px', width:'367px',backgroundColor: 'var(--blue-claire)' }}>
                 <div
                 className="progress-bar-filled"
                style={{ height: '10px', width: `${progressWidth}%`, backgroundColor: 'var(--red)' }}
                ></div>
                </div>
                
              </div>

              </div>
                {/*====================part 1 =====================*/} 

              <div className='request-content'>

                <div className="request-content-text" >
                  <div className={`textDiv ${expanded ? 'expanded' : ''}`}>
                    <strong>theme :</strong>
                    <p>
                    {/* Votre texte ici */}
                    {text}
                    </p>
                  </div>
                </div>
              
                <div className='request-button'>
                <button className='voir' onClick={toggleExpanded}>
                  {expanded ? 'See Less' : 'See More'}
                </button>
                  <button className='approve' onClick={() => handleApprove(request.id)}>Approve <FaCheck /></button>
                  <button className='reject' onClick={() => handleReject(request.id)}>Reject <FaRegTrashAlt /></button>
                </div>
              </div>
              </div>
            ))}
          </div>
      );
    };
    
   


export default ReqRooms;