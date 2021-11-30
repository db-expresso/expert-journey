/**
 * @param {object} res
 * @param {integer} code
 * @param {string} message
 * @param {string} token
 * @param {string} data
 * @returns {object} response
 * @description Returns a successful response
 */
const successResponse = (res, code, message, token, data = null) => res.status(code).json({
  message,
  token,
  data
});

/**
 * @param {object} res response object
 * @param {integer} code status code
 * @param {string} error error message
 * @returns {object} response json object
 * @description Returns an error response
 */
const errorResponse = (res, code, error) => res.status(code).json({
  error,
});

/**
 * @param {object} res
 * @param {integer} code
 * @param {string} message
 * @param {string} token
 * @returns {object} response
 * @description Returns a successful response
 */
const updatedResponse = async (res, code, message) => res.status(code).json({
  message
});

export default {
  successResponse,
  errorResponse,
  updatedResponse,
};
