/**
 * @desc This function is used to like an article
 */

import axios from "axios";

import { BASE_URL } from "./../data/api";

const URL = `${BASE_URL}/likes`;

// add the header x-auth-token to the request
axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token");

/**
 * @desc This function is used to like an article
 * @param {number} articleId
 * @returns {Promise}
 */
async function likeArticle(articleId) {
  try {
    return await axios.post(URL, { articleId });
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
    return await axios.delete(URL, { articleId });
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

export { getArticleLikes, getUserLikes, likeArticle, unlikeArticle };
