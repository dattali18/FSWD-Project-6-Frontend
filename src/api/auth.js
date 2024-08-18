/**
 * @desc This is the collection of all the routes related to the authentication of the user
 */

import { axios } from "axios";
import { BASE_URL } from "./index";

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
    localStorage.setItem("user", JSON.stringify(response.data.user));
    localStorage.setItem("token", response.data.token);
    return response;
  } catch (error) {
    console.error(error);
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
async function logout() {
  // remove the user and token from the local storage
  localStorage.removeItem("user");
  localStorage.removeItem("token");
}

export { login, logout, register };
