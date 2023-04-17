import { useContext, useState } from "react";
import { Icon } from "../../../assets/assets";
import "./comment-buttons.styles.scss";
import { UsersContext } from "../../../context/users.context";
import { ConfirmDeletePopup } from "../../delete-comment/delete-comment";

type CommentButtonsProp = {
  updateCallback: () => void;
  deleteCallback: () => void;
  replyCallback: () => void;
  isCurrentUser: boolean;
  className: string;
};

export const CommentButtons = ({
  deleteCallback,
  replyCallback,
  updateCallback,
  isCurrentUser,
  className,
}: CommentButtonsProp) => {
  const [showModal, setShowModal] = useState(false);

  const onClickDelete = () => {
    setShowModal(() => true);
  };

  const cancelModal = () => {
    setShowModal(() => false);
  };

  const confirmDeleteCallback = () => {
    deleteCallback();
  };

  return (
    <div className={`${className} flex-row flex-gap-large buttons-container`}>
      {isCurrentUser ? (
        <>
          <button
            className="flex-row flex-gap-small"
            onClick={onClickDelete}
            id="warning"
          >
            {Icon.delete} Delete
          </button>
          <button className="flex-row flex-gap-small" onClick={updateCallback}>
            {Icon.edit} Edit
          </button>
        </>
      ) : (
        <button className="flex-row flex-gap-small" onClick={replyCallback}>
          <span className="reply-icon">{Icon.reply}</span>
          Reply
        </button>
      )}
      {showModal && (
        <ConfirmDeletePopup
          cancel={cancelModal}
          delete={confirmDeleteCallback}
        />
      )}
    </div>
  );
};
