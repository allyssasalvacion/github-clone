import React from "react";
import "./App.css";

import { Routes, Route } from "react-router-dom";

import Profile from "./pages/Profile";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="profile" element={<Profile />} />
        <Route path="*" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
