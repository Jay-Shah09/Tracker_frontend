import React from 'react';
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import Login from './Pages/Login'
// import Register from './Pages/Register'
import Dashboard from './Pages/Dashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
