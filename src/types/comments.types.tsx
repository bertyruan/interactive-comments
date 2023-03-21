export type Comment = {
  id: string;
  username: string;
  likes: number;
  text: string;
  date: string;
};

export type Thread = Comment & { replies: Comment[] };

export type CreateThreadProps = {
  username: string;
  text: string;
};

export type CreateReplyProps = CreateThreadProps & { parent: Comment };

export type CommentContext = {
  threads: Thread[];
  createThread: (post: CreateThreadProps) => void;
  editThread: (thread: Thread) => void;
  deleteThread: (thread: Thread) => void;
  createReply: (post: CreateReplyProps) => void;
  editReply: (thread: Thread) => void;
  deleteReply: (thread: Thread) => void;
};
