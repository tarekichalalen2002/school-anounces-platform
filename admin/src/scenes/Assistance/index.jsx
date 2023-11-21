import '../../App.css';
import '../Users/style.css';
import React from 'react';
import '../../App.css';


const Assistance = () => {
  return (
    <div className='Main'>
      <AssistanceMain />
      </div>
  );
};
const AssistanceMain = () => {
  return (
     <AssistanceHeader/>
  );
};


const AssistanceHeader = () => {
   
  return (
    <div id="container">
      <div className='head'>
      <h1>Assistance</h1>
      
      </div>
    </div>
  );
  };

export default Assistance;
