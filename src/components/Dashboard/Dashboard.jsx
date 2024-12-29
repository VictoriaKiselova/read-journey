import { useLocation } from "react-router-dom";
import Filters from "../Filters/Filters";
import HowToUse from "../HowToUse/HowToUse";
import WindowToTheWorld from "../WindowToTheWorld/WindowToTheWorld";
import style from "./Dashboard.module.scss";

export default function Dashboard() {
  const locationRecommended = useLocation().pathname.includes("recommended");

  return (
    <div className={style.dashboard}>
      <Filters />
      <HowToUse />
      {locationRecommended && <WindowToTheWorld />}
    </div>
  );
}
