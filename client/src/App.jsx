import React, { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./components/Home";
import Login from "./components/Login";
import Transactions from "./components/Transactions";
import Categories from "./components/Categories";
import Register from "./components/Register";

function App() {
  return (
    <div>
      <Header />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/transactions" element={<Transactions />} />
        <Route path="/home/categories" element={<Categories />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
