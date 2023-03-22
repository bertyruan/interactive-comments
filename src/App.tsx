import "./App.css";
import { Threads } from "./components/threads/threads.component";
import { CreateThread } from "./components/create-thread/create-thread.component";

const App = () => {
  return (
    <div>
      <div>Interactive Comments</div>
      <Threads></Threads>
      <CreateThread></CreateThread>
    </div>
  );
};

export default App;
