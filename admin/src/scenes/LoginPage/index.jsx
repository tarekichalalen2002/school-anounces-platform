import React, { useState } from 'react';
import FormInput from '../../components/FormInput'
const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLoginClick = () => {
    const loginSuccess = username === 'amel' && password === 'admin';
    onLogin(loginSuccess);
  };

  return (
    <div className='main'>
      <div className='content'>
        <div className='inputs'>
          <FormInput
            formInputTitle="Username:"
            formInputLabel="Enter the username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <FormInput
            formInputTitle="Password:"
            formInputLabel="Enter the password..."
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>
            <input
              type="checkbox"
              style={{
                width:'20px',
                height:'20px',
                margin:'1rem'
              }}
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            Show Password
          </label>
          <br />
          <button className='login' onClick={handleLoginClick}>
            Login
          </button>
        </div>
        <div>
          <div className='text'>
            Access the <b>Admin</b> Dashboard to manage <b>Students Chat</b>
          </div>
          <div className='back-image'></div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
