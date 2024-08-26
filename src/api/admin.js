/**
 * @desc api call for admin users
 */

import { authenticatedRequest } from "../utils/general/tokenUtil";

import { BASE_URL } from "./../data/api";

const URL = `${BASE_URL}/admin`;

/**
 * @desc api call to check if user is admin
 * @returns {Promise}
 */
export async function isAdmin() {
  return await authenticatedRequest(`${URL}/is-admin`);
}

/**
 * @desc api call to get all users
 * @returns {Promise<[user]>}
 */
export async function getUsers() {
  return await authenticatedRequest(`${URL}/users`);
}

/**
 * @desc api call to get user by id
 * @param {string} id
 * @returns {Promise<user>}
 */
export async function getUserById(id) {
  return await authenticatedRequest(`${URL}/users/${id}`);
}

export async function updateUserPrivileges(id, role) {
  return await authenticatedRequest(`${URL}/users/${id}`, "post", { role });
}
