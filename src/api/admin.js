/**
 * @desc api call for admin users
 */

import { authenticatedRequest } from "./../utils/tokenUtil";


import { BASE_URL } from "./../data/api";

const URL = `${BASE_URL}/admin`;


export async function isAdmin() {
  return await authenticatedRequest(`${URL}/is-admin`);
}
