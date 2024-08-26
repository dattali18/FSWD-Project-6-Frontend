/**
 * @desc This is the collection of all the routes related to the authentication of the user
 */

import { authenticatedRequest, removeToken } from "../utils/general/tokenUtil";

import axios from "axios";
import { BASE_URL } from "./../data/api";

const URL = `${BASE_URL}/auth`;

/**
 * @desc This function is used to login the user
 * @param {string} username
 * @param {string} password
 * @returns {Promise}
 */
async function login(username, password) {
  try {
    const response = await axios.post(`${URL}/login`, { username, password });
    // save the user and token in the local storage
    // localStorage.setItem("token", response.data.token);
    return { response, token: response.data.token };
  } catch (error) {
    console.error(error);
    return { response: error.response, token: null };
  }
}

/**
 * @desc This function is used to register the user
 * @param {string} email
 * @param {string} username
 * @param {string} password
 * @returns  {Promise}
 */
async function register(email, username, password) {
  try {
    return await axios.post(`${URL}/register`, { email, username, password });
  } catch (error) {
    console.error(error);
  }
}

/**
 * @desc This function is used to logout the user
 */
function logout() {
  removeToken();
}

/**
 * @desc This function is used to get the current user
 * @access private
 * @returns {Promise}
 */
async function getCurrentUser() {
  return await authenticatedRequest(`${URL}/me`, "get");
}

export { getCurrentUser, login, logout, register };
