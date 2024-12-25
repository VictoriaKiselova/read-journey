import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import style from "./Layout.module.scss";

export default function Layout() {
  return (
    <div className={style.layout}>
      <Header />
      <main className={style.main}>
        <Outlet />
      </main>
    </div>
  );
}
