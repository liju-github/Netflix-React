import React, { useState } from 'react';
import './Login.css';
import logo from '../../assets/logo.png';
import { login, signup } from '../../firebase/firebase';
import netflix_spinner from '../../assets/netflix_spinner.gif';



const Login = () => {
  const [signState, setSignState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading,setLoading] =useState(false)

  const user_auth = async (event) => {
    event.preventDefault();
    setLoading(true)
    try {
      if (signState === "Sign In") {
        await login(email, password);
        console.log("signin done");
      } else {
        await signup(name, email, password);
        console.log("signup done");
      }
    } catch (error) {
      setError(error.message);  
    }
    setLoading(false)
  };

  return (
    loading?<div className="netflix-spinner"><img src={netflix_spinner}></img></div>:
    <div className='login'>
      <img src={logo} className='login-logo' alt="logo" />
      <div className="login-form">
        <h1>{signState}</h1>
        {error && <p className="error-message">{error}</p>} 
        <form>
          {signState === "Sign Up" && (
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder='Your Name'
            />
          )}
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder='Email'
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password" 
            placeholder='Password'
          />
          <button onClick={(e) => user_auth(e)} type='submit'>
            {signState}
          </button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" />
              <label>Remember Me</label>
            </div>
            <div className="needhelp">Need Help?</div>
          </div>
        </form>
        <div className="form-switch">
          {signState === "Sign Up"
            ? <p>Already have an Account? <span onClick={() => setSignState("Sign In")}>Sign In Now</span></p>
            : <p>New to Netflix? <span onClick={() => setSignState("Sign Up")}>Sign Up Now</span></p>}
        </div>
      </div>
    </div>
  );
};

export default Login;
