import * as yup from 'yup';
export declare const LoginShape: {
    email: yup.StringSchema<string>;
    password: yup.StringSchema<string>;
};
export declare const RegisterShape: {
    email: yup.StringSchema<string>;
    password: yup.StringSchema<string>;
    name: yup.StringSchema<string>;
};
export declare const loginValidation: yup.ObjectSchema<yup.Shape<object, {
    email: string;
    password: string;
}>>;
export declare const registerValidation: yup.ObjectSchema<yup.Shape<object, {
    email: string;
    password: string;
    name: string;
}>>;
