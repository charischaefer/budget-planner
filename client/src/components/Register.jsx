import React, { useState } from "react";
import axios from "axios";
import './register.css';
import { useNavigate } from "react-router-dom";

function Register() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    email: "",
  });

  const [data, setData] = useState(null);
  const [registerMessage, setRegisterMessage] = useState("");
  const { username, password, firstname, lastname, email, image } = credentials;
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const register = async () => {
    try {
      const { data } = await axios("/api/users/register", {
        method: "POST",
        data: credentials,
      });
      // Store it locally
      localStorage.setItem("token", data.token);
      console.log(data.message);
      setRegisterMessage("Successfully registered");
        // navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="Register">
      <h1>Registration Form</h1>
      <div>
        <label>Username </label>
        <input
          value={username}
          onChange={handleChange}
          name="username"
          type="text"
          placeholder="Username"
        />
        <br />
        <label>Password  </label>
        <input
          value={password}
          onChange={handleChange}
          name="password"
          type="password"
          placeholder="Password"
        />
        <br />
        <label>Firstname  </label>
        <input
          value={firstname}
          onChange={handleChange}
          name="firstname"
          type="text"
          placeholder="Firstname"
        />
        <br />
        <label>Lastname  </label>
        <input
          value={lastname}
          onChange={handleChange}
          name="lastname"
          type="text"
          placeholder="Lastname"
        />
        <br />
        <label>Email  </label>
        <input
          value={email}
          onChange={handleChange}
          name="email"
          type="email"
          placeholder="Email"
        />
        <br />
        <input
          value={image}
          onChange={handleChange}
          name="image"
          type="image"
          className="form-control mb-2"
        />
        <br />
        <div className="d-flex gap-2 justify-content-center">
          <button type="submit" className="btn btn-primary" onClick={register}>
            Register
          </button>
        </div>
      </div>
      {registerMessage && (
        <div className="text-center p-4">
          <div className="alert alert-success" style={{ marginTop: "20px" }}>{registerMessage}</div>
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

export default Register;