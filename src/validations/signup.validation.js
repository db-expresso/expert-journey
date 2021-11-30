import Joi from '@hapi/joi';
import createValidationErrors from '../utils/customValidationErrorMsg';
import customMessages from '../utils/customMessage';

const {
  invalidEmailValue,
  invalidName,
  invalidPhoneNumberValue,
  invalidPasswordValue,
} = customMessages;

const signupValidationSchema = Joi.object().keys({
  names: Joi.string().alphanum().min(3).max(30)
    .messages(createValidationErrors('string', invalidName))
    .required(),
  email: Joi.string().email()
    .messages(createValidationErrors('string', invalidEmailValue))
    .required(),
  password: Joi.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*?])[0-9a-zA-Z!@#$%^&*?]{8,}$/)
    .messages(createValidationErrors('string', invalidPasswordValue))
    .required()
    .label('Please provide a valid password'),
  phoneNumber: Joi.string().length(10).alphanum()
    .messages(createValidationErrors('string', invalidPhoneNumberValue))
    .required()
});
export default signupValidationSchema;
