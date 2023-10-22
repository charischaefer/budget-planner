import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [credentials, setCredentials] = useState({
    username: "budget",
    password: "planner",
  });

  const [data, setData] = useState(null);

  const { username, password } = credentials;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const login = async () => {
    try {
      const { data } = await axios("/api/auth/login", {
        method: "POST",
        data: credentials,
      }); 
  
      localStorage.setItem("token", data.token);
      console.log(data.message, data.token);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
  };

  const requestData = async () => {
    try {
      const { data } = await axios("/api/auth/profile", {
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
        <input
          value={username}
          onChange={handleChange}
          name="username"
          type="text"
          className="form-control mb-2"
        />
        <br />
        <input
          value={password}
          onChange={handleChange}
          name="password"
          type="password"
          className="form-control mb-2"
        />
        <div className="d-flex gap-2 justify-content-center">
          <button className="btn btn-primary" onClick={login}>
            Log in
          </button>
          <button className="btn btn-outline-dark ml-2" onClick={logout}>
            Log out
          </button>
        </div>
      </div>
      
       {data && (
        <div className="text-center p-4">
          <div className="alert">{data}</div>
        </div>
      )}
    </div>
  );
}

export default Login;