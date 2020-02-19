import { Schema, model, Document, Types } from 'mongoose';
import bcrypt from 'bcrypt';
import keys from '../../constants/keys';

function hashPassword(value: any) {
  return bcrypt.hashSync(value, keys.salt);
}

export interface IUserModel extends Document {
  email: string;
  posts: any[];
  password: string;
  name: string;
  _id: Types.ObjectId;
}

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    select: false,
    set: hashPassword
  },
  posts: [{ type: Types.ObjectId, ref: 'Post' }],
  name: {
    required: true,
    type: String
  }
});

const User = model<IUserModel>('User', UserSchema);

export default User;
