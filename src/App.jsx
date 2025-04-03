import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Edit from "./pages/Edit";
import Delete from "./pages/Delete";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create showNavbar={true} />} />
        <Route path="/edit/:id" element={<Edit showNavbar={true} />} />
        <Route path="/delete/:id" element={<Delete showNavbar={true} />} />
      </Routes>
    </Router>
  );
}

export default App;
