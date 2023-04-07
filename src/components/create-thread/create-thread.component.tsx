import { ChangeEvent, useContext, useState } from "react";
import { CommentsContext } from "../../context/comments.context";
import { UsersContext } from "../../context/users.context";
import { CommentContext, CreateThreadProps } from "../../types/comments.types";
import { UserContext } from "../../types/users.types";
import "./create-thread.styles.scss";
import { Avatar } from "../../assets/assets";

export const CreateThread = () => {
  const { createThread } = useContext<CommentContext>(CommentsContext);
  const { user } = useContext<UserContext>(UsersContext);
  const [userComment, setUserComment] = useState("");

  const createCommentCallback = () => {
    const commentProps: CreateThreadProps = {
      text: userComment,
      username: user.displayName,
    };
    createThread(commentProps);
    setUserComment(() => "");
  };

  const setUserCommentHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setUserComment(() => event.target.value);
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
        onClick={createCommentCallback}
      >
        Send
      </button>
    </div>
  );
};
