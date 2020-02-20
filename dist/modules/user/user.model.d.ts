import { Document, Types } from 'mongoose';
export interface IUserModel extends Document {
    email: string;
    posts: any[];
    password: string;
    name: string;
    _id: Types.ObjectId;
}
declare const User: import("mongoose").Model<IUserModel, {}>;
export default User;
