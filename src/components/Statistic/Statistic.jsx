import { useSelector } from "react-redux";
import { selectBookProgress } from "../../redux/reading/selectors";
import GraphStatistics from "../GraphStatistics/GraphStatistics";
import Icon from "../Icon/Icon";
import spriteRead from "../../assets/Image/sprite-read.svg";
import style from "./Statistic.module.scss";

export default function Statistic() {
  const bookProgress = useSelector(selectBookProgress);
  const totalReadPages = bookProgress.progress.reduce((max, elem) => {
    return elem.finishPage > max ? elem.finishPage : max;
  }, 0);

  const percentPageRead = Math.min(
    ((totalReadPages / bookProgress.totalPages) * 100).toFixed(2),
    100
  );

  return (
    <>
      <p className={style.statisticChapter}>
        Each page, each chapter is a new round of knowledge, a new step towards
        understanding. By rewriting statistics, we create our own reading
        history.
      </p>
      <div className={style.statisticContainer}>
        <div className={style.statisticGraphWrapper}>
          <GraphStatistics percentPageRead={percentPageRead} />
        </div>

        <div className={style.statisticReading}>
          <Icon
            sprite={spriteRead}
            id="icon-block-statistic"
            width="14px"
            height="14px"
            className={style.iconStatisticGraph}
          />
          <div>
            <p className={style.statisticPercentPageRead}>
              {percentPageRead} %
            </p>
            <p className={style.statisticTotalReadPages}>
              {totalReadPages} pages read
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
