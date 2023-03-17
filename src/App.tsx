import { useContext } from "react";
import "./App.css";
import { CommentsContext } from "./context/comments.context";
import { CreateCommentProps } from "./types/comments.types";

const App = () => {
  const { comments, createComment } = useContext(CommentsContext);
  const { parents, children } = comments;

  const createCommentCallback = () => {
    const commentProps: CreateCommentProps = {
      parent: null,
      text: "Hello World!",
      username: "bob the builder",
    };
    createComment(commentProps);
  };

  return (
    <div>
      <div>Interactive Comments</div>
      <div>
        {Object.keys(parents).map((key: string) => {
          const { id, username, text } = parents[key];
          return (
            <div key={id}>
              {username} posted {text}
            </div>
          );
        })}
      </div>
      <div>
        <button onClick={createCommentCallback}>Create Comment!</button>
      </div>
    </div>
  );
};

export default App;
