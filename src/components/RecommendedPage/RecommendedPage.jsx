import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setNextPage,
  setPrevPage,
  setLimit,
  modalOpen,
} from "../../redux/books/slice";
import { fetchRecommendBooks } from "../../redux/books/operations";
import spriteRead from "../../assets/Image/sprite-read.svg";
import clsx from "clsx";
import Icon from "../Icon/Icon";
import style from "./RecommendedPage.module.scss";

export default function RecommendedPage() {
  const dispatch = useDispatch();
  const { booksRecommend, totalPages } = useSelector(
    state => state.books.recommend
  );
  const { limit, currentPage } = useSelector(state => state.books);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const newLimit = width <= 767 ? 2 : width < 1280 ? 8 : 10;

      if (limit) {
        dispatch(fetchRecommendBooks({ limit, page: +1 }));
      }
      if (newLimit !== limit) {
        dispatch(setLimit(newLimit));
        dispatch(fetchRecommendBooks({ limit: newLimit, page: +1 }));
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

  const handleOpenModal = book => {
    dispatch(modalOpen(book));
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
        {booksRecommend.length > 0 &&
          booksRecommend.map(book => (
            <li
              key={book._id}
              className={style.recommendedItem}
              onClick={() => {
                handleOpenModal(book);
              }}>
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
