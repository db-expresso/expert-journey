import Joi from '@hapi/joi';
import createValidationErrors from '../utils/customValidationErrorMsg';
import customMessages from '../utils/customMessage';

const {
  invalidEmailValue,
  invalidPasswordValue,
} = customMessages;

const signupValidationSchema = Joi.object().keys({
  email: Joi.string().email()
    .messages(createValidationErrors('string', invalidEmailValue))
    .required(),
  password: Joi.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*?])[0-9a-zA-Z!@#$%^&*?]{8,}$/)
    .messages(createValidationErrors('string', invalidPasswordValue))
});
export default signupValidationSchema;
