import React, { useContext, useState } from "react";
import "../Styles/Login.scss";
import { ThemeContext } from "../App";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Login = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const [redirect, setRedirect] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    const response = await fetch("https://blog-backend-3bya.onrender.com/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (response.ok) {
      alert("Login Successful");
      setRedirect(true);
    } else {
      alert("Wrong credentials!");
    }
  };

  if (redirect) {
    navigate("/");
    // window.location.reload();
    return null; // Return null to prevent the component from rendering while redirecting
  }

  return (
    <div className={`login ${theme}`}>
      <form className="log_form" onSubmit={login}>
        <h1>Login</h1>
        <input
          type="text"
          id="name"
          required={true}
          placeholder="Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <div className="passwordContainer">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            required={true}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {showPassword ? (
            <span>
              <FaRegEyeSlash onClick={togglePasswordVisibility} />
            </span>
          ) : (
            <span>
              <FaRegEye onClick={togglePasswordVisibility} />
            </span>
          )}
        </div>

        <button type="submit">Login</button>
        <div className="form_footer">
          <p>Don't have an account?</p>
          <Link to="/register">register</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
