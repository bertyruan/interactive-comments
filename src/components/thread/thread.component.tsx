import { ChangeEvent, useContext, useState } from "react";
import { CommentsContext } from "../../context/comments.context";
import { Thread as ThreadType } from "../../types/comments.types";
import { date } from "../../helpers/helpers";

type ThreadProps = {
  thread: ThreadType;
};

export const Thread = ({ thread }: ThreadProps) => {
  const { editThread, deleteThread, promptReply } = useContext(CommentsContext);
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(thread.text);

  const editThreadCallback = () => {
    setIsEditing(true);
  };

  const confirmEditThreadCallback = () => {
    setIsEditing(false);
    const newThread = { ...thread, text, date: date.now() };
    editThread(newThread);
  };

  const deleteThreadCallback = () => {
    deleteThread(thread);
  };

  const replyCallback = () => {
    promptReply({ thread, reply: null });
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
      <button onClick={editThreadCallback}>Edit</button>
      <button onClick={deleteThreadCallback}>Delete</button>
      <button onClick={replyCallback}>Reply</button>
      {isEditing && <button onClick={confirmEditThreadCallback}>Update</button>}
      {thread.replies.map((reply) => {
        return (
          <div key={reply.id}>
            {reply.username}, {reply.text}, {reply.date}
          </div>
        );
      })}
      {thread.prompts.map((prompt) => {
        return <div>A reply prompt</div>;
      })}
    </>
  );
};
