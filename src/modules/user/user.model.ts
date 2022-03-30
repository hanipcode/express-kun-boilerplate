import { Schema, model, Document, Types } from 'mongoose';
import bcrypt from 'bcrypt';
import keys from '../../constants/keys';

function hashPassword(value: any) {
  return bcrypt.hashSync(value, keys.salt);
}

export enum Role {
  distributor = 'Distributor',
  receiver = 'Receiver',
  admin = 'Admin',
  lab = 'Lab',
  techincal = 'Technical',
}

export interface IUserBase {
  email: string;
  password: string;
  name: string;
  role: Role;
}

export interface IUserModel extends Document, IUserBase {}

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
    set: hashPassword,
  },
  name: {
    required: true,
    type: String,
  },
});

const User = model<IUserModel>('User', UserSchema);

export default User;
