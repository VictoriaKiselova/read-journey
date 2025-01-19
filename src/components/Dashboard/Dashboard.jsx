import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  selectBookProgress,
  selectIsLoadingReading,
} from "../../redux/reading/selectors";
import Loader from "../Loader/Loader";
import Filters from "../Filters/Filters";
import AddBook from "../AddBook/AddBook";
import HowToUse from "../HowToUse/HowToUse";
import WindowToTheWorld from "../WindowToTheWorld/WindowToTheWorld";
import RecommendedBooks from "../RecommendedBooks/RecommendedBooks";
import AddReading from "../AddReading/AddReading";
import ProgressInfo from "../ProgressInfo/ProgressInfo";
import Details from "../Details/Details";
import style from "./Dashboard.module.scss";

export default function Dashboard() {
  const locationRecommended = useLocation().pathname.includes("recommended");
  const locationLibrary = useLocation().pathname.includes("library");
  const locationReading = useLocation().pathname.includes("reading");
  const bookProgress = useSelector(selectBookProgress);
  const loading = useSelector(selectIsLoadingReading);

  return (
    <div className={style.dashboard}>
      {locationRecommended && (
        <>
          <Filters />
          <HowToUse />
        </>
      )}

      {locationLibrary && (
        <>
          <AddBook />
          <RecommendedBooks />
        </>
      )}
      {!locationReading && <WindowToTheWorld />}

      {locationReading && (
        <>
          <AddReading />
          {loading ? (
            <Loader
              top={"32px"}
              left={"50%"}
              transform={"translate(-50%, -50%)"}
            />
          ) : bookProgress?.progress[0]?.status === "inactive" ? (
            <Details />
          ) : (
            <ProgressInfo />
          )}
        </>
      )}
    </div>
  );
}
