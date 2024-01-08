import React, { useContext, useState } from "react";
import "../Styles/CreatePost.scss";
import { ThemeContext } from "../App";
import { BsUpload } from "react-icons/bs";
import { Navigate } from "react-router-dom";
import Editor from "../Components/Editor";

const CreatePost = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [uploadOption, setUploadOption] = useState("file");
  const [files, setFiles] = useState("");
  const [coverLink, setCoverLink] = useState("");
  const [redirect, setRedirect] = useState(false);

  async function createNewPost(e) {
    e.preventDefault();

    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("coverLink", coverLink);
    data.set("category", category);

    if (uploadOption === "file" && files.length > 0) {
      data.set("file", files[0]);
    } else if (uploadOption === "coverLink") {
      data.set("coverLink", coverLink);
    }

    console.log("Request data:", JSON.stringify(Object.fromEntries(data.entries())));

    const response = await fetch("http://localhost:3000/post", {
      method: "POST",
      body: data,
      credentials: "include",
    });

    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  let filename = files.length > 0 ? JSON.stringify(files[0].name) : null;


  return (
    <div className={`createPost ${theme}`}>
      <h1>Create new post</h1>
      <form onSubmit={createNewPost} encType="multipart/form-data">
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
        <button type="submit">Publish</button>
      </form>
    </div>
  );
};

export default CreatePost;
