import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [data, setData] = useState(null);
  const [loginMessage, setLoginMessage] = useState("");
  const [logoutMessage, setLogoutMessage] = useState("");
  const { username, password } = credentials;
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const login = async () => {
    try {
      const { data } = await axios("/api/users/login", {
        method: "POST",
        data: credentials,
      });

      // Store it locally
      localStorage.setItem("token", data.token);
      console.log(data.message, data.token);
      setLoginMessage("Successfully logged in");
      setLogoutMessage("");
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setLogoutMessage("Successfully logged out");
    setLoginMessage("");
  };

  const requestData = async () => {
    try {
      const { data } = await axios("/api/users/profile", {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
  
      console.log(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <label>Username</label>
        <input
          value={username}
          onChange={handleChange}
          name="username"
          type="text"
          className="form-control mb-2"
          placeholder="username"
          
        />
        <br />
        <label>Password</label>
        <input
          value={password}
          onChange={handleChange}
          name="password"
          type="password"
          className="form-control mb-2"
          placeholder="password"
          
        />
        <br />
        <div className="d-flex gap-2 justify-content-center">
          <button className="btn btn-primary" onClick={login}>Log in</button>
          <button className="btn btn-outline-dark ul-2" onClick={logout}>Log out</button>
        </div>
      </div>
      <div className="text-center p-4">
        <button className="btn btn-outline-primary" onClick={()=>{login,navigate('/register',{replace:true})}}>
          Register
        </button>
      </div>
      <div className="text-center p-4">
        <button className="btn btn-outline-primary" onClick={requestData}>
          Request protected data
        </button>
      </div>
      

      {loginMessage && (
        <div className="text-center p-4">
          <div className="alert alert-success" style={{ marginTop: "20px" }}>{loginMessage}</div>
        </div>
      )}

      {logoutMessage && (
        <div className="text-center p-4">
          <div className="alert alert-success" style={{ marginTop: "20px" }}>{logoutMessage}</div>
        </div>
      )}

      {data && (
        <div className="text-center p-4">
          <div className="alert">{data}</div>
        </div>
      )}
    </div>
  );
}

export default Login;