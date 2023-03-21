import "./App.css";
import { Comments } from "./components/comments/comments.component";
import { CreateComment } from "./components/create-comment/create-comment.component";

const App = () => {
  return (
    <div>
      <div>Interactive Comments</div>
      <Comments></Comments>
      <CreateComment></CreateComment>
    </div>
  );
};

export default App;
