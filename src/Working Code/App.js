import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import Settings from './components/Settings';
import Auth from './components/Auth';
import Transactions from './components/Transactions';
import FraudSettings from './components/FraudSettings';
import UserProfile from './components/UserProfile';
import NavBar from './components/NavBar';
import { ToastContainer } from 'react-toastify';
import { auth } from './firebase';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loggedOut, setLoggedOut] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('Auth state changed:', user);
      setIsAuthenticated(!!user);
      setLoading(false);
      setLoggedOut(false); // Reset loggedOut state when auth state changes
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      console.log('Logging out...');
      await signOut(auth);
      setLoggedOut(true); // Set loggedOut to true on logout
      console.log('Logged out successfully');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>; // Show a loading message while checking authentication status
  }

  return (
    <Router>
      <div className="App">
        <Header />
        {isAuthenticated && <NavBar onLogout={handleLogout} />}
        <div className="content">
          <Routes>
            <Route path="/auth" element={<Auth loggedOut={loggedOut} />} />
            <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/auth" />} />
            <Route path="/settings" element={isAuthenticated ? <Settings /> : <Navigate to="/auth" />} />
            <Route path="/transactions" element={isAuthenticated ? <Transactions /> : <Navigate to="/auth" />} />
            <Route path="/fraud-settings" element={isAuthenticated ? <FraudSettings /> : <Navigate to="/auth" />} />
            <Route path="/profile" element={isAuthenticated ? <UserProfile /> : <Navigate to="/auth" />} />
          </Routes>
        </div>
        <Footer />
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
