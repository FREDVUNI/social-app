import React from "react";
import "./login.scss";

const Login = () => {
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
          <button>Register</button>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form action="">
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
            <button>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
