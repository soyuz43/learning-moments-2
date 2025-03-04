// src/views/ApplicationViews.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import { Authorized } from "./Authorized";
import { NavBar } from "../components/NavBar";
import { AllPostsWrapper } from "../components/post/wrappers/AllPostsWrapper";
import { MyPostsListWrapper } from "../components/post/wrappers/MyPostsListWrapper";
import { PostDetailsWrapper } from "../components/post/wrappers/PostDetailsWrapper";
import { NewPost } from "../components/NewPost";
import { EditPost } from "../components/EditPost";
import { EditProfile } from "../components/EditProfile";
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";

export const ApplicationViews = () => {
  const currentUser = localStorage.getItem("learning_user")
    ? JSON.parse(localStorage.getItem("learning_user"))
    : null;

  return (
    <>
      <NavBar />
      <div className="pt-[72px] px-6">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="*"
            element={
              <Authorized>
                <Routes>
                  <Route
                    path="/"
                    element={<AllPostsWrapper currentUser={currentUser} />}
                  />
                  <Route
                    path="/my-posts"
                    element={<MyPostsListWrapper currentUser={currentUser} />}
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
                    element={<PostDetailsWrapper currentUser={currentUser} />}
                  />
                  <Route
                    path="/edit-profile"
                    element={
                      <EditProfile
                        user={currentUser}
                        onSaveProfile={() => {}}
                      />
                    }
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
