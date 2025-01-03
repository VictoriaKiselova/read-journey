import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchGetBooksOwn } from "../../redux/libraryFilters/operations";
import { selectOwnBooks } from "../../redux/libraryFilters/selectors";
import bookNotFoundImg from "../../assets/Image/3d-book-with-blank-blue-cover1.png";
import book1x from "../../assets/Image/book@1x.png";
import book2x from "../../assets/Image/book@2x.png";
import style from "./MyLibraryBooks.module.scss";

export default function MyLibraryBooks() {
  const dispatch = useDispatch();
  const ownBooks = useSelector(selectOwnBooks);
  const [libraryValue, setLibraryValue] = useState("allBooks");

  useEffect(() => {
    dispatch(fetchGetBooksOwn(libraryValue));
  }, [dispatch, libraryValue]);

  const handleFilterChange = e => {
    const newValue = e.target.value;
    setLibraryValue(newValue);
  };

  return (
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

      {ownBooks.length > 0 ? (
        <ul className={style.recommendedList}>
          {ownBooks.map(book => (
            <li
              key={book._id}
              className={style.recommendedItem}
              onClick={() => {
                // handleOpenModal(book);
              }}>
              <img
                src={book.imageUrl ? book.imageUrl : bookNotFoundImg}
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
      ) : (
        <div className={style.bookIconWrapper}>
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
              <img
                src={book1x}
                alt="girl with dog"
                className={style.bookIcon}
              />
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
  );
}
