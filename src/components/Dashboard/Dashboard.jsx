import { useLocation } from "react-router-dom";
import Filters from "../Filters/Filters";
import AddBook from "../AddBook/AddBook";
import HowToUse from "../HowToUse/HowToUse";
import WindowToTheWorld from "../WindowToTheWorld/WindowToTheWorld";
import style from "./Dashboard.module.scss";

export default function Dashboard() {
  const locationRecommended = useLocation().pathname.includes("recommended");
  const locationLibrary = useLocation().pathname.includes("library");

  return (
    <div className={style.dashboard}>
      {locationRecommended && (
        <>
          <Filters />
          <HowToUse />
          <WindowToTheWorld />
        </>
      )}
    </div>
  );
}
