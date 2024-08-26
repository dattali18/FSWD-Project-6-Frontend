/**
 * @desc This is the collection of all the routes related to the comments on the articles
 */

import { authenticatedRequest } from "../utils/general/tokenUtil";

import axios from "axios";

import { BASE_URL } from "./../data/api";

const URL = `${BASE_URL}/comments`;

/**
 * @desc This function is used to get all the comments on an article
 * @param {Object} comment
 * @param {string} comment.content
 * @param {number} comment.articleId
 * @access private
 * @returns {Promise}
 */
async function createComment(comment) {
  return await authenticatedRequest(URL, "post", comment);
}

/**
 * @desc This function is used to update a comment, only for the author of the comment
 * @param {Object} comment
 * @param {number} commentId
 * @access private
 * @returns {Promise}
 */
async function deleteComment(commentId) {
  return await authenticatedRequest(`${URL}/${commentId}`, "delete");
}

/**
 * @desc This function is used to update a comment, only for the author of the comment
 * @param {number} comment_id
 * @param {string} content
 * @access private
 * @returns {Promise}
 */
async function updateComment(comment_id, content) {
  return await authenticatedRequest(`${URL}/`, "put", { comment_id, content });
}

/**
 *  @desc get all the comment on an article
 * @param {number} articleId
 * @access public
 * @returns {Promise}
 */
async function getArticleComments(articleId) {
  try {
    return await axios.get(`${URL}/article/${articleId}`);
  } catch (error) {
    console.error(error);
  }
}

/**
 * @desc This function is used to get all the comments of a user
 * @param {number} userId
 * @access public
 * @returns {Promise}
 */
async function getUserComments(userId) {
  try {
    return await axios.get(`${URL}/user/${userId}`);
  } catch (error) {
    console.error(error);
  }
}

export {
  createComment,
  deleteComment,
  getArticleComments,
  getUserComments,
  updateComment,
};
