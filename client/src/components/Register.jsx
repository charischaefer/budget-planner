import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    firstname: '' ,
    lastname: '',
    email: '',
    image: '',
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
      console.log(data.message, data.token);
      setRegisterMessage("Successfully registered");
      navigate("/login");
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
          <br />
          <input
            value={firstname}
            onChange={handleChange}
            name="firstname"
            type="firstname"
            className="form-control mb-2"
          />
           <br />
          <input
            value={lastname}
            onChange={handleChange}
            name="lastname"
            type="lastname"
            className="form-control mb-2"
          />
        <br />
          <input
            value={email}
            onChange={handleChange}
            name="email"
            type="email"
            className="form-control mb-2"
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
          <button className="btn btn-primary" onClick={register}>Register</button>
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