import Icon from "../Icon/Icon";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setNextPage, setPrevPage, setLimit } from "../../redux/books/slice";
import { fetchRecommendBooks } from "../../redux/books/operations";
import spriteRead from "../../assets/Image/sprite-read.svg";
import clsx from "clsx";
import style from "./RecommendedBooks.module.scss";

export default function RecommendedBooks() {
  const { booksRecommend, limit, currentPage, totalPages } = useSelector(
    state => state.books
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const newLimit = width <= 767 ? 2 : width < 1280 ? 8 : 10;

      if (newLimit !== limit) {
        dispatch(setLimit(newLimit));
        dispatch(fetchRecommendBooks({ limit: newLimit, page: 1 }));
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch, limit]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(fetchRecommendBooks({ page: currentPage + 1, limit }));
      dispatch(setNextPage());
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      dispatch(fetchRecommendBooks({ page: currentPage - 1, limit }));
      dispatch(setPrevPage());
    }
  };

  return (
    <section className={style.recommended}>
      <div className={style.recommendedTitleWrapper}>
        <h3 className={style.recommendedTitle}>Recommended</h3>
        <div className={style.recommendedButtonWrapper}>
          <button
            type="button"
            onClick={handlePrevPage}
            className={clsx(style.recommendedButton, {
              [style.disabled]: currentPage === 1,
            })}
            disabled={currentPage === 1}>
            <Icon
              sprite={spriteRead}
              id="icon-chevron-left"
              width="20px"
              height="20px"
              className={style.iconArrov}
            />
          </button>
          <button
            type="button"
            onClick={handleNextPage}
            className={clsx(style.recommendedButton, {
              [style.disabled]: currentPage === totalPages,
            })}
            disabled={currentPage === totalPages}>
            <Icon
              sprite={spriteRead}
              id="icon-chevron-rigth"
              width="20px"
              height="20px"
              className={style.iconArrov}
            />
          </button>
        </div>
      </div>

      <ul className={style.recommendedList}>
        {booksRecommend.map(book => (
          <li key={book._id} className={style.recommendedItem}>
            <img
              src={book.imageUrl}
              alt={book.title}
              className={style.recommendedItemImage}
            />
            <p className={style.recommendedItemTitle}>
              {book.title.length > 15
                ? `${book.title.slice(0, 15).toLowerCase()}...`
                : book.title.toLowerCase()}
            </p>
            <p className={style.recommendedItemAuthor}>{book.author}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
