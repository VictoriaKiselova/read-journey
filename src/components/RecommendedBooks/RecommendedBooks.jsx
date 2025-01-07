import Icon from "../Icon/Icon";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectAllBooks } from "../../redux/books/selectors";
import { fetchAllBooks } from "../../redux/books/operations";
import { modalOpen } from "../../redux/books/slice";
import spriteRead from "../../assets/Image/sprite-read.svg";
import style from "./RecommendedBooks.module.scss";

export default function RecommendedBooks() {
  const dispatch = useDispatch();
  const allBooksList = useSelector(selectAllBooks);
  const [randomSelectedBooks, setRandomSelectedBooks] = useState([]);

  useEffect(() => {
    dispatch(fetchAllBooks());
  }, [dispatch]);

  useEffect(() => {
    if (allBooksList && allBooksList.length > 0) {
      const shuffled = [...allBooksList].sort(() => 0.5 - Math.random());
      setRandomSelectedBooks(shuffled.slice(0, 3));
    }
  }, [allBooksList]);

  const handleOpenModal = book => {
    dispatch(modalOpen(book));
  };

  return (
    <div className={style.recommendedBooksContainer}>
      <h3 className={style.recommendedBooksTitle}>Recommended books</h3>

      <ul className={style.recommendedList}>
        {randomSelectedBooks.map(book => (
          <li
            key={book._id}
            className={style.recommendedItem}
            onClick={() => handleOpenModal(book)}>
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

      <Link to="recommended" className={style.homeLink}>
        Home
        <Icon
          sprite={spriteRead}
          id="icon-arrov-rigth"
          width="20px"
          height="20px"
          className={style.iconArrow}
        />
      </Link>
    </div>
  );
}
