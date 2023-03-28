import { useState } from "react";
import { createContext } from "react";
import { ChildrenProp } from "../types/generic.types";
import {
  CommentContext,
  CreateThreadProps,
  Comment,
  Thread,
  CreateReplyProps,
  CreatePromptProps,
} from "../types/comments.types";
import { createId, date } from "../utils/helpers.utils";

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

const createNewPrompt = (prompt: CreatePromptProps) => {
  return {
    ...prompt,
    id: createId(),
  };
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
  deletePrompt: () => {},
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

  const promptReply = (prompt: CreatePromptProps) => {
    setThreads((state) =>
      state.map((thread) => {
        if (thread.id === prompt.threadId) {
          const promptExists =
            thread.prompts.filter((p) => p.replyingToId === prompt.replyingToId)
              .length > 0;
          if (!promptExists) {
            const newPrompt = createNewPrompt(prompt);
            const prompts = thread.prompts.concat(newPrompt);
            return { ...thread, prompts };
          }
        }
        return thread;
      })
    );
  };

  const deletePrompt = (threadId: string, promptId: string) => {
    setThreads((state) => {
      return state.map((thread) => {
        if (threadId === thread.id) {
          const prompts = thread.prompts.filter(
            (prompt) => prompt.id !== promptId
          );
          return {
            ...thread,
            prompts,
          };
        }
        return thread;
      });
    });
  };

  const createReply = (post: CreateReplyProps) => {
    const newReply = createNewReply(post);
    setThreads((state) =>
      state.map((thread) => {
        if (thread.id === post.parentId) {
          return { ...thread, replies: thread.replies.concat(newReply) };
        }
        return thread;
      })
    );
  };

  const editReply = (thread: Thread, reply: Comment) => {
    setThreads((state) =>
      state.map((t) => {
        if (t.id === thread.id) {
          const replies = t.replies.map((r) => {
            if (r.id === reply.id) {
              return { ...reply };
            }
            return r;
          });
          return { ...t, replies };
        }
        return t;
      })
    );
  };

  const deleteReply = (thread: Thread, replyId: string) => {
    setThreads((state) =>
      state.map((t) => {
        if (t.id === thread.id) {
          const replies = thread.replies.filter(
            (reply) => reply.id !== replyId
          );
          return { ...thread, replies };
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
    deletePrompt,
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
