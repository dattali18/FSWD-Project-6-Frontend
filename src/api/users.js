/**
 * @desc The collection of all the routes related to the user
 */

import { axios } from "axios";

import { BASE_URL } from "./index";

const URL = `${BASE_URL}/users`;

/**
 * @desc This function is used to update the user
 * @param {string} email
 * @param {string} username
 * @returns   {Promise}
 */
async function updateUser(email, username) {
  try {
    return await axios.put(`${URL}/update`, { email, username });
  } catch (error) {
    console.error(error);
  }
}

/**
 * @desc This function is used to get the user by username
 * @param {string} username
 * @returns {Promise}
 */
async function getUserByUsername(username) {
  try {
    return await axios.get(`${URL}/username/${username}`);
  } catch (error) {
    console.error(error);
  }
}

export { getUserByUsername, updateUser };
