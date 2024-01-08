import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../App";
import "../Styles/Navbar.scss";
import logo from "../Assets/logo.svg";
import { Link, useLocation } from "react-router-dom";
import { BsMoonStarsFill, BsSunFill } from "react-icons/bs";
import { MdMenu, MdClose } from "react-icons/md";
import { UserContext } from "../UserContext";

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [show, setShow] = useState(false);
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [dropNavVisible, setDropNavVisible] = useState(false);

  const location = useLocation();
  const currentRoute = location.pathname;

  useEffect(() => {
    fetch("https://blog-backend-3bya.onrender.com/profile", {
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch user information");
        }
      })
      .then((user) => {
        setUserInfo(user);
      })
      .catch((error) => {
        console.error(error);
        // Handle error, e.g., redirect to login page
      });
  }, [setUserInfo]);


  const handleLogout = () => {
    fetch("http://localhost:3000/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
  };

  const username = userInfo?.username;

  return (
    <nav className={`navbar ${theme}`}>
      <Link to="/">
        <img src={logo} alt="" />
      </Link>
      <ul className={`nav_menu ${show ? "show" : ""}`}>
        <Link to="/">
          <li>
            Home
            {currentRoute === "/" && <hr />}
          </li>
        </Link>
        <Link to="/posts">
          <li>
            Posts
            {currentRoute === "/posts" && <hr />}
          </li>
        </Link>
        {username ? (
          <>
          <Link to={`/user/${userInfo.id}`}>
          <li>
            User
            {currentRoute === `/user/${userInfo.id}` && <hr />}
          </li>
        </Link>
          </>
        ) : (
          <Link to="/login">
            <li>
              Login
              {currentRoute === "/login" && <hr />}
            </li>
          </Link>
        )}
      </ul>
      <div className="buttons">
        <button onClick={toggleTheme} className="themeBtn">
          {theme === "dark" ? <BsSunFill /> : <BsMoonStarsFill />}
        </button>
        <button className="burger" onClick={() => setShow((prev) => !prev)}>
          {show ? <MdClose /> : <MdMenu />}
        </button>
      </div>

      <ul className={`burger_menu ${show ? "show" : "hide"}`}>
        <Link to="/">
          <li>
            Home
            {currentRoute === "/" && <hr />}
          </li>
        </Link>
        <Link to="/posts">
          <li>
            Posts
            {currentRoute === "/posts" && <hr />}
          </li>
        </Link>
        {username ? (
          <>
          <Link to={`/user/${userInfo.id}`}>
          <li>
            User
            {currentRoute === `/user/${userInfo.id}` && <hr />}
          </li>
        </Link>
          </>
        ) : (
          <Link to="/login">
            <li>
              Login
              {currentRoute === "/login" && <hr />}
            </li>
          </Link>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;