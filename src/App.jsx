import { Routes, Route, Navigate } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import LoginForm from "./components/LoginForm/LoginForm";
import style from "./App.module.scss";

export default function App() {
  return (
    <div className={style.app}>
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/" element={<WelcomePage />}>
          <Route path="register" element={<RegisterForm />} />
          <Route path="login" element={<LoginForm />} />
        </Route>
      </Routes>
    </div>
  );
}
