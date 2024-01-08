import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../App";
import "../Styles/Posts.scss";
import Postcard from "../Components/Postcard";
import {
  MdOutlineFilterList,
  MdOutlineFilterListOff,
  MdClose,
} from "react-icons/md";

const Posts = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const [posts, setPosts] = useState([]);
  const [filterPopUp, setFilterPopUp] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleSort = (type) => {
    setSortBy(type);
    // setFilterPopUp(false);
  };

  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPosts = posts.filter((post) => {
    if (categoryFilter && post.category !== categoryFilter) {
      return false;
    }
    if (
      searchTerm &&
      !post.title.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortBy === "latest") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sortBy === "oldest") {
      return new Date(a.createdAt) - new Date(b.createdAt);
    } else if (sortBy === "A-Z") {
      return a.title.localeCompare(b.title);
    } else if (sortBy === "Z-A") {
      return b.title.localeCompare(a.title);
    }
    return 0;
  });

  const removeFilters = () => {
    setSortBy("");
    setCategoryFilter("");
    setSearchTerm("");
  };

  return (
    <div className={`posts ${theme}`}>
      <h1>Total {posts.length} Posts</h1>
      <div className="postFilterNav">
        <div className="filterSection">
          <button
            className="filterBtn"
            onClick={() => setFilterPopUp(!filterPopUp)}
          >
            {filterPopUp ? <MdClose /> : <MdOutlineFilterList />}
          </button>
          {filterPopUp && (
            <div className="filters">
              <button onClick={() => handleSort("latest")}>latest first</button>
              <button onClick={() => handleSort("oldest")}>oldest first</button>
              <button onClick={() => handleSort("A-Z")}>A-Z</button>
              <button onClick={() => handleSort("Z-A")}>Z-A</button>
              <select
                name="category"
                id="category"
                onChange={handleCategoryChange}
                value={categoryFilter}
              >
                <option value="">All</option>
                <option value="Gaming">Gaming</option>
                <option value="Coding">Coding</option>
                <option value="Tech">Tech</option>
                <option value="News">News</option>
                <option value="Tricks">Tricks</option>
              </select>
            </div>
          )}
        </div>

        <input
          type="text"
          placeholder="Search posts"
          value={searchTerm}
          onChange={handleSearch}
        />
        <button className="removeFltrBtn" onClick={removeFilters}>
          <span>
            <MdOutlineFilterListOff />
          </span>
          Remove all filters
        </button>
      </div>
      <div className="allPosts">
        {categoryFilter !== "" ? (
          <h2>
            {sortedPosts.length === 0 ? "No " : sortedPosts.length}
            {sortedPosts.length === 1 ? " post" : " posts"} from{" "}
            {categoryFilter} category
          </h2>
        ) : (
          <></>
        )}{" "}
        {sortBy !== "" ? <h2>Sorted by {sortBy}</h2> : <></>}
        {sortedPosts.length > 0 ? (
          sortedPosts.map((post) => (
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

export default Posts;
