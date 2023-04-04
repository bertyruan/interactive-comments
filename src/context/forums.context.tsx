import { createContext, useState } from "react";
import { ChildrenProp } from "../types/generic.types";
import { ForumContext } from "../types/forums.types";

export const ForumsContext = createContext<ForumContext>({
  forums: [],
  createForum: () => {},
});

export const ForumProvider = ({ children }: ChildrenProp) => {
  const [forums, setForums] = useState([]);

  const createForum = () => {};

  const value = { forums, createForum };

  return (
    <ForumsContext.Provider value={value}>{children}</ForumsContext.Provider>
  );
};
