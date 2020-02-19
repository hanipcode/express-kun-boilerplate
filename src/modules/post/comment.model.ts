import { Schema, Types, model, Document } from 'mongoose';

export interface IComment extends Document {
  user: Types.ObjectId;
  comments: Types.ObjectId[];
  message: string;
  level: number;
}

const CommentSchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: 'User' },
    comments: [{ type: Types.ObjectId, ref: 'Comment' }],
    message: { type: String },
    level: { type: String, default: 0 }
  },
  {
    timestamps: true
  }
);

const CommentModel = model<IComment>('Comment', CommentSchema);

export default CommentModel;
