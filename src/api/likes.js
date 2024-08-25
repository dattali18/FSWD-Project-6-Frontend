/**
 * @desc This function is used to like an article
 */

import { getToken } from "./../utils/tokenUtil";

import axios from "axios";

import { BASE_URL } from "./../data/api";

const URL = `${BASE_URL}/likes`;

// add the header x-auth-token to the request
axios.defaults.headers.common["x-auth-token"] = getToken();

/**
 * @desc This function is used to like an article
 * @param {number} articleId
 * @returns {Promise}
 */
async function likeArticle(articleId) {
  try {
    // the body is the articleId
    return await axios.post(URL, { article_id: articleId });
  } catch (error) {
    console.error(error);
  }
}

/**
 * @desc This function is used to unlike an article
 * @param {number} articleId
 * @returns {Promise}
 */
async function unlikeArticle(articleId) {
  try {
    return await axios.delete(URL, { params: { article_id: articleId } });
  } catch (error) {
    console.error(error);
  }
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

async function isLiked(articleId) {
  try {
    return await axios.get(`${URL}/liked`, {
      params: { article_id: articleId },
    });
  } catch (error) {
    console.error(error);
  }
}

export { getArticleLikes, getUserLikes, isLiked, likeArticle, unlikeArticle };
