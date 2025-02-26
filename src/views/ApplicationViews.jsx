// src/views/ApplicationViews.jsx

import { Routes, Route } from "react-router-dom";
import { AllPosts } from "../components/AllPosts";
import { Login } from "../components/Login";
import { Register } from "../components/Register";
import { Authorized } from "../views/Authorized";

export const ApplicationViews = () => {
  return (
    <Routes>
      <Route path="/" element={
        <Route index element={<AllPosts />} />
      } />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={
        <Authorized>
          <ApplicationViews />
        </Authorized>
      } />
    </Routes>
  );
};