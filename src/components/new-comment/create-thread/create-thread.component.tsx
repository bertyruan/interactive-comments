import { useContext } from "react";
import { CommentsContext } from "../../../context/comments.context";
import { UsersContext } from "../../../context/users.context";
import {
  CommentContext,
  CreateThreadProps,
} from "../../../types/comments.types";
import { UserContext } from "../../../types/users.types";
import { NewComment } from "../new-comment.component";
import "./create-thread.styles.scss";

export const CreateThread = () => {
  const { createThread } = useContext<CommentContext>(CommentsContext);
  const { user } = useContext<UserContext>(UsersContext);

  const createCommentCallback = (userComment: string) => {
    const commentProps: CreateThreadProps = {
      text: userComment,
      username: user.displayName,
    };
    createThread(commentProps);
  };

  return (
    <NewComment
      type="Send"
      createComment={createCommentCallback}
      defaultText=""
    ></NewComment>
  );
};
