import { CreateThread } from "../create-thread/create-thread.component";
import { Threads } from "../threads/threads.component";
import "./forum.styles.scss";

export const Forum = () => {
  return (
    <div className="flex-column flex-gap-normal">
      <div>Interactive Comments</div>
      <Threads></Threads>
      <CreateThread></CreateThread>
    </div>
  );
};
