import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { showToast } from "../../toastUtils";
import { selectIsModal, selectSelectedBook } from "../../redux/books/selectors";
import { modalClose } from "../../redux/books/slice";
import { fetchAddBooksByIdFromRecommend } from "../../redux/libraryFilters/operations";
import { setIsSuccessAddToLibrary } from "../../redux/libraryFilters/slice";
import {
  selectIsSuccessAddToLibrary,
  selectOwnBooks,
} from "../../redux/libraryFilters/selectors";
import {
  selectReadingBook,
  selectReadingCompleted,
} from "../../redux/reading/selectors";
import { setReadingBook, setReadingCompleted } from "../../redux/reading/slice";
import book1x from "../../assets/Image/book@1x.png";
import book2x from "../../assets/Image/book@2x.png";
import notFoundImage1x from "../../assets/Image/not-found-image@1x.png";
import Icon from "../Icon/Icon";
import Modal from "react-modal";
import spriteRead from "../../assets/Image/sprite-read.svg";
import like from "../../assets/Image/like.png";
import style from "./CustomModal.module.scss";
import "react-toastify/dist/ReactToastify.css";

Modal.setAppElement("#root");

export default function CustomModal() {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(selectIsModal);
  const selectedBook = useSelector(selectSelectedBook);
  const isSuccessAddToLibrary = useSelector(selectIsSuccessAddToLibrary);
  const readingBook = useSelector(selectReadingBook);
  const ownBooks = useSelector(selectOwnBooks);
  const readingCompleted = useSelector(selectReadingCompleted);

  const handleAddBookToLibrary = async selectedBook => {
    try {
      const bookExists = ownBooks.some(
        book =>
          book.title === selectedBook.title &&
          book.author === selectedBook.author
      );

      if (bookExists) {
        showToast("Book is already in your library!", "error");
        return;
      } else {
        const result = await dispatch(
          fetchAddBooksByIdFromRecommend(selectedBook._id)
        ).unwrap();
        dispatch(setIsSuccessAddToLibrary(true));
        if (result) {
          showToast("Book successfully added to your library!", "success");
        }
      }
    } catch (error) {
      showToast(
        error.message || "An error occurred while adding the book.",
        "error"
      );
    }
  };

  const handleCloseModal = async () => {
    await dispatch(setIsSuccessAddToLibrary(false));
    dispatch(modalClose(null));
    dispatch(setReadingCompleted(false));
    dispatch(setReadingBook(null));
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={handleCloseModal}
      style={{
        overlay: {
          backgroundColor: "rgba(37, 37, 37, 0.4)",
          zIndex: 1999,
        },
        content: {
          zIndex: 2000,
        },
      }}
      className={style.modalWrapper}>
      <button
        type="button"
        onClick={() => handleCloseModal()}
        className={style.buttonClose}>
        <Icon
          sprite={spriteRead}
          id={"icon-x"}
          width="22px"
          height="22px"
          className={style.iconClose}
        />
      </button>

      {selectedBook && !isSuccessAddToLibrary && (
        <div className={style.modalContent}>
          <img
            src={
              selectedBook.imageUrl ? selectedBook.imageUrl : notFoundImage1x
            }
            alt={selectedBook.title}
            className={style.recommendedItemImage}
          />
          <p className={style.recommendedItemTitle}>
            {selectedBook.title.toLowerCase()}
          </p>
          <p className={style.recommendedItemAuthor}>{selectedBook.author}</p>
          <p className={style.recommendedItemPages}>
            {selectedBook.totalPages} pages
          </p>
          <button
            className={style.addFormButton}
            onClick={() => handleAddBookToLibrary(selectedBook)}>
            Add to library
          </button>
        </div>
      )}

      {isSuccessAddToLibrary && (
        <div className={style.modalContent}>
          <img src={like} alt={like} className={style.likeImage} />
          <p className={style.notificftionTitle}>Good job</p>
          <p className={style.notificftionText}>
            Your book is now in{" "}
            <span className={style.notificftionSpan}> the library!</span> The
            joy knows no bounds and now you can start your training
          </p>
        </div>
      )}

      {readingBook && !selectedBook && (
        <div className={style.modalContent}>
          <img
            src={readingBook.imageUrl ? readingBook.imageUrl : notFoundImage1x}
            alt={readingBook.title}
            className={style.recommendedItemImage}
          />
          <p className={style.recommendedItemTitle}>
            {readingBook.title.toLowerCase()}
          </p>
          <p className={style.recommendedItemAuthor}>{readingBook.author}</p>
          <p className={style.recommendedItemPages}>
            {readingBook.totalPages} pages
          </p>
          <Link
            to={`reading/${readingBook._id}`}
            onClick={handleCloseModal}
            className={style.addFormButton}>
            Start reading
          </Link>
        </div>
      )}

      {readingCompleted && !readingBook && !selectedBook && (
        <div className={style.modalContent}>
          <picture className={style.likeImage}>
            <source
              media="(min-width: 1280px)"
              srcSet={`${book2x} 2x, ${book2x} 1x`}
            />
            <source
              media="(min-width: 320px)"
              srcSet={`${book2x} 2x, ${book1x} 1x`}
            />
            <img src={book1x} alt="book" className={style.likeImage} />
          </picture>

          <p className={style.notificftionTitle}>The book is read</p>
          <p className={style.notificftionText}>
            It was an
            <span className={style.notificftionSpan}> exciting journey</span>,
            where each page revealed new horizons, and the characters became
            inseparable friends.
          </p>
        </div>
      )}
    </Modal>
  );
}
