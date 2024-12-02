 
'use client';

import React, { useState } from 'react';
import '../Auth/LoginRegister.css';
import AuthMessage from './AuthMessage'; 

function LoginRegister() {
  
  const [isRegisterActive, setIsRegisterActive] = useState(false);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [authMessageType, setAuthMessageType] = useState<'registerSuccess' | 'emailExists' | 'loginSuccess' | null>(null);
  const [userNameForLoginSuccess, setUserNameForLoginSuccess] = useState<string>('');

  const handleToggle = () => {
    setIsRegisterActive((prev) => !prev);
  };

  const handleClose = () => {
    window.location.href = '/';
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setErrorMessage('All fields are required');
      return;
    }

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData);
      }

      const { user } = await response.json();  // Destructure user from response data
      setAuthMessageType('registerSuccess');
      setUserNameForLoginSuccess(user.username);  // Use user data here
      setIsRegisterActive(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage('Something went wrong. Please try again later.');
        if (error.message.includes('email')) {
          setAuthMessageType('emailExists');
        }
      } else {
        setErrorMessage('An unknown error occurred.');
      }
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || 'Invalid credentials. Please try again.');
      }

      const { user } = await response.json();  // Destructure user from response data
      setAuthMessageType('loginSuccess');
      setUserNameForLoginSuccess(user.username);  // Use user data here

      localStorage.setItem('username', user.username);
      localStorage.setItem('user_type', user.user_type);

      if (user.user_type === 'ADMIN') {
        window.location.href = './dashboard/';
      } else {
        window.location.href = './';
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message || 'Invalid credentials. Please try again.');
      }
    }
  };




  return (
    <div
      className={`content justify-content-center align-items-center d-flex shadow-lg ${isRegisterActive ? 'active' : ''}`}
      id="content"
    >

{/* Show the AuthMessage pop-up for different scenarios */}
      <AuthMessage type={authMessageType!} name={userNameForLoginSuccess} /> 

{/* Register Form */}
      <div className="col-md-6 d-flex justify-content-center">
        <form onSubmit={handleRegisterSubmit}>
          <div className="header-text mb-4">
            <h3>Create Account</h3>
          </div>

          {/* Display error message if any */}
          {errorMessage && <div className="error-message">{errorMessage}</div>}

          <div className="input-group mb-3">
            <input
              type="text"
              placeholder="Name"
              className="form-control form-control-lg bg-blend-lighten fs-6"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="input-group mb-3">
            <input
              type="email"
              placeholder="Email"
              className="form-control form-control-lg bg-blend-lighten fs-6"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group mb-3">
            <input
              type="password"
              placeholder="Password"
              className="form-control form-control-lg bg-blend-lighten fs-6"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="input-group mb-3 justify-content-center">
            <button className="btn border-white text-white w-50 fs-6">Register</button>
          </div>
        </form>
      </div>

{/* Login Form */}
      <div className="col-md-6 d-flex right-box justify-content-center">
        <form onSubmit={handleLoginSubmit}>
          <div className="header-text mb-4">
            <h3>Sign In</h3>
          </div>

          <div className="input-group mb-3">
            <input
              type="email"
              placeholder="Email"
              className="form-control form-control-lg bg-blend-lighten fs-6"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group mb-3">
            <input
              type="password"
              placeholder="Password"
              className="form-control form-control-lg bg-blend-lighten fs-6"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="input-group mb-5 d-flex justify-content-between">
            <div className="form-check mr-4">
              <input type="checkbox" className="form-check-input" />
              <label htmlFor="formcheck" className="form-check-label text-accent-black_olive">
                <small>Remember me</small>
              </label>
            </div>

            <div className="forgot">
              <small>
                <a href="#">Forget password?</a>
              </small>
            </div>
          </div>

          <div className="input-group mb-3 justify-content-center">
            <button className="btn border-white text-white w-50 fs-6 hover:bg-accent-minBlue">Login</button>
          </div>
        </form>
      </div>

{/* Swap panel */}
      <div className="switch-content">
        <div className="switch">
          <div className="switch-panel switch-left">
{/* Close Button */}
            <button className="close-button" onClick={handleClose}>
              &times;
            </button>

            <h1>Hello!</h1>
            <p>Nice to see you again!</p>
            <button
              className="hidden btn border-white text-white w-50 fs-6"
              id="login"
              onClick={handleToggle}
            >
              Login
            </button>
          </div>

          <div className="switch-panel switch-right">
            
  {/* Close Button */}
            <button className="close-button" onClick={handleClose}>
              &times;
            </button>

            <h1>Welcome</h1>
            <p>Join our Soren book club!</p>
            <button
              className="hidden btn border-white text-white w-50 fs-6"
              id="register"
              onClick={handleToggle}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginRegister;






