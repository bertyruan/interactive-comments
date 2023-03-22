import React, { useState } from "react";
import { createContext } from "react";
import { ReactNode } from "react";
import { ChildrenProp } from "../types/generic.types";
import {
  CommentContext,
  CreateThreadProps,
  Comment,
  Thread,
  CreateReplyProps,
  Prompt,
} from "../types/comments.types";
import { createId, date } from "../helpers/helpers";

const createNewComment = (username: string, text: string) => {
  return {
    id: createId(),
    likes: 0,
    username: username,
    text: text,
    date: date.now(),
  } as Comment;
};

const createNewReply = (post: CreateReplyProps) => {
  const { username, text } = post;
  return createNewComment(username, text);
};

const createNewThread = (post: CreateThreadProps) => {
  const { username, text } = post;
  const newThread = createNewComment(username, text);
  return { ...newThread, replies: [], prompts: [] } as Thread;
};

export const CommentsContext = createContext<CommentContext>({
  threads: [],
  createThread: () => {},
  editThread: () => {},
  deleteThread: () => {},
  promptReply: () => {},
  createReply: () => {},
  editReply: () => {},
  deleteReply: () => {},
});

export const CommentsProvider = ({ children }: ChildrenProp) => {
  const [threads, setThreads] = useState<Thread[]>([]);

  const createThread = (post: CreateThreadProps) => {
    const newComment = createNewThread(post);
    setThreads((state) => state.concat(newComment));
  };

  const editThread = (thread: Thread) => {
    setThreads((state) =>
      state.map((t) => {
        if (t.id === thread.id) return { ...thread };
        return t;
      })
    );
  };

  const deleteThread = (thread: Thread) => {
    setThreads((state) => state.filter((s) => s.id !== thread.id));
  };

  const promptReply = (prompt: Prompt) => {
    setThreads((state) =>
      state.map((t) => {
        if (t.id === prompt.thread.id) {
          const threadPrompt = t.prompts.filter((p) => {
            return (
              prompt.thread.id === p.thread.id &&
              prompt.reply?.id === p.reply?.id
            );
          });

          if (!threadPrompt.length) {
            const prompts = t.prompts.concat(prompt);
            return { ...t, prompts };
          }
        }
        return t;
      })
    );
  };

  const createReply = (post: CreateReplyProps) => {
    const newReply = createNewReply(post);
    setThreads((state) =>
      state.map((thread) => {
        if (thread.id === post.parent.id) {
          return { ...thread, replies: thread.replies.concat(newReply) };
        }
        return thread;
      })
    );
  };

  const editReply = (thread: Thread) => {
    setThreads((state) =>
      state.map((t) => {
        if (t.id === thread.id) {
          return { ...thread };
        }
        return thread;
      })
    );
  };

  const deleteReply = (thread: Thread) => {
    setThreads((state) =>
      state.map((t) => {
        if (t.id === thread.id) {
          return { ...thread };
        }
        return t;
      })
    );
  };

  const value = {
    threads,
    createThread,
    editThread,
    deleteThread,
    promptReply,
    createReply,
    editReply,
    deleteReply,
  };

  return (
    <CommentsContext.Provider value={value}>
      {children}
    </CommentsContext.Provider>
  );
};
