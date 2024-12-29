import { Link } from "react-router-dom";
import Icon from "../Icon/Icon";
import spriteRead from "../../assets/Image/sprite-read.svg";
import style from "./HowToUse.module.scss";

export default function HowToUse() {
  return (
    <div className={style.howToUseWrapper}>
      <h3 className={style.howToUseTitle}>Start your workout</h3>
      <ul className={style.howToUseList}>
        <li className={style.howToUseListItem}>
          <p className={style.howToUseMarker}>1</p>
          <p className={style.howToUseText}>
            Create a personal library:{" "}
            <span className={style.howToUseSpan}>
              add the books you intend to read to it.{" "}
            </span>
          </p>
        </li>
        <li className={style.howToUseListItem}>
          <p className={style.howToUseMarker}>2</p>
          <p className={style.howToUseText}>
            Create your first workout:{" "}
            <span className={style.howToUseSpan}>
              define a goal, choose a period, start training.
            </span>
          </p>
        </li>
      </ul>

      <Link to="library" className={style.howToUseLink}>
        My library
        <Icon
          sprite={spriteRead}
          id="icon-arrov-rigth"
          width="24px"
          height="24px"
          className={style.iconArrow}
        />
      </Link>
    </div>
  );
}
