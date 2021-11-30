import express from 'express';
import UserController from '../controllers/user.controller';
import validations from '../middlewares/authValidations.middleware';
import tokenAuthentication from '../middlewares/tokenAuthentication';


const {
  validateSignupObj,
  userAccountDuplication,
  checkUserExist,
  checkPasswordMatch,
  validateLoginObj,
} = validations;
const route = express.Router();
const {
  signup,
  login,
  getMe,
} = UserController;

route.post('/auth/signup', [validateSignupObj, userAccountDuplication], signup);
route.post('/auth/login', [validateLoginObj, checkUserExist, checkPasswordMatch], login);
route.get('/user/me', tokenAuthentication, getMe);

export default route;
