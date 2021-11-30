import bcrypt from 'bcrypt';
import handleResponse from '../utils/responseHandler.util';
import UserService from '../services/user.service';
import statusCode from '../utils/statusCodes';
import customMessage from '../utils/customMessage';
import tokenGenerator from '../utils/jwtTokenGenerator';

const {
  createUser,
  getUserByEmail,
  getUserById
} = UserService;
const { created, ok } = statusCode;
const {
  userCreated,
  successfulLogin,
  notificationStatusUpdated,
  userData,
  userApproved,
  userDeclined
} = customMessage;
const { successResponse, updatedResponse } = handleResponse;

/**
 * @description this class deals with the user model
 */
export default class UserController {
  /**
     *
     * @param {request} req
     * @param {response} res
     * @returns {object} the token of a created user or error messages
     */
  static async signup(req, res) {
    try{
      const formData = req.body;
      const salt = bcrypt.genSaltSync(10);
      const plainTextPassword = formData.password;
      formData.password = bcrypt.hashSync(plainTextPassword, salt);

      const user = await createUser(formData);
      const token = tokenGenerator({name:user.name,email:user.email,id:user.id});
    
      return successResponse(res, created, userCreated, token);
    }catch(err){
      console.log('error', err);
      return 0
    }
   
  }

  /**
   *
   * @param {request} req
   * @param {response} res
   * @returns {object} it returns the token of the logged in user
   */
  static async login(req, res) {
    try{
      const { email } = req.body;
      const user = await getUserByEmail(email);
      const token = tokenGenerator({name:user.name,email:user.email,id:user.id});
      return successResponse(res, ok, successfulLogin, token);
    }catch(err){
      console.log(err);
      return 0
    }
   
  }



  /**
   * @description get the user from the token
   * @param {request} req
   * @param {response} res
   * @returns {object} it returns the user from the token
   */
  static async getMe(req, res) {
    try{
      const userId = req.authUser.id;
    const user = await getUserById(userId);
    return successResponse(res, ok, userData, undefined, user);
    }catch(err){
      console.log(err);
      return 0
    }
    
  }

}
