import jwt from 'jsonwebtoken';
import responseHandler from '../utils/responseHandler.util';
import statusCode from '../utils/statusCodes';
import customMessage from '../utils/customMessage';

const { errorResponse } = responseHandler;
const { unAuthorized } = statusCode;
const { unauthorizedAccess, invalidToken } = customMessage;

const authentication = (req, res, next) => {
  const bearerHeader = req.headers.authorization;
  if (bearerHeader === undefined) {
    return errorResponse(res, unAuthorized, unauthorizedAccess);
  }
  const bearer = bearerHeader.split(' ');
  const bearerToken = bearer[1];
  req.token = bearerToken;
  return jwt.verify(req.token, process.env.JWT_KEY, (error, data) => {
    if (error) {
      return errorResponse(res, unAuthorized, invalidToken);
    }
    req.authUser = data;
    return next();
  });
};

export default authentication;
