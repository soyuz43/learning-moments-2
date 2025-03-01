// src/views/ApplicationViews.jsx
import { Routes, Route } from "react-router-dom";
import { AllPosts } from "../components/AllPosts";
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import { MyPosts } from "../components/MyPosts";
import { NewPost } from "../components/NewPost";
import { EditPost } from "../components/EditPost";
import { PostDetails } from "../components/PostDetails";
import { Authorized } from "./Authorized";
import { NavBar } from "../components/NavBar";

export const ApplicationViews = () => {
  // 1. Retrieve the current user from localStorage
  const currentUser = localStorage.getItem("learning_user")
    ? JSON.parse(localStorage.getItem("learning_user"))
    : null;

  return (
    <>
      {/* Navbar stays fixed at the top */}
      <NavBar />

      {/* Page container to prevent content cutoff under navbar */}
      <div className="pt-[72px] px-6">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes (Require Authentication) */}
          <Route
            path="*"
            element={
              <Authorized>
                <Routes>
                  <Route
                    path="/"
                    element={<AllPosts currentUser={currentUser} />}
                  />
                  <Route
                    path="/my-posts"
                    element={<MyPosts currentUser={currentUser} />}
                  />
                  <Route
                    path="/new-post"
                    element={<NewPost currentUser={currentUser} />}
                  />
                  <Route
                    path="/edit-post/:postId"
                    element={<EditPost currentUser={currentUser} />}
                  />
                  <Route
                    path="/post/:postId"
                    element={<PostDetails currentUser={currentUser} />}
                  />
                  <Route
                    path="*"
                    element={<div className="text-white">Not Found</div>}
                  />
                </Routes>
              </Authorized>
            }
          />
        </Routes>
      </div>
    </>
  );
};
