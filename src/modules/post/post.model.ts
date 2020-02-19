import { Schema, Types, model, Document } from 'mongoose';

interface IPost extends Document {
  user: Types.ObjectId;
  comments: Types.ObjectId[];
  content: string;
  points: number;
}

const PostSchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: 'User' },
    comments: [{ type: Types.ObjectId, ref: 'Comment' }],
    points: { type: Number, default: 0 },
    content: { type: String }
  },
  {
    timestamps: true
  }
);

const PostModel = model<IPost>('Post', PostSchema);

export default PostModel;
