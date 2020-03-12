import * as yup from 'yup';
import { Role, UserArea } from '../modules/user/user.model';

export type MapTypeToYup<T> = {
  [k in keyof T]: T[k] extends Role
    ? yup.MixedSchema<keyof typeof Role>
    : T[k] extends UserArea
    ? yup.MixedSchema<keyof typeof UserArea>
    : yup.Schema<T[k]>;
};
