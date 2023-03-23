import { ChangeEvent, useContext, useState } from "react";
import { CommentsContext } from "../../context/comments.context";
import {
  CreateReplyProps,
  Thread as ThreadType,
} from "../../types/comments.types";
import { date } from "../../helpers/helpers";
import { ReplyPrompt } from "../reply-prompt/reply-prompt.component";

type ThreadProps = {
  thread: ThreadType;
};

export const Thread = ({ thread }: ThreadProps) => {
  const { editThread, deleteThread, promptReply, deletePrompt, createReply } =
    useContext(CommentsContext);
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(thread.text);

  const updateCallback = () => {
    setIsEditing(true);
  };

  const finishUpdateCallback = () => {
    setIsEditing(false);
    const newThread = { ...thread, text, date: date.now() };
    editThread(newThread);
  };

  const deleteThreadCallback = () => {
    deleteThread(thread);
  };

  const replyCallback = () => {
    promptReply({
      replyingToId: thread.id,
      replyingToUserName: thread.username,
      threadId: thread.id,
    });
  };

  const createReplyCallback = (id: string, post: CreateReplyProps) => {
    createReply(post);
    deletePrompt(thread.id, id);
  };

  const onTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const editUI = <textarea onChange={onTextChange} value={text}></textarea>;

  return (
    <>
      <div>{isEditing ? editUI : thread.text}</div>
      <div>{thread.date}</div>
      <div>{thread.username}</div>
      <button onClick={updateCallback}>Edit</button>
      <button onClick={deleteThreadCallback}>Delete</button>
      <button onClick={replyCallback}>Reply</button>
      {isEditing && <button onClick={finishUpdateCallback}>Update</button>}
      {thread.replies.map((reply) => {
        return (
          <div key={reply.id}>
            {reply.username}, {reply.text}, {reply.date}
          </div>
        );
      })}
      {thread.prompts.map((prompt) => {
        return (
          <ReplyPrompt
            key={prompt.id}
            prompt={prompt}
            onSubmit={createReplyCallback}
          ></ReplyPrompt>
        );
      })}
    </>
  );
};
