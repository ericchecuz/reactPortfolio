// src/pages/LoginPage.js

import React, { useState } from 'react';
import { auth } from '../firebase/firebaseConfig';
import './styleLogin.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = async (e) => {
    e.preventDefault(); // Previeni il comportamento di submit di default

    try {
      await auth.signInWithEmailAndPassword(email, password);
      console.log("Logged in successfully");
      // Reindirizza all'homepage o alla dashboard dopo il login
    } catch (error) {
      console.error("Error signing in: ", error.message);
    }
  };

  return (
    <div className='container-login'>
      <div className='container-form-login'>
      <form onSubmit={signIn}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
        </form>
        </div>
    </div>
  );
}

export default LoginPage;
