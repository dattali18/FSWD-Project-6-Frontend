/**
 * @desc This function is used to like an article
 */

import { authenticatedRequest } from "../utils/general/tokenUtil";

import axios from "axios";

import { BASE_URL } from "./../data/api";

const URL = `${BASE_URL}/likes`;

/**
 * @desc This function is used to like an article
 * @param {number} articleId
 * @access private
 * @returns {Promise}
 */
async function likeArticle(articleId) {
  return await authenticatedRequest(URL, "post", { article_id: articleId });
}

/**
 * @desc This function is used to unlike an article
 * @param {number} articleId
 * @access private
 * @returns {Promise}
 */
async function unlikeArticle(articleId) {
  return await authenticatedRequest(`${URL}?article_id=${articleId}`, "delete");
}

/**
 * @desc This function is used to get all the likes on an article
 * @param {number} articleId
 * @returns {Promise}
 */
async function getArticleLikes(articleId) {
  try {
    return await axios.get(`${URL}/article/${articleId}`);
  } catch (error) {
    console.error(error);
  }
}

/**
 * @desc This function is used to get all the likes of a user
 * @param {number} userId
 * @returns {Promise}
 */
async function getUserLikes(userId) {
  try {
    return await axios.get(`${URL}/user/${userId}`);
  } catch (error) {
    console.error(error);
  }
}

/**
 * @param {number} articleId
 * @access private
 * @returns {Promise}
 */
async function isLiked(articleId) {
  // try {
  //   return await axios.get(`${URL}/liked`, {
  //     params: { article_id: articleId },
  //   });
  // } catch (error) {
  //   console.error(error);
  // }
  return await authenticatedRequest(
    `${URL}/liked?article_id=${articleId}`,
    "get"
  );
}

export { getArticleLikes, getUserLikes, isLiked, likeArticle, unlikeArticle };
