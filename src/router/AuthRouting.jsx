import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../authPages/Login";

const AuthRouting = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Login />} />
    </Routes>
  );
};

export default AuthRouting;
