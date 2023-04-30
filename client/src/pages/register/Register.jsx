import React, { useContext, useState } from "react";
import "./register.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/Auth";

const Register = () => {
  const { register } = useContext(AuthContext);

  const [inputs, setInputs] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(inputs);
    } catch (err) {
      setError(err.response.data);
      // console.log(err);
    }
  };
  return (
    <div className="register">
      <div className="card boxShadow">
        <div className="left">
          <h1>social app.</h1>
          <p>
            Allows users to create and share content, connect with others, and
            engage in online communication and networking.
          </p>
          <span>Already have an account ?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          {error && error}
          <form onSubmit={handleRegister}>
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              className="boxShadow"
              value={inputs.username}
              onChange={handleChange}
            />
            <input
              type="text"
              name="name"
              placeholder="Enter name"
              className="boxShadow"
              value={inputs.name}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              className="boxShadow"
              value={inputs.email}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              className="boxShadow"
              value={inputs.password}
              onChange={handleChange}
            />
            <button>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
