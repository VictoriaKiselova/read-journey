import { format } from "date-fns";
import { useSelector, useDispatch } from "react-redux";
import { selectBookProgress } from "../../redux/reading/selectors";
import {
  fetchReadingDelete,
  fetchReadingFinish,
} from "../../redux/reading/operations";
import { showToast } from "../../toastUtils";
import Statistic from "../Statistic/Statistic";
import Loader from "../Loader/Loader";
import spriteRead from "../../assets/Image/sprite-read.svg";
import Icon from "../Icon/Icon";
import style from "./Diary.module.scss";

export default function Diary({ statistic }) {
  const dispatch = useDispatch();
  const bookProgress = useSelector(selectBookProgress);
  const progress = bookProgress.progress;
  const filteredProgress = progress
    .filter(elem => elem.finishReading !== undefined)
    .reverse();

  if (!bookProgress) {
    return <Loader />;
  }

  const deleteProcessReading = async (bookId, readingId) => {
    const activeProgress = bookProgress.progress.find(
      progress => progress.status === "active"
    );

    if (activeProgress) {
      try {
        await dispatch(
          fetchReadingFinish({
            id: bookProgress._id,
            page: activeProgress.startPage,
          })
        ).unwrap();
        showToast("Your progress has been deleted!", "success");
      } catch (error) {
        showToast(
          `Failed to finish reading at page ${activeProgress.startPage}: ${error.message}`,
          "error"
        );
        return;
      }
    }

    try {
      await dispatch(fetchReadingDelete({ bookId, readingId })).unwrap();
      showToast("Reading process successfully deleted!", "success");
    } catch (error) {
      showToast(`Failed to delete reading: ${error.message}`, "error");
    }
  };

  return statistic ? (
    <div className={style.diaryContainer}>
      {filteredProgress.length > 0 && (
        <ul className={style.diaryList}>
          {filteredProgress.map((elem, index) => {
            const pages = elem.finishPage - elem.startPage + 1;
            const startTime = new Date(elem.startReading).getTime();
            const finishTime = new Date(elem.finishReading).getTime();
            const readingMs = finishTime - startTime;
            const readingHours = Math.floor(readingMs / (1000 * 60 * 60));

            const readingMinutes = Math.floor(
              (readingMs % (1000 * 60 * 60)) / (1000 * 60)
            );
            const readingSeconds = Math.floor((readingMs % (1000 * 60)) / 1000);

            return (
              <li key={index} className={style.diaryItem}>
                <div className={style.diaryDateWrapper}>
                  <div className={style.diaryDateBlock}>
                    <Icon
                      sprite={spriteRead}
                      id="icon-Frame-56"
                      width="16px"
                      height="16px"
                      className={style.iconDiaryItem}
                    />
                    <p className={style.diaryItemDate}>
                      {format(new Date(elem.finishReading), "dd.MM.yyyy")}
                    </p>
                  </div>
                  <p className={style.diaryItemPageReaded}>{pages} pages</p>
                </div>

                <div className={style.diaryItemBox}>
                  <div>
                    <p className={style.readingPersent}>
                      {((pages / bookProgress.totalPages) * 100).toFixed(1)} %
                    </p>
                    <p className={style.diarySpeedReadingTime}>
                      {readingHours ? `${readingHours} hour` : ""}{" "}
                      {readingMinutes ? `${readingMinutes} minutes` : ""}{" "}
                      {readingSeconds ? `${readingSeconds} seconds` : ""}
                    </p>
                  </div>

                  <div className={style.diaryIconsStatisticDelBlock}>
                    <div className={style.diarySpeedReadingWrapper}>
                      <Icon
                        sprite={spriteRead}
                        id="icon-block"
                        width="43px"
                        height="18px"
                        className={style.iconGraph}
                      />
                      <p className={style.diarySpeedReadingHour}>
                        {readingHours > 0
                          ? `${(pages / readingHours).toFixed()} pages per hour`
                          : readingMinutes > 0
                          ? `${(
                              (pages / readingMinutes) *
                              60
                            ).toFixed()} pages per min`
                          : readingSeconds > 0
                          ? `${(
                              pages / readingSeconds
                            ).toFixed()} pages per sec`
                          : "Time data is insufficient"}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        deleteProcessReading(bookProgress._id, elem._id)
                      }
                      className={style.buttonDeleteItem}>
                      <Icon
                        sprite={spriteRead}
                        id="icon-delete"
                        width="14px"
                        height="14px"
                        className={style.iconDeleteItem}
                      />
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  ) : (
    <Statistic />
  );
}
