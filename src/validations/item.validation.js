import Joi from '@hapi/joi';
import createValidationErrors from '../utils/customValidationErrorMsg';
import customMessages from '../utils/customMessage';

const {
  invalidName,
  invalidQuantity
} = customMessages;

export const itemValidationSchema = Joi.object().keys({
  name: Joi.string().min(3).max(30)
    .messages(createValidationErrors('string', invalidName))
    .required(),
  quantity: Joi.number().strict(true).required()
    .messages(createValidationErrors('string', invalidQuantity))
    .required(),
});

export const itemUpdateValidationSchema = Joi.object().keys({
  name: Joi.string().min(3).max(30)
    .messages(createValidationErrors('string', invalidName)),
  quantity: Joi.number().strict(true).required()
    .messages(createValidationErrors('string', invalidQuantity)),
});
