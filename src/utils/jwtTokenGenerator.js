import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
/**
 * @description this function generates jwt token given a user obj
 * @param {object} payload this is the user obj
 * @returns {string} it returns a jwt token
 */
const tokenGenerator = (payload) => {
  console.log(payload)
  const token = jwt.sign(payload, process.env.JWT_KEY);
  return token;
};
export default tokenGenerator;
