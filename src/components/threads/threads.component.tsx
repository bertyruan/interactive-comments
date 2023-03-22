import { useContext } from "react";
import { CommentsContext } from "../../context/comments.context";
import { Thread } from "../thread/thread.component";

export const Threads = () => {
  const { threads } = useContext(CommentsContext);

  return (
    <div>
      {threads.map((thread) => {
        return <Thread key={thread.id} thread={thread}></Thread>;
      })}
    </div>
  );
};
