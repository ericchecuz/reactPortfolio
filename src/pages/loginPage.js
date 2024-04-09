import React, { useState , useEffect} from 'react';
import { auth } from '../firebase/firebaseConfig';
import './styleLogin.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState('');
  

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const signIn = async (e) => {
    e.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email, password);
      console.log("Logged in successfully");
    } catch (error) {
      console.error("Error signing in: ", error.message);
    }
  };

  return (
    <div className="background-image">
      {loading ? (
        <div className='container-spinner'>
          <div className="loading-animation"></div>
        </div>
      ) : (
        <div className='container-login fade-in'>
          <div className='container-form-login'>
            <form className='form-login' onSubmit={signIn}>
              <div className="form-group">
                <input
                  type="email"
                  id="email-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <label htmlFor="email-input">Email</label>
              </div>
              <div className="form-group">
                <input
                  type="password"
                  id="password-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <label htmlFor="password-input">Password</label>
              </div>
              <div className='container-button'>
                <button className='button-login' type="submit">Login</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginPage;
