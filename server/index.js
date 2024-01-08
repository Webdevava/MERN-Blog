const express = require("express");
const cors = require("cors");
const User = require("./models/User");
const Post = require("./models/Post");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const app = express();

const salt = bcrypt.genSaltSync(10);
const secret = "yourSecretKey"; // Replace with your secret key

// Middleware setup
app.use(cors({ credentials: true, origin: "https://avablogs.vercel.app/" }));

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

// Database connection
mongoose.connect("mongodb+srv://ankurauti:ClUP0QZwDndPfFU4@cluster0.yymgjqe.mongodb.net/?retryWrites=true&w=majority");

// Registration endpoint
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
});

// Login endpoint
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const userDoc = await User.findOne({ username });
  const passOk = bcrypt.compareSync(password, userDoc.password);
  if (passOk) {
    //login
    jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token).json("ok");
    });
  } else {
    res.status(400).json("wrong credentials");
  }
});

// Logout endpoint
app.post("/logout", (req, res) => {
  res.clearCookie("token").json("ok");
});

// Profile endpoint
app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});

// Profile post endpoint
app.post("/profile", async (req, res) => {
  const { token } = req.cookies;

  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) {
      console.error("Error verifying token:", err);
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {
      // Fetch user information from MongoDB using the decoded token's ID
      const user = await User.findById(info.id);

      // Check if the user exists
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Return user information
      const userData = {
        id: user._id,
        username: user.username,
        // Add other fields as needed
      };

      res.json(userData);
    } catch (dbError) {
      console.error("Error fetching user information:", dbError);
      res.status(500).json({ error: "Internal Server Error 2222" });
    }
  });
});


// Post creation endpoint
app.post("/post", upload.single("file"), async (req, res) => {
  try {
    // Check if req.file is defined
    if (!req.file && !req.body.coverLink) {
      return res
        .status(400)
        .json({ error: "No file uploaded and no cover link provided" });
    }

    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
      if (err) {
        console.error("Error verifying token:", err);
        return res.status(401).json({ error: "Unauthorized" });
      }

      const { title, summary, content, category, coverLink } = req.body;

      try {
        let coverPath = "";

        if (req.file) {
          const { originalname, path } = req.file;
          const parts = originalname.split(".");
          const ext = parts[parts.length - 1];
          const newPath = path + "." + ext;
          fs.renameSync(path, newPath);
          coverPath = newPath;
        } else if (coverLink) {
          // Handle cover link case
          coverPath = coverLink;
        }

        const postDoc = await Post.create({
          title,
          summary,
          content,
          category,
          coverLink,
          cover: coverPath,
          author: info.id,
        });

        return res.status(201).json({ success: true, post: postDoc });
      } catch (dbError) {
        console.error("Error creating post:", dbError);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    });
  } catch (error) {
    console.error("An error occurred while processing the post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Post update endpoint
app.put('/post', upload.single('file'), async (req, res) => {
  let newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    newPath = path + '.' + ext;
    fs.renameSync(path, newPath);
  }

  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { id, title, summary, content, coverLink, category, cover } = req.body;
    const postDoc = await Post.findById(id);
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
    if (!isAuthor) {
      return res.status(400).json('you are not the author');
    }
    await postDoc.updateOne({
      title,
      summary,
      content,
      coverLink,
      category,
      cover: newPath ? newPath : postDoc.cover,
    });

    res.json(postDoc);
  });
});

// Post deletion endpoint
app.delete("/post/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const postDoc = await Post.findById(id);
    if (!postDoc) {
      return res.status(404).json({ error: "Post not found" });
    }

    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
      if (err) {
        console.error("Error verifying token:", err);
        return res.status(401).json({ error: "Unauthorized" });
      }

      const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
      if (!isAuthor) {
        return res.status(403).json({ error: "You are not the author of this post" });
      }

      await postDoc.deleteOne();
      return res.json({ success: true });
    });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get all posts endpoint
app.get("/post", async (req, res) => {
  const posts = await Post.find()
    .populate("author", ["username"])
    .sort({ createdAt: -1 })
    .limit(20);
  res.json({ posts });
});

// Get a specific post endpoint
app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await Post.findById(id).populate("author", ["username"]);
  res.json(postDoc);
});

// Server start
app.listen(3000, () => {
  console.log("Server running");
});
