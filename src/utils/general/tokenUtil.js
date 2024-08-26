/**
 * @desc this will be the file with all the token related functions
 */

import axios from "axios";

/**
 * @returns {string | null} the token if it is not expired, otherwise null
 */
export function getToken() {
  // check if the token is expired
  const token = localStorage.getItem("token");
  const expirationTime = localStorage.getItem("expirationTime");

  if (!token || !expirationTime) {
    return null;
  }

  if (new Date().getTime() > expirationTime) {
    // logout the user
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    return null;
  }

  return token;
}

/**
 * @param {string} token
 * @param {number} expiresIn in seconds
 */
export function setToken(token, expiresIn) {
  // set the token to expire in the given number of seconds
  // this will be used to automatically log the user out after the token expires
  const expirationTime = new Date().getTime() + expiresIn * 1000;
  localStorage.setItem("token", token);
  localStorage.setItem("expirationTime", expirationTime);
}

/**
 * remove the token from the local storage
 */
export function removeToken() {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationTime");
}

export async function authenticatedRequest(url, method, data) {
  const token = getToken();

  if (!token) {
    return null;
  }

  try {
    const request = await axios({
      url,
      method,
      data,
      headers: {
        "x-auth-token": token,
      },
    });

    // check if the response is 401 (unauthorized)
    // if so, log the user out
    if (request.status === 401) {
      removeToken();
    }

    return request;
  } catch (error) {
    console.error(error.message);
  }
}
