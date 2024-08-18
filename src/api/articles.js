/**
 * @desc The collection of all the routes related to the articles
 */

import { axios } from "axios";

import { BASE_URL } from "./index";

const URL = `${BASE_URL}/articles`;

/**
 * @desc This function is used to get all the articles
 * @param {number} id
 * @returns {Promise}
 */
async function getArticleById(id) {
  try {
    return await axios.get(`${URL}/${id}`);
  } catch (error) {
    console.error(error);
  }
}

/**
 * @desc This function is used to get all the articles
 * @param {number} limit
 * @param {number} page
 * @returns {Promise}
 */
async function getArticles(limit, page) {
  try {
    // if no limit and page is provided, get all the articles
    if (!limit && !page) return await axios.get(URL);
    return await axios.get(`${URL}?limit=${limit}&page=${page}`);
  } catch (error) {
    console.error(error);
  }
}

/**
 * @desc This function is used to post an article, only for writers
 * @param {Object} article
 * @param {string} article.title
 * @param {string} article.content
 * @param {[string]} article.tags
 * @returns {Promise}
 */
async function postArticle(article) {
  try {
    return await axios.post(URL, article);
  } catch (error) {
    console.error(error);
  }
}

/**
 * @desc This function is used to update an article, only for writers (the writer should be the author of the article)
 * @param {Object} article
 * @param {string} article.title
 * @param {string} article.content
 * @param {[string]} article.tags
 * @returns
 */
async function updateArticle(article) {
  try {
    return await axios.put(URL, article);
  } catch (error) {
    console.error(error);
  }
}

export { getArticleById, getArticles, postArticle, updateArticle };
