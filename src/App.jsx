import { Routes, Route } from "react-router-dom";
import style from "./App.module.scss";

export default function App() {
  return (
    <div className={style.app}>
      <Routes>{/* <Route path="/" element={<WelcomePage />} /> */}</Routes>
    </div>
  );
}
