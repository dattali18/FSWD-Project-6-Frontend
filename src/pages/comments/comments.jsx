import { faEdit, faEnvelope, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

import { PropTypes } from "prop-types";

import {
  createComment,
  deleteComment,
  getArticleComments,
  updateComment,
} from "../../api/comments";

import { convertToTime } from "../../utils/DateUtils";

import "./comments.css";

export default function Comments({ articleId, user }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingComment, setEditingComment] = useState(null);
  const [editedComment, setEditedComment] = useState({ content: "", id: -1 });

  useEffect(() => {
    const fetchComments = async () => {
      if (!articleId) {
        console.error("articleId is undefined");
        return;
      }
      try {
        const response = await getArticleComments(articleId);
        setComments(response.data.comments || []); // Ensure comments is always an array
      } catch (error) {
        console.error("Error fetching comments", error);
      }
    };
    fetchComments();
  }, [articleId]);

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await createComment({
        articleId: articleId,
        content: newComment,
      });
      setComments([...comments, response.data.comment]);
      setNewComment(""); // Clear the input
    } catch (error) {
      console.error("Error posting comment", error);
    }
  };

  const handleEditCommentSubmit = async (commentId) => {
    try {
      const response = await updateComment(commentId, editedComment.content);

      // if response in undefined, return
      if(!response) {
        return;
      }

      const updatedComments = comments.map((comment) =>
        comment.id === commentId ? response.data.comment : comment
      );

      setComments(updatedComments);
      setEditingComment(); // Clear the editing state
    } catch (error) {
      console.error("Error editing comment", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId);
      setComments(comments.filter((comment) => comment.id !== commentId));
    } catch (error) {
      console.error("Error deleting comment", error);
    }
  };

  return (
    <div className="comments-sec">
      <h3>Comments</h3>
      <div className="comments-list">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="comment">
              {editingComment === comment.id ? (
                <form className="form comment-form">
                  <input
                    className="form-input"
                    type="text"
                    value={editedComment.content}
                    onChange={(e) =>
                      setEditedComment({
                        ...editedComment,
                        content: e.target.value,
                      })
                    }
                  />
                  <div className="btn-group">
                    <button
                      className="btn btn-blue btn-sm"
                      onClick={() => handleEditCommentSubmit(comment.id)}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-red btn-sm"
                      onClick={() => setEditingComment(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="comment-object">
                  <div className="comment-header">
                    <p className="comment-author">By {comment.username}</p>
                    <p className="comment-date">
                      {convertToTime(comment.created_at)} ago
                    </p>
                  </div>
                  <p className="comment-content">{comment.content}</p>
                  {comment.user_id === user.id && (
                    <div className="comment-options btn-group">
                      <button
                        className="btn btn-blue btn-sm btn-icon"
                        onClick={() => {
                          setEditingComment(comment.id);
                          setEditedComment(comment);
                        }}
                      >
                        <FontAwesomeIcon icon={faEdit} /> Edit
                      </button>
                      <button
                        className="btn btn-red btn-sm btn-icon"
                        onClick={() => handleDeleteComment(comment.id)}
                      >
                        <FontAwesomeIcon icon={faTrash} /> Delete
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No comments yet. Be the first to comment!</p>
        )}
      </div>

      <form className="form" onSubmit={handleCommentSubmit}>
        <div className="input-group">
          <label htmlFor="comment">New Comment</label>
          <input
            type="text"
            name="comment"
            id="comment"
            className="form-input"
            placeholder="Your comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
        </div>
        <button type="submit" className="btn-icon btn btn-blue btn-sm">
          <FontAwesomeIcon icon={faEnvelope} />
          <p>Post</p>
        </button>
      </form>
    </div>
  );
}

Comments.propTypes = {
  articleId: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
};
