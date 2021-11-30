import statusCode from '../utils/statusCodes';
import responseHandler from '../utils/responseHandler.util';
import ItemService from '../services/item.service';
import customMessage from '../utils/customMessage';

const { unAuthorized } = statusCode;
const { errorResponse } = responseHandler;
const { getItemById } = ItemService;
const { unauthorizedAccess } = customMessage;

/** *
 * @description checks if the item belongs to the current user
 * @param {request} req
 * @param {response} res
 * @param {function} next
 * @returns {object} returns an error object, if the item does not belong to the user
 */
export const itemAuthorization = async (req, res, next) => {
  const { id } = req.params;
  const currentUser = req.authUser;
  console.log(currentUser,id);
  const item = await getItemById(id);
  console.log(item);
  if (item.created_by != currentUser.id) {
    return errorResponse(res, unAuthorized, unauthorizedAccess);
  }
  return next();
};

