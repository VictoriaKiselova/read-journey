import { useState } from "react";
import Icon from "../Icon/Icon";
import spriteRead from "../../assets/Image/sprite-read.svg";
import Diary from "../Diary/Diary";
import style from "./Details.module.scss";

export default function Details() {
  const [statistic, setstatistic] = useState(true);

  const handleSwitchDiary = () => {
    setstatistic(true);
  };

  const handleSwitchStatistic = () => {
    setstatistic(false);
  };

  return (
    <div className={style.detailsContainer}>
      <div className={style.detailsNav}>
        <h3 className={style.detailsTitle}>
          {statistic ? "Diary" : "Statistics"}
        </h3>

        <div className={style.detailsButtonsWrapper}>
          <button className={style.detailsButton} onClick={handleSwitchDiary}>
            <Icon
              sprite={spriteRead}
              id="icon-watch"
              width="16px"
              height="16px"
              className={`${style.iconStatistic} ${
                statistic ? style.iconStatisticActive : ""
              }`}
            />
          </button>

          <button
            className={style.detailsButton}
            onClick={handleSwitchStatistic}>
            <Icon
              sprite={spriteRead}
              id="icon-statistic"
              width="16px"
              height="16px"
              className={`${style.iconStatistic} ${
                !statistic ? style.iconStatisticActive : ""
              }`}
            />
          </button>
        </div>
      </div>
      <Diary statistic={statistic} />
    </div>
  );
}
