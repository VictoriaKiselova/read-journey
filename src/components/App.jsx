import { useState, lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import WelcomePage from "../pages/WelcomePage/WelcomePage";
import RegisterForm from "./RegisterForm/RegisterForm";
import LoginForm from "./LoginForm/LoginForm";
import style from "./App.module.scss";

export default function App() {
  return (
    <div className={style.app}>
      <Suspense
        fallback={
          null
          // <Loader />
        }>
        <Routes>
          <Route path="/" element={<Navigate to="/register" />} />
          <Route path="/" element={<WelcomePage />}>
            <Route path="register" element={<RegisterForm />} />
            <Route path="login" element={<LoginForm />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}
