import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Dashboard from "../Dashboard/Dashboard";
import style from "./Layout.module.scss";

export default function Layout() {
  return (
    <div className={style.layout}>
      <Header />
      <main className={style.main}>
        <Dashboard />
        <Outlet />
      </main>
    </div>
  );
}
