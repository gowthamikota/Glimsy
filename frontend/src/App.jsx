import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import MemoriesPage from './pages/MemoriesPage';
import FriendDashboard from './pages/FriendDashboard';
import CountdownPage from './pages/CountDownPage';


const App = () => {
  return (
    <BrowserRouter>
    
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/memories" element={<MemoriesPage />} />
          <Route path="/dashboard" element={<FriendDashboard />} />
          <Route path="/countdown" element={<CountdownPage />} />
        

        </Routes>
    
    </BrowserRouter>
  );
};

export default App;