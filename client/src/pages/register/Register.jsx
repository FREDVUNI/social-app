import React from "react";
import "./register.scss";

const Register = () => {
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
          <button>Login</button>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form action="">
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              className="boxShadow"
            />
            <input
              type="text"
              name="name"
              placeholder="Enter name"
              className="boxShadow"
            />
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              className="boxShadow"
            />
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              className="boxShadow"
            />
            <button>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
