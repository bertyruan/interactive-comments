import { useContext } from "react";
import { UsersContext } from "../../../context/users.context";
import { CreateReplyProps, Prompt } from "../../../types/comments.types";
import { NewComment } from "../new-comment.component";

type ReplyPromptType = {
  prompt: Prompt;
  onSubmit: (id: string, post: CreateReplyProps) => void;
};

export const ReplyPrompt = ({ prompt, onSubmit }: ReplyPromptType) => {
  const { user } = useContext(UsersContext);
  const defaultText = `@${prompt.replyingToUserName}  `;

  const onClickCallback = (userComment: string) => {
    const post: CreateReplyProps = {
      username: user.displayName,
      parentId: prompt.threadId,
      text: userComment,
    };
    onSubmit(prompt.id, post);
  };

  return (
    <NewComment
      type="Reply"
      createComment={onClickCallback}
      defaultText={defaultText}
    ></NewComment>
  );
};
