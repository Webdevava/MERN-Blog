import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../App";
import "../Styles/Home.scss";
import Postcard from "../Components/Postcard";
// import Sidebar from "../Components/Sidebar";
import Hero from "../Components/Hero";

const Home = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://blog-backend-3bya.onrender.com/post")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data.posts);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className={`home ${theme}`}>
      <Hero />
        <div className="homePosts">
          {posts.length > 0 ? (
            posts.slice(0, 4).map((post) => (
              <Postcard
                key={post._id}
                id={post._id}
                title={post.title}
                summary={post.summary}
                content={post.content}
                category={post.category}
                cover={post.cover}
                coverLink={post.coverLink}
                date={post.createdAt}
                author={post.author.username}
              />
            ))
          ) : (
            <p className="noContent">Loading...</p>
          )}
        </div>
    </div>
  );
};

export default Home;
