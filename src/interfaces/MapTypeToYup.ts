import * as yup from 'yup';
import { Role } from '../modules/user/user.model';

export type MapTypeToYup<T> = {
  [k in keyof T]: T[k] extends Role
    ? yup.MixedSchema<keyof typeof Role>
    : yup.Schema<T[k]>;
};
