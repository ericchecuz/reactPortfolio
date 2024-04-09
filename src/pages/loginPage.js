// src/pages/LoginPage.js

import React, { useState , useEffect} from 'react';
import { auth } from '../firebase/firebaseConfig';
import './styleLogin.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState('');

  useEffect(() => {
    // Simula il caricamento o attendi il caricamento di eventuali risorse
    const timer = setTimeout(() => setLoading(false), 5000); // 2 secondi per l'esempio
    return () => clearTimeout(timer);
  }, []);

  
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
    <div className="background-image">
      {loading ? (
        <div className='container-spinner'>
          <div className="loading-animation"></div>
          </div>  // Mostra l'animazione di caricamento
      ) : (
        // Una volta completato il caricamento, mostra il form di login
        <div className='container-login fade-in'>
          <div className='container-form-login'>
            <form className='form-login' onSubmit={signIn}>
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
      )}
    </div>
  );
}

export default LoginPage;
