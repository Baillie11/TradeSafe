import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
import 'react-toastify/dist/ReactToastify.css';
import './App.css';



function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <NavBar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/fraud-settings" element={<FraudSettings />} />
            <Route path="/profile" element={<UserProfile />} />
          </Routes>
        </div>
        <Footer />
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
