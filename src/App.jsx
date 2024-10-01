import React, { useEffect, useState } from 'react';
import Home from './pages/Home/Home';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import Player from './pages/Player/Player';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebase';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// ProtectedRoute component to wrap protected routes
const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const App = () => {
  const [loading, setLoading] = useState(true); // Track loading state
  const [user, setUser] = useState(null); // Track logged-in user
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // User is logged in
      } else {
        setUser(null); // User is logged out
      }
      setLoading(false); // Finish loading when auth state is determined
    });

    return () => unsubscribe(); // Clean up listener on unmount
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display a loading message until auth state is determined
  }

  return (
    <div>
      <ToastContainer theme="dark" />
      <Routes>
        {/* Public route */}
        <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute user={user}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="player/:id"
          element={
            <ProtectedRoute user={user}>
              <Player />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
