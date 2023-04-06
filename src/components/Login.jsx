import "./Login.css";
import {link} from '../backend'
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  

  const submit = () => {
    fetch(link+"login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
      .then((response) => response.json())
      .then((data) => {
        // setHeaders({...headers,  "auth-token-access": data["auth-token-access"],
        // "auth-token-refresh": data["auth-token-refresh"]});
       
        localStorage.setItem("auth-token-refresh", data["auth-token-refresh"]);
          // window.location.href = "/main";
          //window.location.replace('https://codefrontend.com');
          navigate('/main', { replace: true });
      })
      .catch((error) => {
        console.error("err", error);
      });
  };
  
  return (
    <>
      <div className="login-main">
        <div className="login-email-container">
          <label htmlFor="username">Username:</label>
          <input
            onChange={(e) =>
              setCredentials({ ...credentials, username: e.target.value })
            }
            type="text"
            name="username"
            value={credentials.username}/>
        </div>
        <div className="login-password-container">
          <label htmlFor="pass">Password:</label>
          <input
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
            type="password"
            name="password"
            required
            value={credentials.password}
          />
        </div>
        <div className="login-submit-btn-container">
            <button onClick={submit}>Login</button>
        </div>

      </div>
    </>
  );
};

export default Login;
