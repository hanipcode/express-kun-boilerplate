import { Types, Document } from 'mongoose';
interface IPost extends Document {
    user: Types.ObjectId;
    comments: Types.ObjectId[];
    content: string;
    points: number;
}
declare const PostModel: import("mongoose").Model<IPost, {}>;
export default PostModel;
