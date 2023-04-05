import { useContext } from "react";
import { CommentsContext } from "../../context/comments.context";
import { Thread } from "../thread/thread.component";
import "./threads.styles.scss";

export const Threads = () => {
  const { threads } = useContext(CommentsContext);

  return (
    <div className="flex-column flex-gap-normal">
      {threads.map((thread) => {
        return <Thread key={thread.id} thread={thread}></Thread>;
      })}
    </div>
  );
};
