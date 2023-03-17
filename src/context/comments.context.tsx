import React, { useState } from "react";
import { createContext } from "react";
import { ReactNode } from "react";
import { ChildrenProp } from "../types/generic.types";
import {
  CommentContext,
  CommentsAndReplies,
  CreateCommentProps,
  Comment,
  CommentWithReplies,
} from "../types/comments.types";
import { createId, getDateString } from "../helpers/helpers";

export const CommentsContext = createContext<CommentContext>({
  comments: { parents: {}, children: {} },
  createComment: () => {},
  editComment: () => {},
  deleteComment: () => {},
});

export const CommentsProvider = ({ children }: ChildrenProp) => {
  const [comments, setComments] = useState<CommentsAndReplies>({
    parents: {},
    children: {},
  });

  const createComment = (post: CreateCommentProps) => {
    const { parent, username, text } = post;
    if (!parent) {
      const newComment: CommentWithReplies = {
        id: createId(),
        likes: 0,
        replies: [],
        username: username,
        text: text,
        date: getDateString(),
      };
      setComments((state) => {
        const a = {
          ...state,
          parents: {
            ...state.parents,
            [newComment.id]: newComment,
          },
        };
        console.log(a);
        return a;
      });
    }
  };

  const editComment = (text: string, comment: Comment) => {};

  const deleteComment = (comment: Comment) => {};

  const value = { comments, createComment, editComment, deleteComment };

  return (
    <CommentsContext.Provider value={value}>
      {children}
    </CommentsContext.Provider>
  );
};
