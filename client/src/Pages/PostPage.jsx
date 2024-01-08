import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import "../Styles/PostPage.scss";
import { ThemeContext } from "../App";
import { format } from "date-fns";
import { UserContext } from "../UserContext";
import { MdDelete, MdEdit } from "react-icons/md";

const PostPage = () => {
  const [postInfo, setPostInfo] = useState(null);
  const { theme } = useContext(ThemeContext);
  const [redirect, setRedirect] = useState(false);
  const { userInfo } = useContext(UserContext);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    fetch(`https://blog-backend-3bya.onrender.com/post/${id}`)
      .then((response) => response.json())
      .then((postInfo) => {
        setPostInfo(postInfo);
      });
  }, [id]);

  if (!postInfo) {
    return <h1>NO CONTENT AVAILABLE</h1>;
  }

  const handleDelete = async () => {
    try {
      const response = await fetch(`https://blog-backend-3bya.onrender.com/post/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        setRedirect(true);
        console.log("Post deleted successfully");
      } else {
        console.error("Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const openConfirmation = () => {
    setShowConfirmation(true);
  };

  const closeConfirmation = () => {
    setShowConfirmation(false);
  };

  const confirmDelete = () => {
    handleDelete();
    closeConfirmation();
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className={`postpage ${theme}`}>
      {userInfo.id === postInfo.author._id && (
        <div className="actionBtns">
          <Link className="editPostBtn" to={`/edit/${postInfo._id}`}>
            <MdEdit /> Edit this post
          </Link>
          <button className="deletePostBtn" onClick={openConfirmation}>
            <MdDelete /> Delete this post
          </button>
        </div>
      )}

      {/* Confirmation Popup */}
      {showConfirmation && (
        <div className="confirmationPopup">
          <p>Are you sure you want to delete this post?</p>
          <div className="btns">
          <button className="yesBtn" onClick={confirmDelete}>Yes! Delete</button>
          <button className="noBtn" onClick={closeConfirmation}>No Don't</button>
          </div>

        </div>
      )}

      <div className="postContent">
        <div className="displayTexts">
          <h1 className="displayTitle">{postInfo.title}</h1>
          <p className="displayPara">{postInfo.summary}</p>
          <div className="displayFoot">
            <time className="info">
              {format(new Date(postInfo.createdAt), " dd/MM/yy HH:mm")}
            </time>
            <div className="editor">
              <p>editor:</p>
              <span>{postInfo.author.username}</span>
            </div>
          </div>
        </div>
        <div className="img">
          {postInfo.coverLink ? (
            <img src={postInfo.coverLink} alt="" className="displayImg" />
          ) : (
            postInfo.cover && (
              <img
                src={`http://localhost:3000/${postInfo.cover}`}
                alt=""
                className="displayImg"
              />
            )
          )}
        </div>
      </div>
      <div className="CreatedPost">
        <div dangerouslySetInnerHTML={{ __html: postInfo.content }} />
      </div>
    </div>
  );
};

export default PostPage;
