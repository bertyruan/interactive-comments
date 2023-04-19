import { useContext } from "react";
import { Icon } from "../../../assets/assets";
import { CommentsContext } from "../../../context/comments.context";
import "./comment-buttons.styles.scss";

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
  const { showModal } = useContext(CommentsContext);

  const onClickDelete = () => {
    showModal(deleteCallback);
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
    </div>
  );
};
