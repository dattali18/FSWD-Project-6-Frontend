/**
 * @desc The collection of all the routes related to the user
 */

import { authenticatedRequest } from "../utils/general/tokenUtil";

import axios from "axios";

import { BASE_URL } from "./../data/api";

const URL = `${BASE_URL}/users`;

/**
 * @desc This function is used to update the user
 * @param {string} email
 * @access private
 * @returns   {Promise}
 */
async function updateUser(email) {
  return await authenticatedRequest(URL, "put", { email });
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

/**
 * @desc This function is used to get the user by id
 * @param {number} id
 * @returns {Promise}
 */
async function getUserById(id) {
  try {
    return await axios.get(`${URL}/${id}`);
  } catch (error) {
    console.error(error);
  }
}

export { getUserById, getUserByUsername, updateUser };
