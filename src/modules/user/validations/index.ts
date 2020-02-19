import * as yup from 'yup';
import validationWording from '../../../constants/validationWording';

export const LoginShape = {
  email: yup
    .string()
    .email(validationWording.invalid('email'))
    .required(validationWording.required('email')),
  password: yup.string().required(validationWording.required('password'))
};

export const RegisterShape = {
  email: yup
    .string()
    .email(validationWording.invalid('email'))
    .required(validationWording.required('email')),
  password: yup
    .string()
    .min(8, validationWording.minLength(8))
    .required(validationWording.required('password')),
  name: yup.string().required(validationWording.required('name'))
};

export const loginValidation = yup.object().shape(LoginShape);
export const registerValidation = yup.object().shape(RegisterShape);
