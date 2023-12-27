import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EditPage from "./pages/EditPage/EditPage";
import HomePage from "./pages/HomePage/HomePage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/edit/:id" element={<EditPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
