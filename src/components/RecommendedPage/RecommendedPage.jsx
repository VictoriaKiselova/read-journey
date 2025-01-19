import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setNextPage,
  setPrevPage,
  setLimit,
  modalOpen,
  setFilteredBooks,
} from "../../redux/books/slice";
import {
  fetchRecommendBooks,
  fetchAllBooks,
} from "../../redux/books/operations";
import {
  selectIsLoading,
  selectIsFilteredBooks,
} from "../../redux/books/selectors";
import spriteRead from "../../assets/Image/sprite-read.svg";
import clsx from "clsx";
import Icon from "../Icon/Icon";
import Loader from "../Loader/Loader";
import style from "./RecommendedPage.module.scss";

export default function RecommendedPage() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const filteredBooks = useSelector(selectIsFilteredBooks);
  const { booksRecommend, totalPages } = useSelector(
    state => state.books.recommend
  );
  const { limit, page } = useSelector(state => state.books);

  useEffect(() => {
    dispatch(fetchRecommendBooks({ page, limit }));
  }, [page, limit, dispatch]);

  useEffect(() => {
    dispatch(fetchAllBooks());
  }, [dispatch]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const newLimit = width <= 767 ? 2 : width < 1280 ? 8 : 10;

      if (limit) {
        dispatch(fetchRecommendBooks({ limit, page }));
      }
      if (newLimit !== limit) {
        dispatch(setLimit(newLimit));
        dispatch(fetchRecommendBooks({ limit: newLimit, page }));
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch, limit, page]);

  const handleNextPage = () => {
    if (page < totalPages) {
      dispatch(setNextPage());
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      dispatch(setPrevPage());
    }
  };

  const handleOpenModal = book => {
    dispatch(modalOpen(book));
  };

  const handleReccommendRefresh = () => {
    dispatch(setFilteredBooks([]));
    dispatch(setLimit({ page: 1, limit }));
    dispatch(fetchRecommendBooks({ page: 1, limit }));
  };

  return (
    <section className={style.recommended}>
      <div className={style.recommendedTitleWrapper}>
        <div className={style.recommendedTitleRefresh}>
          <h3 className={style.recommendedTitle}>Recommended</h3>
          <button
            type="button"
            onClick={handleReccommendRefresh}
            className={style.recommendedButtonRefresh}>
            <Icon
              sprite={spriteRead}
              id="icon-refresh"
              width="20px"
              height="20px"
              className={style.iconRefresh}
            />
          </button>
        </div>

        <div className={style.recommendedButtonWrapper}>
          <button
            type="button"
            onClick={handlePrevPage}
            className={clsx(style.recommendedButton, {
              [style.disabled]: page === 1 || filteredBooks.length > 0,
            })}
            disabled={page === 1 || filteredBooks.length > 0}>
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
              [style.disabled]: page === totalPages || filteredBooks.length > 0,
            })}
            disabled={page === totalPages || filteredBooks.length > 0}>
            <Icon
              sprite={spriteRead}
              id="icon-chevron-rigth"
              width="20px"
              height="20px"
              className={style.iconArrov}
            />{" "}
          </button>
        </div>
      </div>

      {isLoading && <Loader />}

      <ul className={style.recommendedList}>
        {(filteredBooks.length > 0 ? filteredBooks : booksRecommend).map(
          book => (
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
          )
        )}
      </ul>
    </section>
  );
}
