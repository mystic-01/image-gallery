import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

import "./Login.css";

import { ReactComponent as BrandLogo } from "../../images/pixar.svg";
import { login, signup } from "../../actions/user";

const Login = ({ signUpPage }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const history = useHistory();
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("user"));
  if (user) history.push("/home");

  const submitHandler = (e) => {
    e.preventDefault();
    if (signUpPage) dispatch(signup(formData, history));
    else dispatch(login(formData, history));
  };

  const inputChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="login">
      <nav className="login__navbar">
        <section>
          <BrandLogo />
          <Link to="/login">
            <h3>Pixar.</h3>
          </Link>
        </section>
        <section className="login__navbarLinks">
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </section>
      </nav>
      <main className="login__content">
        <section className="login__textWrapper">
          <h1>
            Built for {">"}_<br /> Photographers
          </h1>
          <p>
            Pixar is a one of a kind inspirational photography platform. Sign up
            to get access to aesthetically pleasing images.
          </p>
        </section>
        <section className="login__formWrapper">
          <form autoComplete="off" onSubmit={submitHandler}>
            <h3>{signUpPage ? "Get Started" : "Login"}</h3>
            {signUpPage ? (
              <>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={inputChangeHandler}
                  autoFocus
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={inputChangeHandler}
                />
              </>
            ) : null}
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={inputChangeHandler}
              required
              autoFocus={signUpPage ? false : true}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={inputChangeHandler}
              required
            />
            {signUpPage ? (
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={inputChangeHandler}
              />
            ) : null}
            <button type="submit">
              {signUpPage ? (
                <span>Sign Up</span>
              ) : (
                <span>Login to your account</span>
              )}
              <ArrowForwardIcon />
            </button>
            <p>
              By clicking '{signUpPage ? "sign up" : "login"}', you agree to our
              Terms of Service and Privacy Policy.
            </p>
          </form>
        </section>
      </main>
      {signUpPage ? null : (
        <footer>
          <p>Privacy Policy</p>
          <p>Copyright &copy; 2021 | Pixar.</p>
        </footer>
      )}
    </div>
  );
};

export default Login;
