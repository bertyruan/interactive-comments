import { CreateThread } from "../create-thread/create-thread.component";
import { Threads } from "../threads/threads.component";

export const Forum = () => {
  return (
    <div>
      <div>Interactive Comments</div>
      <Threads></Threads>
      <CreateThread></CreateThread>
    </div>
  );
};
