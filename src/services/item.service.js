import {Item} from '../database/models/item';


/**
 * @description this service deals with the Item model
 */
export default class ItemService {
  /**
     * @description save new item in db
     * @param {object} item
     * @returns {object} it returns the saved item obj
     */
  static async createItem(item,user) {

    const createdItem = await new Item({...item, created_by:user});
    return createdItem.save();
    
  }



  /**
 * @description finds all items with particular status
 * @param {integer} data
 * @returns {object} it returns the item based on a particular data
 */
  static async getItemById(id) {
   
    const item = await Item.findOne({
      _id: id,
    });
    return item;
  }

    /**
 * @description finds all items with particular find query
 * @param {integer} find
 * @returns {object} it returns the items based on a particular data
 */
     static async getItems(find) {
  
      const item = await Item.find(find)
      return item;
    }

  /**
   * @description update item
   * @param {integer} id
   * @param {string} data
   * @return {object} updated item
   */
  static async updateItem(id, data) {
    
      await Item.updateOne(
        { _id: id },
        { ...data},
      );
  }

  /**
   * @description delete item
   * @param {integer} id
   * @return {object} null
   */
  static async deleteItem(id) {
    await Item.deleteOne({
     _id: id 
    });
  }
}
