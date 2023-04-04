import { ChangeEvent, useContext, useState } from "react";
import { Forum } from "../../types/forums.types";
import { ForumsContext } from "../../context/forums.context";

export const Forums = () => {
  const { forums, createForum } = useContext(ForumsContext);
  const [forumName, setForumName] = useState("");

  const setFourmNameHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setForumName(() => e.target.value);
  };

  const createForumHandler = () => {
    createForum();
    setForumName(() => "");
  };

  return (
    <>
      <div>
        {forums.map((forum: Forum) => {
          return (
            <div>
              <span>Name: {forum.name}</span>
            </div>
          );
        })}
      </div>
      <div>
        Create a forum!
        <textarea value={forumName} onChange={setFourmNameHandler}></textarea>
        <button onClick={createForumHandler}>Create Comment!</button>
      </div>
    </>
  );
};
