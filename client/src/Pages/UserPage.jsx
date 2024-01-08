import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../App';
import '../Styles/UserPage.scss';
import Postcard from "../Components/Postcard";
import { UserContext } from '../UserContext';
import { Link, useParams } from 'react-router-dom';
import { IoLogOutOutline ,IoCreateOutline,IoLogInOutline ,IoPersonAddOutline    } from "react-icons/io5";


const UserPage = () => {
  const { theme } = useContext(ThemeContext);
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const { id } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/post")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data.posts);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/user/${id}`, {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const user = await response.json();
          setUserInfo(user);
        } else {
          // Handle error cases
          console.error('Error fetching user data');
        }
      } catch (error) {
        console.error('An error occurred while fetching user data:', error);
      }
    };

    fetchUserData();
  }, [id, setUserInfo]);

  const showConfirmationPopup = () => {
    setIsConfirmationVisible(true);
  };

  const closeConfirmationPopup = () => {
    setIsConfirmationVisible(false);
  };

  const handleLogout = () => {
    // Perform the logout action and close the confirmation popup
    setUserInfo(null);
    closeConfirmationPopup();
  };

  const filteredPosts = posts.filter(post => post.author.username === userInfo?.username);

  return (
    <div className={`userpage ${theme}`}>
      {userInfo ? (
        <>
          <h1>{userInfo.username}</h1>
          <button onClick={showConfirmationPopup}><IoLogOutOutline />LogOut</button><button><Link to={'/create'}><IoCreateOutline/>Create Post</Link></button>
          <div className="userPosts">
{filteredPosts.length > 0 ? (
  filteredPosts.map((post) => (
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
  <p className="noContent">You have not created any posts</p>
)}
</div>
        </>
      ) : (
        <>
        <button>
          <Link to={'/login'}><IoLogInOutline />Login</Link>
        </button>
        <button>
        <Link to={'/register'}><IoPersonAddOutline  />Register</Link>
      </button></>
      )}






      <div
        className={`confirmation-popup ${isConfirmationVisible ? 'show' : ''}`}
        onClick={closeConfirmationPopup}
      >
        <div className="popup-content">
          <p>Are you sure you want to logout?</p>
          <div className="logoutActions">
            <button onClick={handleLogout} className="logoutBtn">Yes, Logout</button>
            <button className="cancelBtn">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
