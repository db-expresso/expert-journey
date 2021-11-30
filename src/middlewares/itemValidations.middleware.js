import {itemValidationSchema, itemUpdateValidationSchema }from '../validations/item.validation';
import statusCode from '../utils/statusCodes';
import responseHandler from '../utils/responseHandler.util';
import ItemService from '../services/item.service';
import customMessage from '../utils/customMessage';

const {
  badRequest,
  notFound,
  conflict
} = statusCode;
const { getItemById } = ItemService;
const { errorResponse } = responseHandler;
const {
  itemNotFound,
  duplicateItem,
  invalidId
} = customMessage;

/** *
 * @description validates the item object for createItem endpoint
 * @param {request} req
 * @param {response} res
 * @param {function} next
 * @returns {object} returns an error object, if formData is invalid
 */
const validateItemObj = (req, res, next) => {
  const {
    name, quantity
  } = req.body;
  const validateObj = itemValidationSchema.validate({
    name, quantity
  });

  if (validateObj.error) {
    return errorResponse(res, badRequest, validateObj.error.details[0].message);
  }
  return next();
};

/** *
 * @description validates the item object for createItem endpoint
 * @param {request} req
 * @param {response} res
 * @param {function} next
 * @returns {object} returns an error object, if formData is invalid
 */
 const validateItemUpdateObj = (req, res, next) => {
  const validateObj = itemUpdateValidationSchema.validate({
    ...req.body
  });

  if (validateObj.error) {
    return errorResponse(res, badRequest, validateObj.error.details[0].message);
  }
  return next();
};

const itemDuplication = async (req, res, next) => {
  const { name } = req.body;
  const items = await findItems();
  if (items && items.length > 0) {
    const nameExist = name.localeCompare(item.name);
    if (nameExist) {
      return errorResponse(res, conflict, duplicateItem);
    }
  }
  return next();
};




/**
 * @description check a item of the given id exist
 * @param {request} req
 * @param {response} res
 * @param {function} next
 * @returns {object} returns an error message if no item of the given id was found
 */
const itemExist = async (req, res, next) => {
  const { id } = req.params;
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    const item = await getItemById(id);
    if (!item) {
      return errorResponse(res, notFound, itemNotFound);
    }
    return next();  
} else {
  return errorResponse(res, conflict, invalidId);   
}

};



export default {
  validateItemObj,
  itemExist,
  itemDuplication,
  validateItemUpdateObj
};
