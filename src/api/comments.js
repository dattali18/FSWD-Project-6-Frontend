/**
 * @desc This is the collection of all the routes related to the comments on the articles
 */

import { axios } from "axios";

import { BASE_URL } from "./index";

const URL = `${BASE_URL}/comments`;

// add the header x-auth-token to the request
axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token");

/**
 * @desc This function is used to get all the comments on an article
 * @param {Object} comment
 * @param {string} comment.content
 * @param {number} comment.articleId
 * @returns {Promise}
 */
async function createComment(comment) {
  try {
    return await axios.post(URL, comment);
  } catch (error) {
    console.error(error);
  }
}

/**
 * @desc This function is used to update a comment, only for the author of the comment
 * @param {Object} comment
 * @param {number} comment.id
 * @returns {Promise}
 */
async function deleteComment(comment) {
  try {
    return await axios.delete(`${URL}/${comment.id}`);
  } catch (error) {
    console.error(error);
  }
}

/**
 * @desc This function is used to update a comment, only for the author of the comment
 * @param {Object} comment
 * @param {number} comment.articleId
 * @param {string} comment.content
 * @returns {Promise}
 */
async function updateComment(comment) {
  try {
    return await axios.put(URL, comment);
  } catch (error) {
    console.error(error);
  }
}

/**
 *  @desc get all the comment on an article
 * @param {number} articleId
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
