import React, { useState } from "react";
import {
  Heart,
  MessageCircle,
  MapPin,
  Calendar,
  User,
  Image,
  Video,
  Send
} from "lucide-react";
import { getStatusInfo, getCategoryColor } from "../../data/mockData";
import { likeComplaint, addComment } from "../../services/complaintService";

export default function ComplaintCard({ complaint, showUser = false }) {
  const statusInfo = getStatusInfo(complaint.status);
  const userId = localStorage.getItem("userId");

  /* ---------- LIKE STATE ---------- */
  const [liked, setLiked] = useState(
    complaint.likes?.some(id => id.toString() === userId)
  );
  const [likeCount, setLikeCount] = useState(complaint.likes?.length || 0);
  const [likeLoading, setLikeLoading] = useState(false);

  /* ---------- COMMENT STATE ---------- */
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(complaint.comments || []);
  const [commentLoading, setCommentLoading] = useState(false);

  /* ---------- HANDLERS ---------- */
  const handleLike = async () => {
    if (likeLoading) return;
    try {
      setLikeLoading(true);
      const res = await likeComplaint(complaint._id);
      setLiked(prev => !prev);
      setLikeCount(res.likesCount);
    } catch (err) {
      console.error("Like failed:", err.response?.data || err.message);
    } finally {
      setLikeLoading(false);
    }
  };

  const handleAddComment = async () => {
    if (!commentText.trim()) return;

    try {
      setCommentLoading(true);
      const res = await addComment(complaint._id, commentText);

      setComments(res.comments);
      setCommentText("");
    } catch (err) {
      console.error("Comment failed:", err.response?.data || err.message);
    } finally {
      setCommentLoading(false);
    }
  };

  const formatDate = date =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const hasMedia = complaint.media?.length > 0;

  return (
    <div className="glass-strong rounded-2xl border border-border overflow-hidden card-hover">
      {/* MEDIA */}
      {hasMedia && (
        <div className="relative h-40 bg-muted overflow-hidden">
          {complaint.media[0].type === "image" ? (
            <img
              src={complaint.media[0].url}
              alt="media"
              className="w-full h-full object-cover"
            />
          ) : (
            <video
              src={complaint.media[0].url}
              className="w-full h-full object-cover"
              controls
            />
          )}
        </div>
      )}

      <div className="p-5">
        {/* HEADER */}
        <div className="mb-3">
          <div className="flex gap-2 mb-2">
            <span className={`px-2 py-1 text-xs rounded-lg text-white ${getCategoryColor(complaint.category)}`}>
              {complaint.category}
            </span>
            <span className={`px-2 py-1 text-xs rounded-lg ${statusInfo.class}`}>
              {statusInfo.label}
            </span>
          </div>
          <h3 className="text-lg font-semibold">{complaint.title}</h3>
        </div>

        {/* DESCRIPTION */}
        <p className="text-sm text-muted-foreground mb-4">
          {complaint.description}
        </p>

        {/* META */}
        <div className="flex gap-3 text-xs text-muted-foreground mb-4">
          {showUser && (
            <div className="flex items-center gap-1">
              <User className="w-3.5 h-3.5" />
              {complaint.userName}
            </div>
          )}
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            {complaint.address}
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {formatDate(complaint.createdAt)}
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-4 pt-4 border-t">
          <button
            onClick={handleLike}
            disabled={likeLoading}
            className={`flex gap-2 items-center ${
              liked ? "text-destructive" : "text-muted-foreground"
            }`}
          >
            <Heart className={`w-5 h-5 ${liked ? "fill-current" : ""}`} />
            {likeCount}
          </button>

          <button
            onClick={() => setShowComments(prev => !prev)}
            className="flex gap-2 items-center text-muted-foreground"
          >
            <MessageCircle className="w-5 h-5" />
            {comments.length}
          </button>
        </div>

        {/* COMMENTS */}
        {showComments && (
          <div className="mt-4 space-y-3">
            {comments.map((c, i) => (
              <div key={i} className="text-sm bg-muted/50 p-2 rounded">
                {c.text}
              </div>
            ))}

            <div className="flex gap-2">
              <input
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
                placeholder="Write a comment..."
                className="flex-1 px-3 py-2 text-sm rounded border bg-background"
              />
              <button
                onClick={handleAddComment}
                disabled={commentLoading}
                className="px-3 rounded bg-primary text-white"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
