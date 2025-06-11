import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import UsersPage from "./components/users/UsersPage";
import PostList from "./components/posts/PostList";

export default () => (
  <>
    <Router>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<UsersPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/posts" element={<PostList />} />
        <Route path="/posts/user/:userId" element={<PostList />} />
      </Routes>
    </Router>
  </>
);
