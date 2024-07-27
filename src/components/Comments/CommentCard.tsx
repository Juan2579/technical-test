import { Comment } from "@/types/Comment";

import { getPostedDate } from "@/utils/getPostedDate";

import { ProfileAvatar } from "../Shared/ProfileAvatar";

const CommentCard = ({ comment }: { comment: Comment }) => {
  return (
    <div className="w-full flex gap-4 p-6 border">
      <ProfileAvatar
        username={comment.author.username}
        avatarUrl={comment.author.avatar_url}
      />
      <div className="w-full flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="font-bold">{comment.author.username}</span>
          <span className="text-sm">{getPostedDate(comment.created_at)}</span>
        </div>
        <span>{comment.content}</span>
      </div>
    </div>
  );
};

export default CommentCard;
