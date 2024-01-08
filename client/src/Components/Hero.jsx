import React, { useContext } from "react";
import "../Styles/Hero.scss";
import { ThemeContext } from "../App";
import logo from '../Assets/character.svg'
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Hero = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <div className={`hero ${theme}`}>
      <div className="left">
      <h1>Stay Updated with AVA Blog</h1>
      <p>your go-to source for bite-sized brilliance in tech. Uncover quick insights, tips, and fascinating tidbits that will ignite your curiosity and keep you ahead of the curve. Ready to explore? Let's dive in together! </p>
      <button><Link to={'/posts'}>Discover More</Link> <FaArrowRight/> </button>
      </div>
      <div className="right">
      <img src={logo} alt="" />
      </div>
    </div>
  );
};

export default Hero;
