import express from 'express';
import ItemController from '../controllers/item.controller';
import tokenAuthentication from '../middlewares/tokenAuthentication';
import itemValidations from '../middlewares/itemValidations.middleware';
import { itemAuthorization } from '../middlewares/authorization.middleware';

const {
  createItem,
  allItems,
  viewItem,
  updateItem,
  deleteItem,
} = ItemController;
const {
  validateItemObj,
  itemExist,
  validateItemUpdateObj
} = itemValidations;
const route = express.Router();

route.post('/item', [tokenAuthentication, validateItemObj], createItem);
route.get('/items',[tokenAuthentication], allItems);
route.get('/item/:id', [tokenAuthentication,itemExist], viewItem);
route.put('/item/:id', [tokenAuthentication, itemExist, itemAuthorization, validateItemUpdateObj], updateItem);
route.delete('/item/:id', [tokenAuthentication, itemExist, itemAuthorization], deleteItem);
export default route;
