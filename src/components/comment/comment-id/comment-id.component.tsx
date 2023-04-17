import { Comment } from "../../../types/comments.types";
import { date } from "../../../utils/helpers.utils";
import "./comment-id.styles.scss";
import { Avatar } from "../../../assets/assets";
import { useContext } from "react";
import { UsersContext } from "../../../context/users.context";

type CommentIdProps = {
  comment: Comment;
  className: string;
};

export const CommentId = ({ comment, className }: CommentIdProps) => {
  const { user } = useContext(UsersContext);

  return (
    <div
      className={`${className} comment-id-container flex-row flex-gap-normal `}
    >
      <img
        alt={"amy robson"}
        className="avatar-normal"
        src={Avatar.amyrobson}
      ></img>
      <div className="font-color-secondary flex-row">
        {comment.username}
        {user.displayName === comment.username && (
          <span className="username-self">you</span>
        )}
      </div>
      <div>{date.getRelativeTime(comment.date)}</div>
    </div>
  );
};
