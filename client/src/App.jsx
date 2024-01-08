import React, { createContext, useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.scss';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import ErrorPage from './Pages/ErrorPage';
import Login from './Pages/Login';
import Register from './Pages/Register';
import PostPage from './Pages/PostPage';
import Footer from './Components/Footer';
import { UserContext, UserContextProvider } from './UserContext';
import CreatePost from './Pages/CreatePost';
import UserPage from './Pages/UserPage';
import EditPost from './Pages/EditPost';
import Posts from './Pages/Posts';
import Author from './Pages/Author';

export const ThemeContext = createContext('');


const App = () => {
  const [theme, setTheme] = useState('');



  useEffect(() => {
    // Check the user's system preferences for color scheme
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Set the initial theme based on system preferences
    setTheme(prefersDarkMode ? 'dark' : '');

    // Listen for changes in system preferences
    const darkModeListener = (e) => {
      setTheme(e.matches ? 'dark' : '');
    };

    // Add event listener for changes in system preferences
    window.matchMedia('(prefers-color-scheme: dark)').addListener(darkModeListener);

    // Clean up the event listener when the component unmounts
    return () => {
      window.matchMedia('(prefers-color-scheme: dark)').removeListener(darkModeListener);
    };
  }, []);

  const toggleTheme = () => {
2
    setTheme((curr) => (curr === "dark" ? "" : "dark"));
  };

  return (
    <UserContextProvider>
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Router>
        <div className={`app ${theme}`}>
       
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/author/:author" element={<Author />} />
            <Route path="/user/:id" element={<UserPage />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/edit/:id" element={<EditPost />} />
            <Route path="/post/:id" element={<PostPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </ThemeContext.Provider>
  </UserContextProvider>
  );
};

export default App;
