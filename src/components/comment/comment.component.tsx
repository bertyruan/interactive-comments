import { ChangeEvent, useContext, useState } from "react";
import {
  Comment as CommentType,
  CommentCallbacks,
} from "../../types/comments.types";
import "./comment.styles.scss";
import { LikeComponent } from "./like/like.component";
import { Icon } from "../../assets/assets";
import { CommentId } from "./comment-id/comment-id.component";
import { CommentButtons } from "./comment-buttons/comment-buttons.component";
import { UsersContext } from "../../context/users.context";

type CommentProps = {
  comment: CommentType;
  callbacks: CommentCallbacks;
};

export const Comment = ({ comment, callbacks }: CommentProps) => {
  const { finishUpdateCallback, deleteCallback, replyCallback, likeCallback } =
    callbacks;
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

  return (
    <div className="comment-module comment-container comment-border grid-area-comment font-color-primary">
      <CommentId className="grid-area-profile" comment={comment}></CommentId>
      <div className="grid-area-text text-container">
        {isCurrentUser && isEditing ? (
          editUI
        ) : (
          <span className=" comment-text">{comment.text}</span>
        )}
      </div>

      {isEditing ? (
        <button
          className="grid-area-update primary-button"
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
