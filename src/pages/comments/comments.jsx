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

import { useAuth } from "../../utils/hooks/useAuth";
import { useMessage } from "../../utils/hooks/useMessage";

import { convertToTime } from "../../utils/general/DateUtils";

import "./comments.css";

export default function Comments({ articleId, user }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingComment, setEditingComment] = useState(null);
  const [editedComment, setEditedComment] = useState({ content: "", id: -1 });

  const { token } = useAuth();
  const { addMessage } = useMessage();

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

    // if user is not logged in
    if (!token) {
      addMessage({
        text: "You must be logged in to comment",
        type: "alert",
        timeout: 3000,
      });
      return;
    }

    try {
      const response = await createComment({
        articleId: articleId,
        content: newComment,
      });
      // check if response is undefined
      if (!response) {
        addMessage({
          text: "Error posting comment",
          type: "alert",
          timeout: 3000,
        });
        return;
      }
      // call the api for fetching the comments
      const newComments = await getArticleComments(articleId);
      // check if newComments is undefined
      if (!newComments) {
        addMessage({
          text: "Error fetching comments",
          type: "alert",
          timeout: 3000,
        });
        return;
      }
      setComments(newComments.data.comments);
      setNewComment(""); // Clear the input

      addMessage({
        text: "Comment posted successfully",
        type: "success",
        timeout: 3000,
      });
    } catch (error) {
      console.error("Error posting comment", error);
    }
  };

  const handleEditCommentSubmit = async (commentId) => {
    try {
      const response = await updateComment(commentId, editedComment.content);

      // if response in undefined, return
      if (!response) {
        return;
      }

      // call the api for fetching the comments
      const newComments = await getArticleComments(articleId);
      // check if newComments is undefined
      if (!newComments) {
        addMessage({
          text: "Error fetching comments",
          type: "alert",
          timeout: 3000,
        });
        return;
      }
      setComments(newComments.data.comments);
      setEditingComment(); // Clear the editing state

      addMessage({
        text: "Comment edited successfully",
        type: "success",
        timeout: 3000,
      });
    } catch (error) {
      console.error("Error editing comment", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId);
      setComments(comments.filter((comment) => comment.id !== commentId));

      addMessage({
        text: "Comment deleted successfully",
        type: "success",
        timeout: 3000,
      });
    } catch (error) {
      console.error("Error deleting comment", error);
    }
  };

  return (
    <div className="comments-sec">
      <h3>Comments</h3>
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
        <button
          type="submit"
          className={
            "btn-icon btn btn-sm " +
            (token ? "btn-blue" : "btn-inactive btn-gray")
          }
        >
          <FontAwesomeIcon icon={faEnvelope} />
          <p>Post</p>
        </button>
      </form>
      <div className="comments-list">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="comment">
              {editingComment === comment.id ? (
                <div className="form comment-form">
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
                </div>
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
    </div>
  );
}

Comments.propTypes = {
  articleId: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
};
