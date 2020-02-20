import { Types, Document } from 'mongoose';
export interface IComment extends Document {
    user: Types.ObjectId;
    points: number;
    comments: Array<Types.ObjectId | IComment>;
    post: Types.ObjectId[];
    message: string;
    level: number;
}
declare const CommentModel: import("mongoose").Model<IComment, {}>;
export default CommentModel;
