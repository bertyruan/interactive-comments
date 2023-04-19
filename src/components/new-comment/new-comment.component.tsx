import { ChangeEvent, useState } from "react";
import { Avatar } from "../../assets/assets";
import "./new-comment.styles.scss";

type NewCommentProp = {
  defaultText: string;
  createComment: (userComment: string) => void;
  type: "Reply" | "Send";
};

export const NewComment = ({
  defaultText,
  createComment,
  type,
}: NewCommentProp) => {
  const [userComment, setUserComment] = useState(defaultText);

  const setUserCommentHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setUserComment(() => event.target.value);
  };

  const createCommentCallback = (userComment: string) => {
    createComment(userComment);
    setUserComment(() => "");
  };

  return (
    <div className="comment-border comment-module grid-area-create-thread create-thread-container">
      <div className="grid-area-profile">
        <img
          alt={"amy robson"}
          className="avatar-big"
          src={Avatar.amyrobson}
        ></img>
      </div>
      <textarea
        className="comment-edit-border grid-area-textarea"
        value={userComment}
        placeholder="Add a comment..."
        onChange={setUserCommentHandler}
      ></textarea>
      <button
        className="button primary-button grid-area-button"
        onClick={() => createCommentCallback(userComment)}
      >
        {type}
      </button>
    </div>
  );
};
