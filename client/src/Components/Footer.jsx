import React, { useContext } from "react";
import { ThemeContext } from "../App";
import logo from "../Assets/logo.svg";
import "../Styles/Footer.scss";
import { FiInstagram, FiGithub, FiLinkedin } from "react-icons/fi";
import { Link } from "react-router-dom";

let year = new Date().getFullYear();

const Footer = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <footer className={`footer ${theme}`}>
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <main>
{ /*       <div className="links">
          <Link to="/">Home</Link>
          <Link to="/">Tech</Link>
          <Link to="/">Gaming</Link>
          <Link to="/">News</Link>
  </div>*/}
        <div className="socials">
          <a href="https://github.com/Webdevava"><FiGithub /></a>
          <a href="https://www.linkedin.com/in/ankur-auti-862953250/"><FiLinkedin /></a>
          <a href="https://www.instagram.com/ankurauti382/"><FiInstagram /></a>
        </div>
      </main>
      <div className="copyright">
        <p>Copyright@{year}</p>
        <p>
          <span>, </span>Designed by Webdevava
        </p>
      </div>
    </footer>
  );
};

export default Footer;
