import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchGetBooksOwn,
  fetchDeleteBookById,
} from "../../redux/libraryFilters/operations";
import { selectIsLoading } from "../../redux/auth/selectors";
import { selectOwnBooks } from "../../redux/libraryFilters/selectors";
import bookNotFoundImg from "../../assets/Image/3d-book-with-blank-blue-cover1.png";
import book1x from "../../assets/Image/book@1x.png";
import book2x from "../../assets/Image/book@2x.png";
import spriteRead from "../../assets/Image/sprite-read.svg";
import style from "./MyLibraryBooks.module.scss";
import Icon from "../Icon/Icon";

export default function MyLibraryBooks() {
  const dispatch = useDispatch();
  const ownBooks = useSelector(selectOwnBooks);
  const isLoading = useSelector(selectIsLoading);
  const [libraryValue, setLibraryValue] = useState("allBooks");

  useEffect(() => {
    dispatch(fetchGetBooksOwn(libraryValue));
  }, [dispatch, libraryValue]);

  const handleFilterChange = e => {
    const newValue = e.target.value;
    setLibraryValue(newValue);
  };

  const handleDeleteBook = bookId => {
    dispatch(fetchDeleteBookById(bookId));
    dispatch(fetchGetBooksOwn(libraryValue));
  };

  return isLoading ? (
    <p>Loading</p>
  ) : (
    <>
      <section className={style.myLibraryBooksContainer}>
        <div className={style.myLibraryBooksFilters}>
          <h3 className={style.myLibraryBooksTitle}>My library</h3>

          <select
            onChange={handleFilterChange}
            className={style.myLibraryBooksSelect}>
            <option value="allBooks" className={style.myLibraryBooksOption}>
              All books
            </option>
            <option value="unread" className={style.myLibraryBooksOption}>
              Unread
            </option>
            <option value="in-progress" className={style.myLibraryBooksOption}>
              In progress
            </option>
            <option value="done" className={style.myLibraryBooksOption}>
              Done
            </option>
          </select>
        </div>

        {ownBooks.length > 0 && !isLoading ? (
          <ul className={style.myLibraryList}>
            {ownBooks.map(book => (
              <li
                key={book._id}
                className={style.myLibraryItem}
                onClick={() => {
                  // handleOpenModal(book);
                }}>
                <img
                  src={book.imageUrl ? book.imageUrl : bookNotFoundImg}
                  alt={book.title}
                  className={style.myLibraryItemImage}
                />
                <div className={style.myLibraryItemBook}>
                  <div>
                    <p className={style.myLibraryItemTitle}>
                      {book.title.length > 10
                        ? `${book.title.slice(0, 10).toLowerCase()}...`
                        : book.title.toLowerCase()}
                    </p>
                    <p className={style.myLibraryItemAuthor}>{book.author}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteBook(book._id)}
                    className={style.myLibraryButtonDelete}>
                    <Icon
                      sprite={spriteRead}
                      id="icon-delete"
                      width="14px"
                      height="14px"
                      className={style.iconDelete}
                    />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className={style.bookIconWrappers}>
            <div className={style.bookIconBox}>
              <picture className={style.bookIcon}>
                <source
                  media="(min-width: 1280px)"
                  srcSet={`${book2x} 2x, ${book2x} 1x`}
                />
                <source
                  media="(min-width: 320px)"
                  srcSet={`${book2x} 2x, ${book1x} 1x`}
                />
                <img src={book1x} alt="book" className={style.bookIcon} />
              </picture>
            </div>

            <p className={style.libraryText}>
              To start training, add{" "}
              <span className={style.librarySpan}> some of your books</span> or
              from the recommended ones
            </p>
          </div>
        )}
      </section>
    </>
  );
}
