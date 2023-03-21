import { useContext } from "react";
import { CommentsContext } from "../../context/comments.context";

export const Comments = () => {
  const { getComments } = useContext(CommentsContext);

  return (
    <div>
      {getComments().map((comment) => {
        return (
          <div>
            <div>{comment.text}</div>
            <div>{comment.date}</div>
            <div>{comment.username}</div>
          </div>
        );
      })}
    </div>
  );
};
