import React, { useContext, useState } from "react";
import "../Styles/Register.scss";
import { ThemeContext } from "../App";
import { Link, Navigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Register = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const [redirect, setRedirect] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const register = async (e) => {
    e.preventDefault();
    const response = await fetch("https://blog-backend-3bya.onrender.com/register", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      alert("Resgistration Successful");
      setRedirect(true);
    } else {
      alert("Resgistration Failed! try changing username");
    }
    // console.log(response)
  };

  if (redirect) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className={`register ${theme}`} onSubmit={register}>
      <form className="reg_form">
        <h1>Register</h1>
        <input
          type="text"
          id="name"
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
        <button type="submit">Register</button>
        <div className="form_footer">
          <p>Already have an account?</p>
          <Link to="/login">login</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
