import "./Signup.css";
import React, {  useState } from "react";
import {link} from '../backend'
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    username: "",
    password: "",
  });
  const submit = () => {
    fetch(link+"register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // window.location.href = "/login";
        navigate('/login', { replace: true });
      })
      .catch((error) => {
        console.error("err", error);
      });
  };
  return (
    <>
      <div className="signup-main">
        <div className="signup-item-container">
          <label htmlFor="username">Username:</label>
          <input
            onChange={(e) =>
              setCredentials({ ...credentials, username: e.target.value })
            }
            type="text"
            name="username"
            value={credentials.username}
          />
        </div>
        <div className="signup-item-container">
          <label htmlFor="email">Email:</label>
          <input
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
            }
            type="email"
            name="firstname"
            value={credentials.email}
          />
        </div>
        {/* <div className="signup-item-container">
          <label htmlFor="lastname">Lastname:</label>
          <input onChange={(e)=> setCredentials({...credentials, lastname: e.target.value})} type="text"  name="lastname" value={credentials.lastname} />
        </div> */}
        <div className="signup-item-container">
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
        <div className="signup-item-container">
          <button onClick={submit}>Sign up</button>
        </div>
      </div>
    </>
  );
};

export default Signup;
