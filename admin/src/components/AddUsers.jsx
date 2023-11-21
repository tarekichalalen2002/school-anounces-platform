
import React,{useState} from 'react';
import '../App.css';
import '../scenes/Users/style.css';


const AddUsers = () =>{
    const [email, setEmail] = useState('');
    const [csvFile, setCsvFile] = useState(null);
  
    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };
    const handleCsvFileChange = (e) => {
      const file = e.target.files[0];
      setCsvFile(file);
    };
    const handleCreateUser = () => {
      if (email.trim() !== '') {
        if (email.endsWith('@estin.dz')) {
          console.log(`Adding user with email: ${email}`);
          // affiche un msg de succes ici apres atarnugh ok!!
          setEmail('');
        } else {
          alert('Email must end with "@estin.dz".');
        }
      } else {
        alert('Please enter a valid email.');
      }
    };
    const handleSubmitCsv = () => {
      // ilaq l traitement n csv file
      if (csvFile) {
        console.log('Processing CSV file:', csvFile);
        //réinitialiser l'état du fichier csv dagi
        setCsvFile(null);
      } else {
        alert('Please select a valid CSV file.');
      }
    };
    return (
      <div className='addUs-manual'>
        <h3>Adding one user manually</h3>
        <label 
        style={{
            color:'var(--blue)',
            fontWeight : 'bold',
            marginLeft:'13rem'

        }}>
            Email:</label>
        <div id='search-container'
        style={{
            width:'30%',
            margin:'1.5rem',
        }}
        >
        <input
          type="text"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter the email @estin.dz here..."
        />
        </div>
        <br />
        <button onClick={handleCreateUser}
        style={{
            color:'var(--white)',
            background:'var(--blue)',
            borderRadius:'30px',
            marginLeft:'20.5rem',
        }}
        >Create User</button>
  
        
  
        <h3>Adding multiple users at once</h3>
        <div className='add-multiple'
        style={{
            display:'flex',
            flexDirection:'row',
            gap:'2rem',
            marginLeft:'6.5rem',
            justifyContent:'spaceAround',
        }}
        >
        <label
        style={{
            color:'var(--blue)',
            fontWeight : 'bold',
        }}
        >Drop a .csv file here:</label>
        <div className='drop-container'>
        <input
          style={{
            
          }}
          type="file"
          accept=".csv"
          onChange={handleCsvFileChange}
        />
        </div>
        <p
        style={{
            color:'var(--blue-claire)',
        }}
        
        >
            <span style={{
            color:'var(--red)',
            fontWeight:'bold',
            }}>
            PS : 
            </span>
            The .csv file must contain at <br />
            least a column of emails of <br />
            all students you wanna create <br />
            accounts for
            </p>
        </div>
        <button 
        style={{
            color:'var(--white)',
            background:'var(--blue)',
            borderRadius:'30px',
            marginTop:'1.5rem',
            marginLeft:'21rem',
        }}
        onClick={handleSubmitCsv}>Submit</button>
      </div>
    );
}
export default AddUsers;