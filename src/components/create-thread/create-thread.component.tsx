import { ChangeEvent, useContext, useState } from "react";
import { CommentsContext } from "../../context/comments.context";
import { UsersContext } from "../../context/users.context";
import { CommentContext, CreateThreadProps } from "../../types/comments.types";
import { UserContext } from "../../types/users.types";

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
    <div>
      <textarea value={userComment} onChange={setUserCommentHandler}></textarea>
      <button onClick={createCommentCallback}>Create Comment!</button>
    </div>
  );
};
