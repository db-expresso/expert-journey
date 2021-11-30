const generateItemIdFromArray = items => {
  const itemIds = items.map(item => item.dataValues.itemId);
  return itemIds;
};
export default generateItemIdFromArray;
