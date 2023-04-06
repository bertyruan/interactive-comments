import { ChangeEvent, useState } from "react";
import {
  Comment as CommentType,
  CommentCallbacks,
} from "../../types/comments.types";
import "./comment.styles.scss";
import { LikeComponent } from "./like/like.component";
import { Icon } from "../../assets/assets";
import { CommentId } from "./comment-id/comment-id.component";

type CommentProps = {
  comment: CommentType;
  callbacks: CommentCallbacks;
};

export const Comment = ({ comment, callbacks }: CommentProps) => {
  const { finishUpdateCallback, deleteCallback, replyCallback, likeCallback } =
    callbacks;
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(comment.text);

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
    <div className="flex-row flex-gap-normal">
      <textarea
        className="comment-edit-field "
        onChange={onTextChange}
        value={text}
      ></textarea>
      <button onClick={finishUpdateHandler}>Update</button>
    </div>
  );

  return (
    <div className="comment-container comment-border grid-area-comment font-color-primary">
      <CommentId className="grid-area-profile" comment={comment}></CommentId>
      <div className="grid-area-text comment-text">
        {isEditing ? editUI : comment.text}
      </div>
      <div className="grid-area-buttons flex-row flex-gap-large buttons-container">
        {!isEditing && (
          <>
            <button
              className="flex-row flex-gap-small"
              onClick={updateCallback}
            >
              {Icon.edit} Edit
            </button>
            <button
              className="flex-row flex-gap-small"
              onClick={deleteCallback}
              id="warning"
            >
              {Icon.delete} Delete
            </button>
            <button className="flex-row flex-gap-small" onClick={replyCallback}>
              {Icon.reply}
              Reply
            </button>
          </>
        )}
      </div>
      <LikeComponent
        className="grid-area-like"
        callbacks={callbacks}
        comment={comment}
      ></LikeComponent>
    </div>
  );
};
