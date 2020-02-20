import CommentModel, { IComment } from '../comment.model';

export default async function recurseComment(
  comments: IComment[]
): Promise<IComment[]> {
  for (const comment of comments) {
    if (comment.comments.length > 0) {
      comment.comments = await CommentModel.find({
        _id: {
          $in: comment.comments
        }
      }).sort({
        points: 'descending'
      });
      await recurseComment(comment.comments as IComment[]);
    }
  }
  return comments;
}
