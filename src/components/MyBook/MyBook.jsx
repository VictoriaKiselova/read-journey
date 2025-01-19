import { useSelector } from "react-redux";
import { selectBookProgress } from "../../redux/reading/selectors";
import notFoundImage1x from "../../assets/Image/not-found-image@1x.png";
import Loader from "../Loader/Loader";
import Icon from "../Icon/Icon";
import spriteRead from "../../assets/Image/sprite-read.svg";
import style from "./MyBook.module.scss";

export default function MyBook() {
  const bookProgress = useSelector(selectBookProgress);

  if (!bookProgress) {
    return <Loader />;
  }

  return (
    <section className={style.readingContainer}>
      <h3 className={style.recommendedTitle}>My reading</h3>
      <div className={style.modalContent}>
        <img
          src={bookProgress.imageUrl ? bookProgress.imageUrl : notFoundImage1x}
          alt={bookProgress.title}
          className={style.recommendedItemImage}
        />
        <p className={style.recommendedItemTitle}>
          {bookProgress?.title?.toLowerCase()}
        </p>
        <p className={style.recommendedItemAuthor}>{bookProgress?.author}</p>
        {bookProgress?.progress?.length > 0 ? (
          <Icon
            sprite={spriteRead}
            id="icon-block-3-red"
            width="40px"
            height="40px"
            className={style.iconRead}
          />
        ) : (
          <Icon
            sprite={spriteRead}
            id="icon-block-red"
            width="40px"
            height="40px"
            className={style.iconRead}
          />
        )}
      </div>
    </section>
  );
}
