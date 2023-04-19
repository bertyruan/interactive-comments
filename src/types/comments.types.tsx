import { Modal } from "./modal.types";

export type Comment = {
  id: string;
  username: string;
  likes: number;
  text: string;
  date: string;
};

export type Prompt = CreatePromptProps & { id: string };

export type Thread = Comment & { replies: Comment[] } & { prompts: Prompt[] };

export type CreateThreadProps = {
  username: string;
  text: string;
};

export type CreateReplyProps = CreateThreadProps & { parentId: string };

export type CreatePromptProps = {
  threadId: string;
  replyingToUserName: string;
  replyingToId: string;
};

export type CommentCallbacks = {
  finishUpdateCallback: (text: string) => void;
  deleteCallback: () => void;
  replyCallback: () => void;
  likeCallback: (incr: number) => void;
};

export type CommentContext = {
  threads: Thread[];
  modal: Modal;
  confirmModal: (del: boolean) => void;
  showModal: (callback: () => void) => void;
  createThread: (post: CreateThreadProps) => void;
  editThread: (thread: Thread) => void;
  deleteThread: (thread: Thread) => void;
  promptReply: (prompt: CreatePromptProps) => void;
  deletePrompt: (threadId: string, promptId: string) => void;
  createReply: (post: CreateReplyProps) => void;
  editReply: (thread: Thread, reply: Comment) => void;
  deleteReply: (thread: Thread, replyId: string) => void;
};
