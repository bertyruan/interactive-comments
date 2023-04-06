import "./like.styles.scss";
import {
  Comment as CommentType,
  CommentCallbacks,
} from "../../../types/comments.types";
import { Icon } from "../../../assets/assets";

type CommentProps = {
  comment: CommentType;
  callbacks: CommentCallbacks;
  className: string;
};

export const LikeComponent = ({
  comment,
  callbacks: { likeCallback },
  className,
}: CommentProps) => {
  const updateLikeCallback = (incr: number) => {
    likeCallback(incr);
  };

  return (
    <div className={`like-container ${className}`}>
      <button onClick={() => updateLikeCallback(1)}>{Icon.plus}</button>
      <div>{comment.likes}</div>
      <button
        onClick={() => updateLikeCallback(-1)}
        disabled={comment.likes === 0}
      >
        {Icon.minus}
      </button>
    </div>
  );
};
