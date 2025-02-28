// src/views/ApplicationViews.jsx
import { Routes, Route } from "react-router-dom";
import { AllPosts } from "../components/AllPosts";
import { MyPosts } from "../components/MyPosts";
import { NewPost } from "../components/NewPost";
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import { Authorized } from "../views/Authorized";
import { NavBar } from "../components/NavBar";

export const ApplicationViews = () => {
  const currentUser = localStorage.getItem("learning_user")
    ? JSON.parse(localStorage.getItem("learning_user"))
    : null;

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <NavBar />
      <main className="flex-1 pt-16">
        <Routes>
          <Route path="/" element={<AllPosts />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route
            path="/my-posts"
            element={
              <Authorized>
                <MyPosts currentUser={currentUser} />
              </Authorized>
            }
          />
          <Route
            path="/new-post"
            element={
              <Authorized>
                <NewPost currentUser={currentUser} />
              </Authorized>
            }
          />
          
          {/* Additional routes */}
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </main>
    </div>
  );
};
