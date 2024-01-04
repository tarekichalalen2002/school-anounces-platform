import React,{useState} from 'react';
import '../App.css';
import '../scenes/Users/style.css';


const AddUsers = () =>{
    const [email, setEmail] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [csvFile, setCsvFile] = useState(null);
  
    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };
    const handleFirstnameChange = (e) => {
      setFirstname(e.target.value);
  };
  
  const handleLastnameChange = (e) => {
      setLastname(e.target.value);
  };
  
  const handleMobileChange = (e) => {
      setMobile(e.target.value);
  };
  const handlePasswordChange = (e) => { 
    setPassword(e.target.value);
};
    const handleCsvFileChange = (e) => {
      const file = e.target.files[0];
      setCsvFile(file);
    };
    // ... (autres imports)

    const handleCreateUser = () => {
      if (email.trim() !== '' && firstname.trim() !== '' && lastname.trim() !== '' && mobile.trim() !== '') {
          if (email.endsWith('@estin.dz')) {
              console.log(`Adding user with email: ${email}`);
  
              fetch('http://localhost:5000/api/user', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({ firstname, lastname, email, mobile })
              })
              .then(response => {
                  if (response.ok) {
                      console.log('User added successfully');
                      setFirstname('');
                      setLastname('');
                      setEmail('');
                      setMobile('');
                      setPassword('');
                  } else {
                      console.log('Failed to add user');
                      
                  }
              })
              .catch(error => {
                  console.log('Error:', error);
                  
              });
          } else {
              alert('Email must end with "@estin.dz".');
          }
      } else {
          alert('Please enter valid information.');
      }
  };  
    
const handleSubmitCsv = () => {
  if (csvFile) {
    console.log('Processing CSV file:', csvFile);

    const formData = new FormData();
    formData.append('csvFile', csvFile);

    fetch('http://localhost:5000/api/user/csv', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (response.ok) {
        console.log('CSV file submitted successfully');
        setCsvFile(null);
      } else {
        console.log('Failed to submit CSV file');
      }
    })
    .catch(error => {
      console.log('Error:', error);
    });
  } else {
    alert('Please select a valid CSV file.');
  }
};
    return (
       <div className='addUs-manual'>
      <h3 style={{margin:'1rem'}}>Adding one user manually</h3>
        <form className='addUs-manual' onSubmit={handleCreateUser} style={{display:'flex', flexDirection:'column', justifyContent:'center',marginLeft:'12rem'}}>
            <div style={{display:'flex', flexDirection:'row'}}>
            <div id='search-container'style={{width:'25%'}}>
                <input
                    type="text"
                    value={firstname}
                    onChange={handleFirstnameChange}
                    placeholder="Enter the firstname here..."
                />
            </div>

            
            <div id='search-container' style={{width:'25%'}}>
                <input
                    type="text"
                    value={lastname}
                    onChange={handleLastnameChange}
                    placeholder="Enter the lastname here..."
                />
            </div>
            </div>
            <br />
            
            <div id='search-container'>
                <input
                    type="text"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Enter the email @estin.dz here..."
                />
            </div>
            <br />
            <div style={{display:'flex', flexDirection:'row'}}>
            <div id='search-container' style={{width:'25%'}}>
                <input
                    type="text"
                    value={mobile}
                    onChange={handleMobileChange}
                    placeholder="Enter the mobile here..."
                />
            </div>
            <div id='search-container' style={{ width: '25%' }}>
                        <input
                            type="password" 
                            value={password}
                            onChange={handlePasswordChange}
                            placeholder="Enter the password here..."
                        />
                    </div>
            </div>
            <br />
            <button type="submit" style={{color:'var(--white)',
            background:'var(--blue)',
            borderRadius:'30px',
            marginLeft:'10rem'}}>
                Create User
            </button>
        </form>
        <div/>
    <h3 style={{margin:'1rem'}}>Adding multiple users at once</h3><div className='add-multiple'
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '2rem',
        marginLeft: '6.5rem',
        justifyContent: 'spaceAround',
      }}
    >
      <label
        style={{
          color: 'var(--blue)',
          fontWeight: 'bold',
        }}
      >Drop a .csv file here:</label>
      <div className='drop-container'>
        <input
          style={{}}
          type="file"
          accept=".csv"
          onChange={handleCsvFileChange} />
      </div>
      <p
        style={{
          color: 'var(--blue-claire)',
        }}

      >
        <span style={{
          color: 'var(--red)',
          fontWeight: 'bold',
        }}>
          PS :
        </span>
        The .csv file must contain at <br />
        least a column of emails of <br />
        all students you wanna create <br />
        accounts for
      </p>
    </div><button
      style={{
        color: 'var(--white)',
        background: 'var(--blue)',
        borderRadius: '30px',
        marginTop: '1.5rem',
        marginLeft: '21rem',
      }}
      onClick={handleSubmitCsv}>Submit</button>
      </div>
    );
}
export default AddUsers;