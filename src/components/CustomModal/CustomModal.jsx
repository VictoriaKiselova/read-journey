import { selectIsModal } from "../../redux/books/selectors";
import modalClose from "../../redux/books/slice";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
Modal.setAppElement("#root");

export default function CustomModal() {
  return (
    <Modal
      isOpen={selectIsModal}
      // onAfterOpen={afterOpenModal}
      onRequestClose={modalClose}
      style={customStyles}
      contentLabel="Example Modal">
      <button onClick={modalClose}>close</button>
    </Modal>
  );
}
