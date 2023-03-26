import { ChangeEvent, useContext, useState } from "react";
import { CommentsContext } from "../../context/comments.context";
import { date } from "../../helpers/helpers";
import {
  Comment as CommentType,
  CommentCallbacks,
  Thread,
} from "../../types/comments.types";

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
    <>
      <div>{isEditing ? editUI : comment.text}</div>
      <div>{comment.date}</div>
      <div>{comment.username}</div>
      <div>{comment.likes}</div>
      <button onClick={updateCallback}>Edit</button>
      <button onClick={deleteCallback}>Delete</button>
      <button onClick={replyCallback}>Reply</button>
      <button onClick={() => updateLikeCallback(1)}>Like</button>
      <button onClick={() => updateLikeCallback(-1)}>Dislike</button>
      {isEditing && <button onClick={finishUpdateHandler}>Update</button>}
    </>
  );
};
