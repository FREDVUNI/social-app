import React, { useContext, useState } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/Auth";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/");
    } catch (err) {
      setError(err.response.data);
      // console.log(error);
    }
  };

  return (
    <div className="login boxShadow">
      <div className="card">
        <div className="left">
          <h1>Hello world.</h1>
          <p>
            Allows users to create and share content, connect with others, and
            engage in online communication and networking.
          </p>
          <span>Don't have an account yet ?</span>
          <Link to="/signup">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <span className="text-error">{error && error}</span>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              name="username"
              className="boxShadow"
              placeholder="Enter username"
              value={inputs.username}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              className="boxShadow"
              placeholder="Enter password"
              value={inputs.password}
              onChange={handleChange}
            />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
