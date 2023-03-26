import { ChangeEvent, useState } from "react";
import { CreateReplyProps, Prompt } from "../../types/comments.types";

type ReplyPromptType = {
  prompt: Prompt;
  onSubmit: (id: string, post: CreateReplyProps) => void;
};

export const ReplyPrompt = ({ prompt, onSubmit }: ReplyPromptType) => {
  const [text, setText] = useState(`@${prompt.replyingToUserName} `);

  const textareaChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const onClickCallback = () => {
    const post: CreateReplyProps = {
      username: "bob the nany",
      parentId: prompt.threadId,
      text,
    };
    onSubmit(prompt.id, post);
  };

  return (
    <div>
      <textarea onChange={textareaChangeHandler} value={text}></textarea>
      <button onClick={onClickCallback}>Reply</button>
    </div>
  );
};
