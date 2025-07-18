import React from "react";
import { Route, Routes } from "react-router-dom";
import ChapterOne from "../modules/chapter-1/ChapterOne";
import { NotFound } from "../errors/404";
import ChapterTwo from "../modules/chapter-2/ChapterTwo";
import Login from "../auth/Login";
import ChapterThree from "../modules/chapter-3/ChapterThree";
import PrivateRoute from "./PrivateRoute";
import SignOutPage from "../auth/SignOutPage";
import Tugas from "../modules/tugas-6/tugas";

export default function BaseRoute() {
  return (
    <React.Suspense fallback={<div>Loading... </div>}>
      <Routes>
        <Route
          index
          element={
            <PrivateRoute>
              <ChapterOne />
            </PrivateRoute>
          }
        />
        <Route
          path="chapter-two"
          element={
            <PrivateRoute>
              <ChapterTwo />
            </PrivateRoute>
          }
        />
        <Route
          path="chapter-three"
          element={
            <PrivateRoute>
              <ChapterThree />
            </PrivateRoute>
          }
        />
        <Route
          path="tugas-6"
          element={
            <PrivateRoute>
              <Tugas />
            </PrivateRoute>
          }
        />
        <Route path="sign-in" element={<Login />} />
        <Route path="login" element={<Login />} />
        {/* <Route path="sign-out" element={<Login />} /> */}
        <Route path="sign-out" element={<SignOutPage />} />
        <Route path="chapter-1" element={<ChapterOne />} />
        <Route path="chapter-2" element={<ChapterTwo />} />
        <Route path="chapter-3" element={<ChapterThree />} />
        <Route path="/" element={<ChapterOne />} />
        <Route path="/home" element={<ChapterTwo />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </React.Suspense>
  );
}

const Home = () => {
  return (
    <div className="text-center">
      <h1>Welcome to Home Page</h1>
    </div>
  );
};

const About = () => {
  return (
    <div className="text-center">
      <h1>Welcome to About Page</h1>
    </div>
  );
};
