import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your page components
import Home from './pages/Home';
import Trades from './pages/Trades';
import Food from './pages/Food';
import Logout from './pages/Logout';
// Auth
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';


function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          {/* Auth */}
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/logout" element={<Logout />} />
          {/* Splits */}
          <Route path="/food" element={<Food />} />
          <Route path="/trades" element={<Trades />} />
        </Routes>
    </Router>
  );
}

export default App;
