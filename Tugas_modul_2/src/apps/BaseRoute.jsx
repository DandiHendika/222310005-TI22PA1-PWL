import React from "react";
import { Route, Routes } from "react-router-dom";
import ChapterOne from "../modules/chapter-1/ChapterOne";
import { NotFound } from "../errors/404";
import ChapterTwo from "../modules/chapter-2/ChapterTwo";

export default function BaseRoute() {
  return (
    <React.Suspense>
      <Routes>
        <Route index element={<ChapterOne />} />
        <Route path="chapter-two" element={<ChapterTwo />} />
        <Route path="home" element={<Home />} />
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
