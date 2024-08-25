/**
 * @desc The collection of all the routes related to the user
 */

import { getToken } from "./../utils/tokenUtil";

import axios from "axios";

import { BASE_URL } from "./../data/api";

const URL = `${BASE_URL}/users`;

// add the header x-auth-token to the request
axios.defaults.headers.common["x-auth-token"] = getToken();

/**
 * @desc This function is used to update the user
 * @param {string} email
 * @returns   {Promise}
 */
async function updateUser(email) {
  try {
    return await axios.put(`${URL}/`, { email });
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

async function getUserById(id) {
  try {
    return await axios.get(`${URL}/${id}`);
  } catch (error) {
    console.error(error);
  }
}

export { getUserById, getUserByUsername, updateUser };
