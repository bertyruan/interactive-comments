export type Comment = {
  id: string;
  username: string;
  likes: number;
  text: string;
  date: string;
};

export type CommentWithReplies = Comment & { replies: number[] };

export type Comments = {
  [id: string]: CommentWithReplies;
};

export type Replies = {
  [id: string]: Comment & { parentId: number };
};

export type CommentsAndReplies = {
  parents: Comments;
  children: Replies;
};

export type CreateCommentProps = {
  parent: Comment | null;
  username: string;
  text: string;
};

export type CommentContext = {
  comments: CommentsAndReplies;
  createComment: (post: CreateCommentProps) => void;
  editComment: (text: string, comment: Comment) => void;
  deleteComment: (comment: Comment) => void;
};
