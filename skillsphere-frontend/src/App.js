// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import CourseDetail from "./components/CourseDetails"; // Added CourseDetail import
import "./styles.css";

export default function App() {
  const [auth, setAuth] = useState({ isAuthenticated: false, user: "", role: "" });

  // ✅ Handle user login
  const handleLogin = (email, role) => {
    setAuth({ isAuthenticated: true, user: email, role });
  };

  // ✅ Handle user logout
  const handleLogout = () => {
    setAuth({ isAuthenticated: false, user: "", role: "" });
  };

  return (
    <Router>
      {/* Top Navigation Bar */}
      <Navbar auth={auth} onLogout={handleLogout} />

      <div className="container mt-4">
        <Routes>
          {/* ✅ Public Routes */}
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup />} />

          {/* ✅ Protected Routes for Admin */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute auth={auth} requiredRole="admin">
                <AdminDashboard user={auth.user} onLogout={handleLogout} />
              </ProtectedRoute>
            }
          />

          {/* ✅ Protected Routes for User */}
          <Route
            path="/user"
            element={
              <ProtectedRoute auth={auth} requiredRole="user">
                <UserDashboard user={auth.user} onLogout={handleLogout} />
              </ProtectedRoute>
            }
          />

          {/* ✅ Course Details Route (accessible after login) */}
          <Route
            path="/course/:courseId"
            element={
              <ProtectedRoute auth={auth} requiredRole="user">
                <CourseDetail />
              </ProtectedRoute>
            }
          />

          {/* ✅ Default fallback route */}
          <Route path="*" element={<Login onLogin={handleLogin} />} />
        </Routes>
      </div>
    </Router>
  );
}
