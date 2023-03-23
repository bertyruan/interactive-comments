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

export type CommentContext = {
  threads: Thread[];
  createThread: (post: CreateThreadProps) => void;
  editThread: (thread: Thread) => void;
  deleteThread: (thread: Thread) => void;
  promptReply: (prompt: CreatePromptProps) => void;
  deletePrompt: (threadId: string, promptId: string) => void;
  createReply: (post: CreateReplyProps) => void;
  editReply: (thread: Thread) => void;
  deleteReply: (thread: Thread) => void;
};
