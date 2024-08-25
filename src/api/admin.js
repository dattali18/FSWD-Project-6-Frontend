/**
 * @desc api call for admin users
 */

import { getToken } from "./../utils/tokenUtil";

import axios from "axios";

import { BASE_URL } from "./../data/api";

const URL = `${BASE_URL}/admin`;

// add the header x-auth-token to the request
axios.defaults.headers.common["x-auth-token"] = getToken();

export async function isAdmin() {
  try {
    const response = await axios.get(`${URL}/is-admin`);
    if (response.status === 200) {
      return response.data;
    }

    return null;
  } catch (error) {
    return null;
  }
}
