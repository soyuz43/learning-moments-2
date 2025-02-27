// src/views/ApplicationViews.jsx
import { Routes, Route } from "react-router-dom";
import { AllPosts } from "../components/AllPosts";
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import { Authorized } from "../views/Authorized";
import { NavBar } from "../components/NavBar";

export const ApplicationViews = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <NavBar />

      <main className="flex-1 pt-16 bg-gray-900 border-t-0">
        <Routes>
          <Route path="/" element={<AllPosts />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/authorized"
            element={
              <Authorized>
                {/* Add authorized routes here */}
              </Authorized>
            }
          />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </main>
    </div>
  );
};
