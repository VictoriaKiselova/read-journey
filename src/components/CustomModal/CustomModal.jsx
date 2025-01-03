import { useSelector, useDispatch } from "react-redux";
import { selectIsModal, selectSelectedBook } from "../../redux/books/selectors";
import { modalClose } from "../../redux/books/slice";
import { fetchAddBooksByIdFromRecommend } from "../../redux/libraryFilters/operations";
import { setIsSuccessAddToLibrary } from "../../redux/libraryFilters/slice";
import { selectIsSuccessAddToLibrary } from "../../redux/libraryFilters/selectors";
import Icon from "../Icon/Icon";
import Modal from "react-modal";
import spriteRead from "../../assets/Image/sprite-read.svg";
import like from "../../assets/Image/like.png";
import style from "./CustomModal.module.scss";

Modal.setAppElement("#root");

export default function CustomModal() {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(selectIsModal);
  const selectedBook = useSelector(selectSelectedBook);
  const isSuccessAddToLibrary = useSelector(selectIsSuccessAddToLibrary);

  const handleAddBookToLibrary = async bookId => {
    try {
      await dispatch(fetchAddBooksByIdFromRecommend(bookId)).unwrap();
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  const handleCloseModal = () => {
    dispatch(setIsSuccessAddToLibrary(false));
    dispatch(modalClose(null));
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={handleCloseModal}
      style={{
        overlay: {
          backgroundColor: "rgba(37, 37, 37, 0.4)",
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
            src={selectedBook.imageUrl}
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
            onClick={() => handleAddBookToLibrary(selectedBook._id)}>
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
    </Modal>
  );
}
