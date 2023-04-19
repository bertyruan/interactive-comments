import { useContext } from "react";
import { CommentsContext } from "../../context/comments.context";
import { DeleteModal } from "./delete-modal/delete-modal";
import "./modal.styles.scss";

export function Modal() {
  const { modal, confirmModal } = useContext(CommentsContext);

  const cancelCallback = () => {
    confirmModal(false);
  };

  const confirmCallback = () => {
    confirmModal(true);
  };

  if (modal.show) {
    return (
      <div className="l-popup">
        <div className="overlay">
          <DeleteModal
            cancel={cancelCallback}
            confirm={confirmCallback}
          ></DeleteModal>
        </div>
      </div>
    );
  }
  return null;
}
