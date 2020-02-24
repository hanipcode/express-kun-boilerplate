import { Document } from 'mongoose';
export declare enum Role {
    distributor = "Distributor",
    receiver = "Receiver",
    admin = "Admin",
    lab = "Lab",
    techincal = "Technical"
}
export interface IUserBase {
    email: string;
    password: string;
    name: string;
    role: Role;
}
export interface IUserModel extends Document, IUserBase {
}
declare const User: import("mongoose").Model<IUserModel, {}>;
export default User;
