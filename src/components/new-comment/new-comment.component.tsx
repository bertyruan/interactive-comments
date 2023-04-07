import { ChangeEvent, useState } from "react";
import { Avatar } from "../../assets/assets";
import "./new-comment.styles.scss";

type NewCommentProp = {
  createComment: (userComment: string) => void;
  type: "Reply" | "Send";
};

export const NewComment = ({ createComment, type }: NewCommentProp) => {
  const [userComment, setUserComment] = useState("");

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
        <img className="avatar-big" src={Avatar.amyrobson}></img>
      </div>
      <textarea
        className="comment-edit-border grid-area-textarea"
        value={userComment}
        placeholder="Add a comment..."
        onChange={setUserCommentHandler}
      ></textarea>
      <button
        className="primary-button grid-area-button"
        onClick={() => createCommentCallback(userComment)}
      >
        {type}
      </button>
    </div>
  );
};
