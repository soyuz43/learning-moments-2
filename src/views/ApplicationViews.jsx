// src/views/ApplicationViews.jsx
import { Routes, Route } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import { AllPostsWrapper } from "../components/post/wrappers/AllPostsWrapper";
import { MyPostsListWrapper } from "../components/post/wrappers/MyPostsListWrapper";
import { PostDetailsWrapper } from "../components/post/wrappers/PostDetailsWrapper";
import { NewPost } from "../components/NewPost";
import { Favorites } from "../components/favorites";
import { EditPost } from "../components/EditPost";
import { EditProfile } from "../components/EditProfile";
import { MyComments } from "../components/MyComments";

export const ApplicationViews = () => {
  const currentUser = localStorage.getItem("learning_user")
    ? JSON.parse(localStorage.getItem("learning_user"))
    : null;

  return (
    <>
      <NavBar />
      <div className="pt-[72px] px-6">
        <Routes>
          <Route
            path="/"
            element={<AllPostsWrapper currentUser={currentUser} />}
          />
          <Route
            path="/favorites"
            element={<Favorites currentUser={currentUser} />}
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
              <EditProfile user={currentUser} onSaveProfile={() => {}} />
            }
          />
          <Route
            path="/my-comments"
            element={<MyComments currentUser={currentUser} />}
          />
          <Route
            path="*"
            element={<div className="text-white">Not Found</div>}
          />
        </Routes>
      </div>
    </>
  );
};
