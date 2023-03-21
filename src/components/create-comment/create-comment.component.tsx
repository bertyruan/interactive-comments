import { ChangeEvent, useContext, useState } from "react";
import { CommentsContext } from "../../context/comments.context";
import { CommentContext, CreateThreadProps } from "../../types/comments.types";

export const CreateComment = () => {
  const { createComment } = useContext<CommentContext>(CommentsContext);
  const [userComment, setUserComment] = useState("");

  const createCommentCallback = () => {
    const commentProps: CreateThreadProps = {
      parent: null,
      text: userComment,
      username: "bob the builder",
    };
    createComment(commentProps);
    setUserComment(() => "");
  };

  const setUserCommentHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setUserComment(() => event.target.value);
  };

  return (
    <div>
      <textarea value={userComment} onChange={setUserCommentHandler}></textarea>
      <button onClick={createCommentCallback}>Create Comment!</button>
    </div>
  );
};
