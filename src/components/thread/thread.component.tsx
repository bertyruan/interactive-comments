import { useContext } from "react";
import { CommentsContext } from "../../context/comments.context";
import {
  CommentCallbacks,
  CreateReplyProps,
  Thread as ThreadType,
  Comment as CommentType,
} from "../../types/comments.types";
import { ReplyPrompt } from "../new-comment/reply-prompt/reply-prompt.component";
import { Comment } from "../comment/comment.component";

type ThreadProps = {
  thread: ThreadType;
};

export const Thread = ({ thread }: ThreadProps) => {
  const {
    deletePrompt,
    createReply,
    editThread,
    deleteThread,
    promptReply,
    editReply,
    deleteReply,
  } = useContext(CommentsContext);

  const createReplyCallback = (id: string, post: CreateReplyProps) => {
    createReply(post);
    deletePrompt(thread.id, id);
  };

  const replyCallback = () => {
    promptReply({
      replyingToId: thread.id,
      replyingToUserName: thread.username,
      threadId: thread.id,
    });
  };

  const threadCallbacks: CommentCallbacks = {
    replyCallback,
    finishUpdateCallback: (text: string) => {
      const newThread = { ...thread, text };
      editThread(newThread);
    },
    deleteCallback: () => {
      deleteThread(thread);
    },
    likeCallback: (incr: number) => {
      const newThread = { ...thread, likes: thread.likes + incr };
      editThread(newThread);
    },
  };

  const replyCallbacks = function (reply: CommentType) {
    const callbacks: CommentCallbacks = {
      replyCallback,
      finishUpdateCallback: (text: string) => {
        const newReply = { ...reply, text };
        editReply(thread, newReply);
      },
      deleteCallback: () => {
        deleteReply(thread, reply.id);
      },
      likeCallback: (incr: number) => {
        const newReply = { ...reply, likes: reply.likes + incr };
        editReply(thread, newReply);
      },
    };
    return callbacks;
  };

  return (
    <>
      <Comment comment={thread} callbacks={threadCallbacks}></Comment>
      {thread.replies.map((reply) => (
        <Comment
          key={reply.id}
          callbacks={replyCallbacks(reply)}
          comment={reply}
        />
      ))}
      {thread.prompts.map((prompt) => {
        return (
          <ReplyPrompt
            key={prompt.id}
            prompt={prompt}
            onSubmit={createReplyCallback}
          ></ReplyPrompt>
        );
      })}
    </>
  );
};
