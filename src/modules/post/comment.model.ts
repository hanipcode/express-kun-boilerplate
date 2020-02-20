import { Schema, Types, model, Document } from 'mongoose';

export interface IComment extends Document {
  user: Types.ObjectId;
  points: number;
  comments: Array<Types.ObjectId | IComment>;
  post: Types.ObjectId[];
  message: string;
  level: number;
}

const CommentSchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: 'User' },
    comments: [{ type: Types.ObjectId, ref: 'Comment' }],
    points: { type: Number, default: 0 },
    post: { type: Types.ObjectId, ref: 'Post' },
    message: { type: String },
    level: { type: Number, default: 0 }
  },
  {
    timestamps: true
  }
);

const CommentModel = model<IComment>('Comment', CommentSchema);

export default CommentModel;
