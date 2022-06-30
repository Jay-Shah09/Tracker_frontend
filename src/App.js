import React from 'react';
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import Login from './Pages/Login'
import Dashboard from './Pages/Dashboard'
import ChannelList from './Pages/ChannelList'
import { ContextAPI } from './Context';

function App() {
  return (
    <ContextAPI>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} /> 
          <Route path="/channel-list" element={<ChannelList/>} /> 
        </Routes>
      </BrowserRouter>
    </ContextAPI>
  );
}

export default App;
