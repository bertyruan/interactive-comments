import { ChangeEvent, useContext, useState } from "react";
import {
  Comment as CommentType,
  CommentCallbacks,
} from "../../types/comments.types";
import "./comment.styles.scss";
import { LikeComponent } from "./like/like.component";
import { CommentId } from "./comment-id/comment-id.component";
import { CommentButtons } from "./comment-buttons/comment-buttons.component";
import { UsersContext } from "../../context/users.context";

type CommentProps = {
  comment: CommentType;
  callbacks: CommentCallbacks;
};

export const Comment = ({ comment, callbacks }: CommentProps) => {
  const { finishUpdateCallback, deleteCallback, replyCallback } = callbacks;
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(comment.text);
  const { user } = useContext(UsersContext);

  let isCurrentUser = user.displayName === comment.username;

  const onTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const updateCallback = () => {
    setIsEditing(true);
  };

  const finishUpdateHandler = () => {
    setIsEditing(false);
    finishUpdateCallback(text);
  };

  const editUI = (
    <div className="flex-column edit-ui-container flex-gap-large">
      <textarea
        className="comment-edit-border "
        onChange={onTextChange}
        value={text}
      ></textarea>
    </div>
  );

  const commentText = () => {
    const text = comment.text.split(" ");
    if (text[0][0] === "@") {
      console.log(text[0]);
      const username = text.splice(0, 1);
      return (
        <span className="comment-text">
          <span className="at-symbol-refer">{username}</span> {text}
        </span>
      );
    }
    return <span className="comment-text">{text}</span>;
  };

  return (
    <div className="comment-module comment-container comment-border grid-area-comment font-color-primary">
      <CommentId className="grid-area-profile" comment={comment}></CommentId>
      <div className="grid-area-text text-container">
        {isCurrentUser && isEditing ? editUI : commentText()}
      </div>

      {isEditing ? (
        <button
          className="grid-area-update button primary-button"
          onClick={finishUpdateHandler}
        >
          Update
        </button>
      ) : (
        <CommentButtons
          className="grid-area-buttons"
          updateCallback={updateCallback}
          deleteCallback={deleteCallback}
          replyCallback={replyCallback}
          isCurrentUser={isCurrentUser}
        />
      )}

      <LikeComponent
        className="grid-area-like"
        callbacks={callbacks}
        comment={comment}
      ></LikeComponent>
    </div>
  );
};
