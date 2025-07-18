import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Headers() {
  const navigate = useNavigate();

  const Logout = (e) => {
    e.preventDefault();

    // Gunakan clear() untuk menghapus SEMUA data di localStorage
    localStorage.clear();

    // Arahkan ke halaman login
    setTimeout(() => {
      navigate("/login");
      // window.location.reload(); // Opsional: refresh halaman untuk memastikan state reset
    }, 1000);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to={"/"}>
          PWL | Web-Chat
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to={"/"}>
                Chapter-One
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={"chapter-two"}>
                Chapter-Two
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={"chapter-three"}>
                Chapter-Three
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={"tugas-6"}>
                Tugas-6
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              {localStorage.getItem("user-account") !== null ? (
                // Menggunakan <button> untuk aksi lebih tepat secara semantik
                <button className="btn nav-link px-3" onClick={Logout}>
                  Logout
                </button>
              ) : (
                <NavLink className="nav-link px-3" to={"login"}>
                  Login
                </NavLink>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}