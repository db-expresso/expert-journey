import ItemService from '../services/item.service';
import customMessages from '../utils/customMessage';
import statusCode from '../utils/statusCodes';
import responseHandler from '../utils/responseHandler.util';

const {
  createItem,
  getItems,
  getItemById,
  updateItem: update,
  deleteItem
} = ItemService;
const {
  postItem,
  allItems,
  itemDetails,
  itemUpdated,
  itemDeleted,
} = customMessages;
const { created, ok } = statusCode;
const { successResponse, updatedResponse } = responseHandler;

/**
 * @description this controller works with everything regarding items
 */
export default class ItemController {
  /**
     *
     * @param {request} req
     * @param {response} res
     * @returns {object} it returns the newly created item
     */
  static async createItem(req, res) {
    try{
      const newItem = req.body;
      const userId = req.authUser.id;
      const item = await createItem(newItem,userId);
      return successResponse(res, created, postItem, undefined, item);
    }catch(err){
      console.log(err);
      return 0
    }
    
    
  }

  /**
   * @param {request} req
   * @param {response} res
   * @returns {object} it returns all open/available items
   */
  static async allItems(req, res) {
    try{
      const items = await getItems();
    return successResponse(res, ok, allItems, undefined, items);
    }catch(err){
      console.log(err);
      return 0
    }
    
  }

  /**
   * @param {request} req
   * @param {response} res
   * @returns {object} it returns a item
   */
  static async viewItem(req, res) {
    
    try{
      const { id } = req.params;
      const item = await getItemById(id);
      return successResponse(res, ok, itemDetails, undefined, item);
    }catch(err){
      console.log(err);
      return 0
    }
  }


  /**
   * @description update a item
   * @param {request} req
   * @param {response} res
   * @returns {object} it returns a message saying the item has been updated
   */
  static async updateItem(req, res) {
    
    try{
      const item = req.body;
    const { id } = req.params;
    await update(id, item);
    return updatedResponse(res, ok, itemUpdated);
    }catch(err){
      console.log(err);
      return 0
    }
  }

  /**
   * @description update a item
   * @param {request} req
   * @param {response} res
   * @returns {object} it returns a message saying the item has been updated
   */
  static async deleteItem(req, res) {
    
    try{
      const { id } = req.params;
    await deleteItem(id);
    return updatedResponse(res, ok, itemDeleted);
    }catch(err){
      console.log(err);
      return 0
    }
  }
}
