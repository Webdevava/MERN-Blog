import React, { useContext, useEffect, useState } from "react";
import "../Styles/EditPost.scss";
import { ThemeContext } from "../App";
import { BsUpload } from "react-icons/bs";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../Components/Editor";

const EditPost = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const {id} = useParams()
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [coverLink, setCoverLink] = useState("");
  const [uploadOption, setUploadOption] = useState("file");
  const [category, setCategory] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setredirect] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3000/post/'+id)
      .then(response => {
        response.json().then(postInfo => {
          setTitle(postInfo.title);
          setContent(postInfo.content);
          setSummary(postInfo.summary);
          setCategory(postInfo.category)
          setCoverLink(postInfo.coverLink)
        });
      });
  }, []);

  async function updatePost(e) {
    e.preventDefault();

    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("coverLink", coverLink);
    data.set("category", category);
    data.set("id", id);

    if (uploadOption === "file" && files.length > 0) {
      data.set("file", files[0]);
    } else if (uploadOption === "coverLink") {
      data.set("coverLink", coverLink);
    }

    const response = await fetch(`http://localhost:3000/post`, {
        method: "PUT",
        body: data,
        credentials: 'include'
      });
      

    if (response.ok) {
      setredirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/post/"+id} />;
  }

  let filename = files.length > 0 ? JSON.stringify(files[0].name) : "";

  return (
    <div className={`editPost ${theme}`}>
      <h1>Editing post</h1>
      <form onSubmit={updatePost}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          type="text"
          placeholder="Summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          required
        ></textarea>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
        <option value="">Select a category</option>
        <option value="Tech">Tech</option>
        <option value="Tricks">Tricks</option>
        <option value="Gaming">Gaming</option>
        <option value="Travel">Travel</option>
        <option value="Coding">Coding</option>
        </select>

        <select
        value={uploadOption}
        onChange={(e) => setUploadOption(e.target.value)}
        required
      >
        <option value="file">Upload File</option>
        <option value="coverLink">Input Link</option>
      </select>

      {uploadOption === "file" && (
        <>
          <label htmlFor="file">
            {!filename ? (
              <span>
                <BsUpload />
                <p>Upload an image or file</p>
              </span>
            ) : (
              <span>
                <p>Click to choose another image</p>
                <p className="filename">{filename}</p>
              </span>
            )}
          </label>
          <input
            type="file"
            onChange={(e) => setFiles(e.target.files)}
            id="file"
            required={uploadOption === "file"}
          />
        </>
      )}

      {uploadOption === "coverLink" && (
        <input
          type="text"
          placeholder="Enter Link"
          value={coverLink}
          onChange={(e) => setCoverLink(e.target.value)}
          required={uploadOption === "coverLink"}
        />
      )}

        <Editor onChange={setContent} value={content} />

        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditPost;
