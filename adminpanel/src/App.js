import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminLogin from "./components/AdminLogin";
import Driver from "./components/Driver";
import RiderHistory from "./components/RiderHistory";
import ActiveDrivers from "./components/ActiveDrivers";
import Layout from "./components/Layout";
import Users from "./components/Users";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<AdminLogin />} />
          <Route path="/admin" element={<Layout />}>
            <Route index element={<Users />} />
            <Route path="drivers" element={<Driver />} />
            <Route path="rider-history" element={<RiderHistory />} />
            <Route path="active-drivers" element={<ActiveDrivers />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
