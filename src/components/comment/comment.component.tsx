import { ChangeEvent, useState } from "react";
import {
  Comment as CommentType,
  CommentCallbacks,
} from "../../types/comments.types";
import "./comment.styles.scss";

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

  const updateLikeCallback = (incr: number) => {
    likeCallback(incr);
  };

  const editUI = <textarea onChange={onTextChange} value={text}></textarea>;

  return (
    <div className="comment-container comment-border grid-area-comment font-color-primary">
      <div className="grid-area-profile flex-row">
        <div>{comment.username}</div>
        <div>{comment.date}</div>
      </div>
      <div className="grid-area-text">{isEditing ? editUI : comment.text}</div>
      <div className="grid-area-buttons flex-row">
        <button onClick={updateCallback}>Edit</button>
        <button onClick={deleteCallback}>Delete</button>
        <button onClick={replyCallback}>Reply</button>
        {isEditing && <button onClick={finishUpdateHandler}>Update</button>}
      </div>
      <div className="like-container grid-area-like">
        <button onClick={() => updateLikeCallback(1)}>Like</button>
        <div>{comment.likes}</div>
        <button onClick={() => updateLikeCallback(-1)}>Dislike</button>
      </div>
    </div>
  );
};
