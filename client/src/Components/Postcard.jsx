import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../App.jsx";
import "../Styles/Postcard.scss";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { MdArrowOutward } from "react-icons/md";

const Postcard = ({
  title,
  summary,
  content,
  category,
  cover,
  coverLink,
  date,
  author,
  id,
}) => {
  const { theme } = useContext(ThemeContext);
  const [truncatedDesc, setTruncatedDesc] = useState("");

  useEffect(() => {
    // Function to limit the description to 20 words
    const limitDescription = () => {
      if (typeof summary === "string") {
        const words = summary.split(" ").slice(0, 20).join(" ");
        setTruncatedDesc(words + "...");
      } else {
        setTruncatedDesc("No summary available");
      }
    };

    limitDescription();
  }, [summary]);

  return (
    <div className={`postcard ${theme}`}>
      <Link to={`/post/${id}`} className="postcard__link">
        {coverLink ? (
          <img src={coverLink} alt="" className="postcard__image" />
        ) : (
          cover && (
            <img
              src={`http://localhost:3000/${cover}`}
              alt=""
              className="postcard__image"
            />
          )
        )}
      </Link>
      <div className="postcard__content">
        <h1 className="postcard__title">
          <Link to={`/post/${id}`}>{title}<MdArrowOutward className="postcard__arrow"/></Link>
        </h1>
        <p className="postcard__summary">{truncatedDesc}</p>
        <div className="postcard__category">#{category}</div>
        <div className="postcard__footer">
          <div className="postcard__author">
            <img
              className="postcard__avatar"
              src="https://github.com/Webdevava.png"
              alt=""
            />
            <div className="postcard__author-info">
              <span className="postcard__author-username">{author}</span>
            </div>
          </div>
          <p className="postcard__timestamp">
            {format(new Date(date), "MMM-d-yyyy | HH:mm")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Postcard;
