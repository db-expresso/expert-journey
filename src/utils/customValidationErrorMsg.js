/**
* @param {object} fieldDataType data type for the field
* @param {object} errorMessage error message to display
* @returns {object} an object of validation error messages
*/
const createValidationErrors = (fieldDataType, errorMessage) => ({
  [`${fieldDataType}.base`]: errorMessage,
  [`${fieldDataType}.empty`]: errorMessage,
  [`${fieldDataType}.min`]: errorMessage,
  [`${fieldDataType}.max`]: errorMessage,
  [`${fieldDataType}.format`]: errorMessage,
  [`${fieldDataType}.less`]: errorMessage,
  [`${fieldDataType}.greater`]: errorMessage,
  [`${fieldDataType}.regex.name`]: errorMessage,
  [`${fieldDataType}.email`]: errorMessage,
  'any.required': errorMessage,
  'any.only': errorMessage,
  'any.ref': errorMessage,
});
export default createValidationErrors;
