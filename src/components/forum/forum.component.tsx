import { CreateThread } from "../new-comment/create-thread/create-thread.component";
import { Threads } from "../threads/threads.component";
import "./forum.styles.scss";

export const Forum = () => {
  return (
    <div className="flex-column flex-gap-large interactive-comments-container">
      <div>Interactive Comments</div>
      <Threads></Threads>
      <span className="create-thread-wrapper">
        <CreateThread></CreateThread>
      </span>
    </div>
  );
};
