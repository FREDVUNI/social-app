import React, { useContext } from "react";
import "./login.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/Auth";

const Login = () => {
  const { login } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    login();
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
          <form onSubmit={handleLogin}>
            <input
              type="text"
              name="username"
              className="boxShadow"
              placeholder="Enter username"
            />
            <input
              type="password"
              name="password"
              className="boxShadow"
              placeholder="Enter password"
            />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
