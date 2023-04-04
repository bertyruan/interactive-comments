import { Thread } from "./comments.types";

export type Forum = {
  threads: Thread[];
  id: string;
  date: string;
  name: string;
  likes: number;
};

export type Forums = {
  [id: string]: Forum;
};

export type ForumContext = {
  forums: Forum[];
  createForum: () => void;
};
