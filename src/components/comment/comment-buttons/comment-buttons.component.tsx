import { useContext } from "react";
import { Icon } from "../../../assets/assets";
import "./comment-buttons.styles.scss";
import { UsersContext } from "../../../context/users.context";

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
  const { user } = useContext(UsersContext);

  return (
    <div className={`${className} flex-row flex-gap-large buttons-container`}>
      {isCurrentUser ? (
        <>
          <button
            className="flex-row flex-gap-small"
            onClick={deleteCallback}
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
